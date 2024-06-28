"use client"
import { ScatterChart, Card, type Color } from "@tremor/react";
import { useState } from "react";
import { Video } from "~/app/data-mining/youtube/videos";

export default function ScatterPlot({ videos, xAxis, yAxis }: { videos: Video[], xAxis: keyof Video, yAxis: keyof Video }) {


    return (
        <div>
            <ScatterChart
                className="-ml-2 mt-6 h-80"
                yAxisWidth={50}
                data={videos}
                category="title"
                x={xAxis}
                y={yAxis}
                xAxisLabel={xAxis}
                yAxisLabel={yAxis}
                showOpacity={true}
                minYValue={60}
                enableLegendSlider
                colors={["sky"]}
                showLegend={false}
            />
        </div>
    );

}

export function InteractiveScatterPlot({ videos }: { videos: Video[] }) {
    const [xAxis, setXAxis] = useState("viewCount")
    const [yAxis, setYAxis] = useState("duration")

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-4 mx-auto">
                <select
                    value={xAxis}
                    onChange={e => setXAxis(e.target.value)}
                    className="text-neutral-950"
                >
                    <option className="text-neutral-900" value="viewCount">View Count</option>
                    <option className="text-neutral-900" value="likeCount">Like Count</option>
                    <option className="text-neutral-900" value="commentCount">Comment Count</option>
                    <option className="text-neutral-900" value="duration">Duration</option>
                </select>
                <select
                    value={yAxis}
                    onChange={e => setYAxis(e.target.value)}
                    className="text-neutral-950"
                >
                    <option className="text-neutral-900" value="viewCount">View Count</option>
                    <option className="text-neutral-900" value="likeCount">Like Count</option>
                    <option className="text-neutral-900" value="commentCount">Comment Count</option>
                    <option className="text-neutral-900" value="duration">Duration</option>
                </select>
            </div>
            <ScatterPlot videos={videos} xAxis={xAxis as keyof Video} yAxis={yAxis as keyof Video} />
        </div>
    )
}
