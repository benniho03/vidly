"use client"
import { BarChart } from "@tremor/react";
import { groupCollapsed } from "console";

const chartdata = [
    {
        name: 'Amphibians',
        'Number of threatened species': 2488,
    },
    {
        name: 'Birds',
        'Number of threatened species': 1445,
    },
    {
        name: 'Crustaceans',
        'Number of threatened species': 743,
    },
    {
        name: 'Ferns',
        'Number of threatened species': 281,
    },
    {
        name: 'Arachnids',
        'Number of threatened species': 251,
    },
    {
        name: 'Corals',
        'Number of threatened species': 232,
    },
    {
        name: 'Algae',
        'Number of threatened species': 98,
    },
];

function dataFormatter(number: number | undefined) {
    number = number ?? 0
    return number.toString()
}

function groupVideos({ videos }: { videos: { tagsCount: number | null, viewCount: number | null }[] }) {
    const allTagsCounts = [... new Set(videos.map(video => video.tagsCount))]
    return allTagsCounts.map(tagCount => {
        if (tagCount === null) {
            tagCount = 0
        }
        const videosWithTagCount = videos.filter(video => video.tagsCount === tagCount)
        return {
            tagCount,
            views: Math.floor(videosWithTagCount.reduce((acc, video) => acc + (Number(video.viewCount) ?? 0), 0) / videosWithTagCount.length)
        }
    }).sort((a, b) => a.tagCount - b.tagCount)
}

export function ViewsByTagsCount({ videos }: { videos: { tagsCount: number | null, viewCount: number | null }[] }) {

    const groupedVideos = groupVideos({ videos });
    console.log(groupedVideos)

    return <>
        <BarChart
            data={groupedVideos}
            index="tagCount"
            categories={["views"]}
            colors={['blue']}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
        />
    </>

}