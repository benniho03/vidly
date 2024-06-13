"use client"
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Video } from "../data-mining/youtube/videos";
import { EyeIcon, HandThumbUpIcon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { WeekDayByViews } from "../gardening/weekDaybyViews";
import toast from "react-hot-toast";

export default function ResearchPage() {

    const [keyword, setKeyword] = useState(getKeyword())

    return <>
        <form
            action={updateKeyword}
            className="max-w-7xl mx-auto flex items-center justify-center gap-2 my-3"
        >
            <input type="text" name="keyword" placeholder="Type your keyword" className="text-neutral-900" />
            <button
                type="submit"
                className="m-0 flex gap-1 items-center"
            >
                Search <MagnifyingGlassIcon className="size-3" />
            </button>
        </form>
        {
            keyword && <ResearchResults keyword={keyword} />
        }
    </>

    function updateKeyword(formData: FormData) {
        const keyword = formData.get("keyword") as string
        if (!keyword) {
            toast.error("Please type a keyword")
            return
        }
        setKeyword(keyword)
    }

}

function ResearchResults({ keyword }: { keyword: string }) {
    const { data: videos, isLoading, error } = useQuery({
        queryKey: ["research", keyword],
        queryFn: () => getResearchData(keyword)
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!videos || !videos.length) return <div>No videos found</div>

    return <div>
        <h1>Researching {keyword}</h1>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3">
                {videos.map(video => <VideoDisplay video={video} />)}
            </div>
            <WeekDayByViews videos={videos.map(video => ({
                published: video.publishedAt?.toString()!,
                viewCount: video.viewCount
            }))} />
        </div>
    </div>
}

function getKeyword() {
    const searchParams = useSearchParams()
    const keywordParam = searchParams.get("keyword")
    if (typeof keywordParam !== "string")
        return
    return decodeURIComponent(keywordParam)
}

async function getResearchData(keyword: string): Promise<Video[]> {
    const response = await fetch(`/api/research/${keyword}`)
    console.log(response)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const data = await response.json() as Video[]
    console.log(data)
    return data
}

function VideoDisplay({ video }: { video: Video }) {
    return <div className="flex gap-2" key={video.id}>
        <img src={video.thumbnail!} />
        <div className="flex flex-col">
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} className="text-neutral-50 underline">{video.title}</a>
            <p className="text-neutral-400">{video.channel}</p>
            <div className="flex gap-4 text-neutral-300">
                <div className="flex gap-1">
                    <EyeIcon className="size-6" />
                    <span>{video.viewCount}</span>
                </div>
                <div className="flex gap-1">
                    <HandThumbUpIcon className="size-6" />
                    <span>{video.likeCount}</span>
                </div>
                <div className="flex gap-1">
                    <ChatBubbleOvalLeftIcon className="size-6" />
                    <p>{video.commentCount}</p>
                </div>
            </div>
        </div>
    </div>
}