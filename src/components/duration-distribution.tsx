import { BarChart, Color } from "@tremor/react";
import { Video } from "~/app/data-mining/youtube/videos";

export function DurationDistribution({ videos, color }: { videos: Video[], color: Color }) {
    const durationMap = new Map<number, number>();
    for (const video of videos) {
        if (!video.duration) break
        const duration = Math.round(video.duration / 60);
        if (durationMap.has(duration)) {
            durationMap.set(duration, durationMap.get(duration)! + 1);
        } else {
            durationMap.set(duration, 1);
        }
    }

    const durations = Array.from(durationMap.entries())

    const data = durations.map(([duration, count]) => ({
        duration,
        count
    })).sort((a, b) => a.duration - b.duration)

    return <div>
        <BarChart
            data={data}
            index="duration"
            categories={["count"]}
            xAxisLabel="Duration (minutes)"
            yAxisLabel="Count"
            colors={[color]}
        />
    </div>


}
