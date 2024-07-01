"use client"
import { ScatterChart, Card, type Color } from "@tremor/react";
import { useState } from "react";
import { Video } from "~/app/data-mining/youtube/videos";
import { formatNumber } from "~/lib/utils";

export default function ScatterPlot({ videos, xAxis, yAxis, color }: { videos: Video[], xAxis: keyof Video, yAxis: keyof Video, color: Color }) {

    return (
        <div>
            <ScatterChart
                className="-ml-2 mt-6 h-80"
                yAxisWidth={50}
                data={videos}
                category="title"
                x={xAxis}
                y={yAxis}
                xAxisLabel={getLabels(xAxis)}
                yAxisLabel={getLabels(yAxis)}
                showOpacity={true}
                minYValue={60}
                enableLegendSlider
                colors={[color]}
                showLegend={false}
                valueFormatter={{
                    x: (v) => formatNumber(v).toString(),
                    y: (v) => formatNumber(v).toString()
                }}
            />
        </div>
    );

    function getLabels(label: keyof Video) {
        if (label === "viewCount") return "View Count"
        if (label === "likeCount") return "Like Count"
        if (label === "commentCount") return "Comment Count"
        return "Duration in seconds"
    }
}

export function InteractiveScatterPlot({ videos, color }: { videos: Video[], color: Color }) {
    const [xAxis, setXAxis] = useState("viewCount")
    const [yAxis, setYAxis] = useState("duration")

    return (
        <div className="mx-auto">
            <div className="flex justify-start gap-4 mx-auto">
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
            <ScatterPlot videos={videos} xAxis={xAxis as keyof Video} yAxis={yAxis as keyof Video} color={color} />
        </div>
    )
}
