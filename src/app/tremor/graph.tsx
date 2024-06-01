"use client"

import { BarChart } from "@tremor/react"

type Data = {
    categoryId: number,
    amountOfVideos: number
}

export function Graph({ data }: { data: Data[] }) {

    function dataFormatter(number: number | undefined) {
        number = number ?? 0
        return number.toString()
    }

    console.log(data)

    return <BarChart
        data={data}
        categories={["amountOfVideos"]}
        index="categoryId"
        valueFormatter={dataFormatter}
        xAxisLabel="Category ID"
        yAxisLabel="Amount of videos"
        onValueChange={(value) => console.log(value)}
    />
}