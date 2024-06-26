import { type Color } from '@tremor/react';
import { BarChart } from '@tremor/react';
import { db } from '~/server/db';
import { Video } from '../data-mining/youtube/videos';
import { formatNumber } from '~/lib/utils';

type ViewsPerWeekday = {
    "viewCount": number | null,
    "weekday": string | null,
    "videos": number
}


export default function ViewsPerWeekday({ videos, color }: { videos: Video[], color: Color }) {

    const data: ViewsPerWeekday[] = [{
        viewCount: 0,
        weekday: "Monday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Tuesday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Wednesday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Thursday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Friday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Saturday",
        videos: 0
    },
    {
        viewCount: 0,
        weekday: "Sunday",
        videos: 0
    }]

    let publishedOn = [0, 0, 0, 0, 0, 0, 0]

    for (const video of videos) {
        const weekday = video.publishedatday;

        switch (weekday) {
            case "Monday":
                if (data[0] && data[0].viewCount !== null && video.viewCount) {
                    publishedOn[0]++;
                    data[0].viewCount = data[0].viewCount + video.viewCount
                }
                break
            case "Tuesday":
                if (data[1] && data[1].viewCount !== null && video.viewCount) {
                    publishedOn[1]++;
                    data[1].viewCount = data[1].viewCount + video.viewCount
                }
                break
            case "Wednesday":
                if (data[2] && data[2].viewCount !== null && video.viewCount) {
                    publishedOn[2]++;
                    data[2].viewCount = data[2].viewCount + video.viewCount
                }
                break
            case "Thursday":
                if (data[3] && data[3].viewCount !== null && video.viewCount) {
                    publishedOn[3]++;
                    data[3].viewCount = data[3].viewCount + video.viewCount
                }
                break
            case "Friday":
                if (data[4] && data[4].viewCount !== null && video.viewCount) {
                    publishedOn[4]++;
                    data[4].viewCount = data[4].viewCount + video.viewCount
                }
                break
            case "Saturday":
                if (data[5] && data[5].viewCount !== null && video.viewCount) {
                    publishedOn[5]++;
                    data[5].viewCount = data[5].viewCount + video.viewCount
                }
                break
            case "Sunday":
                if (data[6] && data[6].viewCount !== null && video.viewCount) {
                    publishedOn[6]++;
                    data[6].viewCount = data[6].viewCount + video.viewCount
                }
        }
    }


    publishedOn.forEach((uploadsPerDay, index) => {
        const viewCount = data[index]?.viewCount
        if (data[index] && viewCount !== null && viewCount !== undefined) {
            data[index]!.viewCount = Math.floor(viewCount / uploadsPerDay)
            data[index]!.videos = uploadsPerDay
        }
    });

    return <>
        <BarChart
            index="weekday"
            data={data.map(d => ({
                ...d,
                average: d.viewCount ?? 0 / d.videos
            }))}
            categories={['average']}
            colors={[color, 'transparent']}
            xAxisLabel="Weekday"
            yAxisLabel="Average viewcount"
            showLegend={false}
            color={"sky"}
            valueFormatter={v => formatNumber(v).toString()}
        />
    </>;
}
