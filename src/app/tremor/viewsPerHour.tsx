import { Card, Color } from '@tremor/react';
import { BarChart } from '@tremor/react';
import { db } from '~/server/db';
import { Video } from '../data-mining/youtube/videos';

type ViewsPerHour = {
    "viewCount": number | null,
    "hour": string | null,
    "videos": number
}

export default function ViewsPerHour({ videos, color }: { videos: Video[], color: Color }) {


    const data: ViewsPerHour[] = [{
        viewCount: 0,
        hour: "0",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "1",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "2",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "3",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "4",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "5",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "6",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "7",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "8",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "9",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "10",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "11",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "12",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "13",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "14",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "15",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "16",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "17",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "18",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "19",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "20",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "21",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "22",
        videos: 0
    },
    {
        viewCount: 0,
        hour: "23",
        videos: 0
    }]

    let publishedOn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    for (const video of videos) {
        const uploadDate = video.publishedAt
        const hour = video.publishedAt?.getHours();

        switch (hour) {
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
                break
            case 12:
                if (data[12] && data[12].viewCount != null && video.viewCount) {
                    publishedOn[12]++;
                    data[12].viewCount = data[12].viewCount + video.viewCount
                }
                break
            case 13:
                if (data[13] && data[13].viewCount != null && video.viewCount) {
                    publishedOn[13]++;
                    data[13].viewCount = data[13].viewCount + video.viewCount
                }
                break
            case 14:
                if (data[14] && data[14].viewCount != null && video.viewCount) {
                    publishedOn[14]++;
                    data[14].viewCount = data[14].viewCount + video.viewCount
                }
                break
            case 15:
                if (data[15] && data[15].viewCount != null && video.viewCount) {
                    publishedOn[15]++;
                    data[15].viewCount = data[15].viewCount + video.viewCount
                }
                break
            case 16:
                if (data[16] && data[16].viewCount != null && video.viewCount) {
                    publishedOn[16]++;
                    data[16].viewCount = data[16].viewCount + video.viewCount
                }
                break
            case 17:
                if (data[17] && data[17].viewCount != null && video.viewCount) {
                    publishedOn[17]++;
                    data[17].viewCount = data[17].viewCount + video.viewCount
                }
                break
            case 18:
                if (data[18] && data[18].viewCount != null && video.viewCount) {
                    publishedOn[18]++;
                    data[18].viewCount = data[18].viewCount + video.viewCount
                }
                break
            case 19:
                if (data[19] && data[19].viewCount != null && video.viewCount) {
                    publishedOn[19]++;
                    data[19].viewCount = data[19].viewCount + video.viewCount
                }
                break
            case 20:
                if (data[20] && data[20].viewCount != null && video.viewCount) {
                    publishedOn[20]++;
                    data[20].viewCount = data[20].viewCount + video.viewCount
                }
                break
            case 21:
                if (data[21] && data[21].viewCount != null && video.viewCount) {
                    publishedOn[21]++;
                    data[21].viewCount = data[21].viewCount + video.viewCount
                }
                break
            case 22:
                if (data[22] && data[22].viewCount != null && video.viewCount) {
                    publishedOn[22]++;
                    data[22].viewCount = data[22].viewCount + video.viewCount
                }
                break
            case 23:
                if (data[23] && data[23].viewCount != null && video.viewCount) {
                    publishedOn[23]++;
                    data[23].viewCount = data[23].viewCount + video.viewCount
                }
        }
    }

    publishedOn.forEach((uploadsPerHour, index) => {
        const viewCount = data[index]?.viewCount
        if (data[index] && viewCount != null && viewCount != undefined) {
            data[index]!.viewCount = Math.floor(viewCount / uploadsPerHour)
            data[index]!.videos = uploadsPerHour
        }
    });

    return <>
        <BarChart
            index="hour"
            data={data}
            categories={['viewCount', 'videos']}
            colors={[color, 'transparent']}
            xAxisLabel="Hour"
            yAxisLabel="Average viewcount"
            showLegend={false}
        />
    </>;
}
