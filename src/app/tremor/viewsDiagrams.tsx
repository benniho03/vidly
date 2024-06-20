"use client"
import { Card } from '@tremor/react';
import { useState } from "react";
import ViewsPerWeekday from './viewsPerWeekday';
import ViewsPerMonth from './viewsPerMonth';
import ViewsPerHour from './viewsPerHour';

type DateOptions = "month" | "hour" | "day"

export default function ViewsDiagrams(videos: any) {
    const [dateType, setDateType] = useState<DateOptions>("day")
    return <div className="timebased-data">
        <h2 className="mt-8">Timebased Data</h2>
        <p className="mb-8">Take a look at the optimal upload time for gardening videos. In which month, on which day of the week or at what time should you upload your video on this topic to reach as many users as possible.</p>
        <select
            value={dateType}
            onChange={e => setDateType(e.target.value as DateOptions)}
            className="text-neutral-950 mb-8"
        >
            <option className="text-neutral-900" value="day">Day</option>
            <option className="text-neutral-900" value="month">Month</option>
            <option className="text-neutral-900" value="hour">Hour</option>
        </select>

        {dateType == "day" ? <ViewsPerWeekday videos={videos} /> : ""}
        {dateType == "month" ? <ViewsPerMonth videos={videos} /> : ""}
        {dateType == "hour" ? <ViewsPerHour videos={videos} /> : ""}

    </div>
}