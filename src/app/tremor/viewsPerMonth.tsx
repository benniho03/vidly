import { type Color } from '@tremor/react';
import { BarChart } from '@tremor/react';
import { db } from '~/server/db';
import { Video } from '../data-mining/youtube/videos';

type ViewsPerMonth = {
    "viewCount": number | null,
    "month": string | null,
    "videos": number
}

export default function ViewsPerMonth({ videos, color }: { videos: Video[], color: Color }) {


    const data: ViewsPerMonth[] = [{
        viewCount: 0,
        month: "Jan",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Feb",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Mar",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Apr",
        videos: 0
    },
    {
        viewCount: 0,
        month: "May",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Jun",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Jul",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Aug",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Sep",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Oct",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Nov",
        videos: 0
    },
    {
        viewCount: 0,
        month: "Dec",
        videos: 0
    }]

    let publishedOn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (const video of videos) {
        const uploadDate = video.publishedAt
        const month = video.publishedAt?.getMonth();

        switch (month) {
            case 0:
                if (data[0] && data[0].viewCount != null && video.viewCount) {
                    publishedOn[0]++;
                    data[0].viewCount = data[0].viewCount + video.viewCount
                }
                break
            case 1:
                if (data[1] && data[1].viewCount != null && video.viewCount) {
                    publishedOn[1]++;
                    data[1].viewCount = data[1].viewCount + video.viewCount
                }
                break
            case 2:
                if (data[2] && data[2].viewCount != null && video.viewCount) {
                    publishedOn[2]++;
                    data[2].viewCount = data[2].viewCount + video.viewCount
                }
                break
            case 3:
                if (data[3] && data[3].viewCount != null && video.viewCount) {
                    publishedOn[3]++;
                    data[3].viewCount = data[3].viewCount + video.viewCount
                }
                break
            case 4:
                if (data[4] && data[4].viewCount != null && video.viewCount) {
                    publishedOn[4]++;
                    data[4].viewCount = data[4].viewCount + video.viewCount
                }
                break
            case 5:
                if (data[5] && data[5].viewCount != null && video.viewCount) {
                    publishedOn[5]++;
                    data[5].viewCount = data[5].viewCount + video.viewCount
                }
                break
            case 6:
                if (data[6] && data[6].viewCount != null && video.viewCount) {
                    publishedOn[6]++;
                    data[6].viewCount = data[6].viewCount + video.viewCount
                }
                break
            case 7:
                if (data[7] && data[7].viewCount != null && video.viewCount) {
                    publishedOn[7]++;
                    data[7].viewCount = data[7].viewCount + video.viewCount
                }
                break
            case 8:
                if (data[8] && data[8].viewCount != null && video.viewCount) {
                    publishedOn[8]++;
                    data[8].viewCount = data[8].viewCount + video.viewCount
                }
                break
            case 9:
                if (data[9] && data[9].viewCount != null && video.viewCount) {
                    publishedOn[9]++;
                    data[9].viewCount = data[9].viewCount + video.viewCount
                }
                break
            case 10:
                if (data[10] && data[10].viewCount != null && video.viewCount) {
                    publishedOn[10]++;
                    data[10].viewCount = data[10].viewCount + video.viewCount
                }
                break
            case 11:
                if (data[11] && data[11].viewCount != null && video.viewCount) {
                    publishedOn[11]++;
                    data[11].viewCount = data[11].viewCount + video.viewCount
                }
        }
    }


    publishedOn.forEach((uploadsPerMonth, index) => {
        const viewCount = data[index]?.viewCount
        if (data[index] && viewCount != null && viewCount != undefined) {
            data[index]!.viewCount = Math.floor(viewCount / uploadsPerMonth)
            data[index]!.videos = uploadsPerMonth
        }
    });

    return <>
        <BarChart
            index="month"
            data={data}
            categories={['viewCount', 'videos']}
            colors={[color, 'transparent']}
            xAxisLabel="Month"
            yAxisLabel="Average viewcount"
            showLegend={false}
        />
    </>;
}
