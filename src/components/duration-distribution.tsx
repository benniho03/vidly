import { BarChart } from "@tremor/react";
import { Video } from "~/app/data-mining/youtube/videos";

export function DurationDistribution({ videos }: { videos: Video[] }) {
    const durationMap = new Map<number, number>();
    for(const video of videos) {
        if(!video.duration) break
        const duration = Math.round(video.duration / 60);
        if(durationMap.has(duration)) {
            durationMap.set(duration, durationMap.get(duration)! + 1);
        } else {
            durationMap.set(duration, 1);
        }
    }

    console.log(durationMap)

    return <div>
        <BarChart
            data={Array.from(durationMap.entries()).map(([duration, count]) => ({ duration: duration.toString(), count }))}
            index="duration"
            categories={["count"]}
            xAxisLabel="Duration (minutes)"
            yAxisLabel="Count"
            colors={["sky"]}
        />
    </div>


}
