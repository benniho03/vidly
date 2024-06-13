"use client"

import { useMemo } from 'react'
import { Video } from '~/app/data-mining/youtube/videos'
import { type Column, createColumnHelper, useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
export function VideoTable({ videos }: { videos: Video[] }) {
    const table = useReactTable({
        data: videos,
        columns,
        getCoreRowModel: getCoreRowModel<Video>()
    })

}
export const columns: ColumnDef<Video>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorFn: p => p.publishedAt?.toLocaleDateString(),
        header: "Published At",
    },
    {
        accessorKey: "viewCount",
        header: "Views"
    },
    {
        accessorKey: "likeCount",
        header: "Likes"
    },
    {
        accessorKey: "commentCount",
        header: "Comments"
    }
]