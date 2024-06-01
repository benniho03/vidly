"use client"
import { Video } from "~/app/data-mining/youtube/videos"
import { BarChart } from "@tremor/react"
import { getCategoryById } from "~/app/data-mining/helpers/categoryMapper"

export function ViewsByCategory({ videos }: { videos: { categoryid: number | null, viewCount: number | null }[] }) {
    const categoryIds = [...new Set([...videos.map(video => video.categoryid)])]

    const groupedVideos = categoryIds.map(categoryId => {
        return {
            category: getCategoryById(categoryId),
            views: getAverageViews(videos.filter(video => video.categoryid === categoryId))
        }
    }).sort((a, b) => b.views - a.views)

    function getAverageViews(videos: { categoryid: number | null, viewCount: number | null }[]) {
        const totalViews = videos.reduce((acc, video) => acc + (video.viewCount ?? 0), 0)
        return Math.floor(totalViews / videos.length)
    }


    function dataFormatter(number: number | undefined) {
        number = number ?? 0
        return number.toString()
    }

    return <BarChart
        data={groupedVideos}
        categories={["views"]}
        index="category"
        valueFormatter={dataFormatter}
        yAxisWidth={50}
        xAxisLabel="Category ID"
        yAxisLabel="Amount of videos"
        onValueChange={(value) => console.log(value)}
    />
}
