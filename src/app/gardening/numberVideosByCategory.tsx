"use client"
import { Video } from "~/app/data-mining/youtube/videos"
import { BarChart } from "@tremor/react"
import { getCategoryById } from "~/app/data-mining/helpers/categoryMapper"

export function AmountOfVideosByCategory({ videos }: { videos: Video[] }) {
    const categoryIds = [...new Set([...videos.map(video => video.categoryid)])]

    const groupedVideos = categoryIds.map(categoryId => {
        return {
            category: getCategoryById(categoryId),
            amountOfVideos: videos.filter(video => video.categoryid === categoryId).length
        }
    }).sort((a, b) => b.amountOfVideos - a.amountOfVideos)


    function dataFormatter(number: number | undefined) {
        number = number ?? 0
        return number.toString()
    }

    return <BarChart
        data={groupedVideos}
        categories={["amountOfVideos"]}
        index="category"
        valueFormatter={dataFormatter}
        yAxisWidth={50}
        xAxisLabel="Category ID"
        yAxisLabel="Amount of videos"
        onValueChange={(value) => console.log(value)}
    />
}
