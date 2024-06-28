import { ScatterChart } from "@tremor/react";
import { Video } from "~/app/data-mining/youtube/videos";

export default function ScatterPlot({ videos, axis1, axis2 }: { videos: Video[], axis1: keyof Video, axis2: keyof Video }) {
    return <div>
        Scatterino
        {JSON.stringify(videos[0])}
        <ScatterChart
            data={videos}
            x={axis1}
            y={axis2}
            category="title"
            yAxisWidth={50}
            size={"likeCount"}
        />
    </div>
}