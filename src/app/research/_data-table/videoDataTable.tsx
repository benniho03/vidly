"use client"

import { Video } from '~/app/data-mining/youtube/videos'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

export function VideoTable({ videos }: { videos: Video[] }) {
    const table = useReactTable({
        data: videos,
        columns,
        getCoreRowModel: getCoreRowModel<Video>()
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )

}
export const columns: ColumnDef<Video>[] = [
    {
        accessorKey: "title",
        header: "Title"
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