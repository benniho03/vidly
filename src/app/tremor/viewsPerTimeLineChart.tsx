import { Card } from '@tremor/react';
import { LineChart } from '@tremor/react';
import { db } from '~/server/db';

type ViewsPerWeekday = {
    "viewCount": number | null,
    "weekday": string | null
}

const videos = await db.videos.findMany({
    take: 10
})

console.log(videos.length)

const data: ViewsPerWeekday[] = []

for (const video of videos) {
    console.log(video.viewCount, video.publishedatday)
    const weekday = video.publishedatday;
    data.push({
        "viewCount": video.viewCount,
        "weekday": video.publishedatday
    })
}
console.log(data)

export default function ViewsPerTimeLineChart() {
    return <>
        <LineChart
            index="weekday"
            data={data}
            categories={['viewCount']}
        />
    </>;
}