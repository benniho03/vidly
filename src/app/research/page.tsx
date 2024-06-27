"use client"
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Video } from "../data-mining/youtube/videos";
import { EyeIcon, HandThumbUpIcon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { WeekDayByViews } from "../gardening/weekDaybyViews";
import toast from "react-hot-toast";
import { VideoTable } from "./_data-table/videoDataTable";

export default function ResearchPage() {

    const [keyword, setKeyword] = useState(getKeyword())

    return <>
        <div>
            <div className="hero">
                <img src="/assets/research-hero.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-neutral-700"></div>
                    <h1>RESEARCH</h1>
                    <p>Welcome to our research page. With our search functions you have the possibility to search for a topic of your choice. Existing YouTube videos will then be displayed. But also when is the perfect time to upload a video with your search term so that it reaches as many users on YouTube as possible.</p>
                    <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
                    <div className="pictures flex space-x-4">

                        <div className="picture-one">
                            <img src="/assets/research-image-1.jpg" />
                        </div>
                        <div className="picture-two">
                            <img src="/assets/research-image-2.jpg" />
                        </div>

                    </div>
                </div>
                <div className="searchform">
                    <h2>Search for your favorite topic</h2>
                    <p className="mb-8">Enter a search term of your choice and view the results.</p>
                    <form
                        action={updateKeyword}
                        className="max-w-7xl mx-auto flex items-center justify-center gap-2 my-3"
                    >
                        <input type="text" name="keyword" placeholder="Type your keyword" className="text-neutral-900 w-full px-2 py-4" />
                        <button
                            type="submit"
                            className="m-0 flex gap-1 items-center"
                        >
                            <MagnifyingGlassIcon className="size-12" />
                        </button>
                    </form>
                    {
                        keyword && <ResearchResults keyword={keyword} />
                    }
                </div>
            </div>
        </div>

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
        <div className="max-w-7xl mx-auto">
            <VideoList videos={videos} />
            <WeekDayByViews videos={videos.map(video => ({
                published: video.publishedAt?.toString()!,
                viewCount: video.viewCount
            }))} />
            {/* <VideoTable videos={videos} /> */}
        </div>
    </div>
}

function VideoList({ videos }: { videos: Video[] }) {
    const PAGE_SIZE = 10
    const [page, setPage] = useState(1)

    return <div className="flex flex-col gap-3">

        {[...videos].splice(page * PAGE_SIZE, PAGE_SIZE).map(video => <VideoDisplay video={video} />)}
        <div className="flex gap-4">
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
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
    const data: Video[] = await response.json()
    return data.map(video => ({
        ...video,
        publishedAt: video.publishedAt ? new Date(video.publishedAt) : undefined
    })) as Video[]
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