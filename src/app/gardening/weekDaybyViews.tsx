"use client"
import { Video } from "~/app/data-mining/youtube/videos"
import { LineChart } from "@tremor/react"
import { useState } from "react"

type DateOptions = "years" | "year" | "month" | "week" | "day"

export function WeekDayByViews({ videos }: { videos: { published: string | null, viewCount: number | null }[] }) {

    const [dateType, setDateType] = useState<DateOptions>("day")

    const data = formatData({ videos, dateType })


    return <div>
        <select
            value={dateType}
            onChange={e => setDateType(e.target.value as DateOptions)}
            className="text-neutral-950"
        >
            <option className="text-neutral-900" value="day">Day</option>
            <option className="text-neutral-900" value="month">Month</option>
            <option className="text-neutral-900" value="year">Year</option>
            <option className="text-neutral-900" value="years">Years</option>
        </select>
        <LineChart
            index="date"
            data={data}
            categories={["viewCount"]}
            yAxisLabel="Average views"
            yAxisWidth={50}
        />
    </div>

}

function getAverageViews(videos: { published: string | null, viewCount: number | null }[]) {
    const totalViews = videos.reduce((acc, video) => acc + Number(video.viewCount ?? 0), 0)
    console.log(totalViews, videos.length)
    if (videos.length === 0) return 0
    return Math.floor(totalViews / videos.length)
}

function formatData({
    videos, dateType
}: {
    videos: { published: string | null, viewCount: number | null }[], dateType: DateOptions
}) {

    if (dateType === "years") return formatYearsData(videos)
    if (dateType === "year") return formatYearData(videos)
    if (dateType === "month") return formatMonthData(videos)
    if (dateType === "week") return formatWeekData(videos)
    return formatDayData(videos)


}

function formatYearsData(videos: { published: string | null, viewCount: number | null }[]) {
    const years = [...new Set([...videos.map(video => new Date(video.published ?? "").getFullYear())])]

    return years.map(year => {
        return {
            date: year,
            viewCount: getAverageViews(videos.filter(video => new Date(video.published ?? "").getFullYear() === year))
        }
    }).sort((a, b) => a.date - b.date)
}

function formatYearData(videos: { published: string | null, viewCount: number | null }[]) {
    const years = [...new Set([...videos.map(video => new Date(video.published ?? "").getMonth())])]

    return years.map(year => {
        return {
            date: year,
            viewCount: getAverageViews(videos.filter(video => new Date(video.published ?? "").getMonth() === year))
        }
    }).sort((a, b) => a.date - b.date)
}

function formatWeekData(videos: { published: string | null, viewCount: number | null }[]) {
    const weeks = [...new Set([...videos.map(video => new Date(video.published ?? "").getDay())])]

    return weeks.map(week => {
        return {
            date: week,
            viewCount: getAverageViews(videos.filter(video => new Date(video.published ?? "").getDay() === week))
        }
    }).sort((a, b) => a.date - b.date)
}

function formatDayData(videos: { published: string | null, viewCount: number | null }[]) {
    const days = [...new Set([...videos.map(video => new Date(video.published ?? "").getHours())])]

    return days.map(day => {
        return {
            date: day,
            viewCount: getAverageViews(videos.filter(video => new Date(video.published ?? "").getHours() === day))
        }
    }).sort((a, b) => a.date - b.date)
}



function formatMonthData(videos: { published: string | null, viewCount: number | null }[]) {
    const daysOfMonth = [...new Set([...videos.map(video => new Date(video.published ?? "").getDate())])]

    return daysOfMonth.map(dayOfMonth => {
        return {
            date: dayOfMonth,
            viewCount: getAverageViews(videos.filter(video => new Date(video.published ?? "").getDate() === dayOfMonth))
        }
    }).sort((a, b) => a.date - b.date)
}