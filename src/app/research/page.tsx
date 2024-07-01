"use client"
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Video } from "../data-mining/youtube/videos";
import { EyeIcon, HandThumbUpIcon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { WeekDayByViews } from "../gardening/weekDaybyViews";
import toast from "react-hot-toast";
import { DiagramDisplay } from "../tremor/diagramDisplay";
import ViewsDiagrams from "../tremor/viewsDiagrams";
import { MultipleTags } from "../gardening/multipleTags";
import { InteractiveScatterPlot } from "~/components/scatter-plot";
import { LoadingSpinner } from "../_components/loadingSpinner";

export default function ResearchPage() {

    const [keyword, setKeyword] = useState("")

    return <>
        <div>
            <div className="hero">
                <img src="/assets/research-hero.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-neutral-700"></div>
                    <h1>RESEARCH</h1>
                    <p>Welcome to our research page.
                        With our search functionality you have the possibility to search for a topic of your choice.
                        We will look for videos about that topic and show you the information. Find out when to upload your video or how long your videos should be for ultimate success.</p>
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
                <div className="searchform mb-5">
                    <h2>Search for your favorite topic</h2>
                    <p className="mb-8">Enter a search term of your choice and view the results.</p>
                    <form
                        action={updateKeyword}
                        className="mx-auto flex items-center justify-center gap-2 my-3 mb-6"
                    >
                        <input type="text" name="keyword" placeholder="Type your keyword" className="text-neutral-900 w-full px-2 py-4 text-2xl" />
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

    if (isLoading) return <div className="w-full flex items-center mx-auto"><LoadingSpinner /></div>
    if (error) return <div>Error: {error.message}</div>
    if (!videos || !videos.length) return <div>No videos found</div>

    const videosForDiagram = videos.filter(v => !!v.publishedAt && !!v.viewCount)
    const videosForMultipleTags = videos.map(v => ({
        videoId: v.videoId,
        tags: v.tags,
        clicks: v.viewCount
    }));

    return <div>
        <div className="max-w-7xl mx-auto">
            <div className="mb-5">
                <h2>TOP VIDEOS</h2>
                <p className="mb-3">
                    What are the top videos for the searchterm "{keyword}"? Take a look at what other creators are being successful with and find new ideas for your videos.
                    You can navigate the pages via the buttons below.
                </p>
                <VideoList videos={videos} />
            </div>
            <div className="mb-5">
                <h2>BEST UPLOAD TIMES</h2>
                <p className="mb-3">
                    Want to find out what time is best for uploading your video.
                    With the dropdown you can toggle between different views.
                </p>
                <WeekDayByViews videos={videosForDiagram.map(v => ({
                    published: v.publishedAt!.toISOString(),
                    viewCount: v.viewCount!
                }))}
                    color="gray"
                />
            </div>
            <div className="mb-5">
                <h2>MOST USED TAGS FOR "{keyword}"</h2>
                <p className="mb-3">
                    Here you can see the most used tags for the searchterm "{keyword}".
                    This can help you to find out which tags are popular and which tags you should use for your video.
                </p>
                <MultipleTags videoTags={videosForMultipleTags} color="gray" />
            </div>
            <div className="mb-5">
                <h2>INTERACTIVE SCATTER PLOT</h2>
                <p className="mb-3">
                    Use our scatter plot to find correlations between the view count, the like count, the comment count and duration. Optimize the length of your videos to achieve your goals!
                </p>
                <InteractiveScatterPlot videos={videos} color="gray" />
            </div>
        </div>
    </div>
}

function VideoList({ videos }: { videos: Video[] }) {
    const PAGE_SIZE = 10
    const [page, setPage] = useState(0)

    const videoPage = [...videos].splice(page * PAGE_SIZE, PAGE_SIZE)

    if (!videoPage.length) return <div className="flex flex-col items-center">
        <p className="text-center">That's all</p>
        <button className="px-2 py-3 bg-neutral-700 text-neutral-50 rounded" onClick={() => setPage(1)}>Back to the beginning</button>
    </div>

    return <div>
        <div className="grid grid-cols-2 gap-3 mb-5">
            {videoPage.map(video => <VideoDisplay video={video} />)}
        </div>
        <div className="flex gap-4 mx-auto w-full justify-center items-center">
            <button onClick={() => setPage(page - 1)} className="px-2 py-3 bg-neutral-700 text-neutral-50 rounded mt-0">Previous</button>
            <span>{page + 1} / 10</span>
            <button onClick={() => setPage(page + 1)} disabled={page + 1 >= videos.length / PAGE_SIZE} className="px-2 py-3 bg-neutral-700 text-neutral-50 rounded mt-0">Next</button>
        </div>
    </div>
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
    return <div className="flex gap-2 " key={video.id}>
        <img src={video.thumbnail!} />
        <div className="flex flex-col justify-around items-start">
            <p className="p-0 m-0"><a href={`https://www.youtube.com/watch?v=${video.videoId}`} className="text-neutral-800 underline">{video.title}</a></p>
            <p className="text-neutral-400 p-0 m-0">{video.channel}</p>
            <div className="flex gap-4 text-neutral-900">
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
                    <span>{video.commentCount}</span>
                </div>
            </div>
        </div>
    </div>
}