"use client"
import { Card } from '@tremor/react';
import { useState } from "react";
import ViewsPerWeekday from './viewsPerWeekday';
import ViewsPerMonth from './viewsPerMonth';
import ViewsPerHour from './viewsPerHour';

type DateOptions =  "month" | "hour" | "day"

export default function ViewsDiagrams(videos: any) {
    const [dateType, setDateType] = useState<DateOptions>("day")
    return  <div>
    <h1>D3</h1>
    <select
    value={dateType}
    onChange={e => setDateType(e.target.value as DateOptions)}
    className="text-neutral-950"
>
    <option className="text-neutral-900" value="day">Day</option>
    <option className="text-neutral-900" value="month">Month</option>
    <option className="text-neutral-900" value="hour">Hour</option>
    </select>
    
    {dateType == "day" ? <ViewsPerWeekday videos={videos}/> : ""}
    {dateType == "month" ?  <ViewsPerMonth videos={videos}/> : ""}
    {dateType == "hour" ?  <ViewsPerHour videos={videos}/> : ""}

</div>
}