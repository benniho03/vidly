"use client"
import { ChatBubbleLeftIcon, EyeDropperIcon, EyeIcon, HandThumbUpIcon, HeartIcon, ScaleIcon } from '@heroicons/react/24/solid'

type MLResults = {
    probability: number,
    comments: number,
    likes: number,
    views: number,
}

import { useState } from "react";
import { LoadingSpinner } from "../_components/loadingSpinner";
import { formatNumber } from '~/lib/utils';

export function MachineLearningForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [publishedAt, setPublishedAt] = useState(new Date());
    const [handle, setHandle] = useState("");
    const [result, setResult] = useState<MLResults | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit() {
        await sendForm({
            title,
            description,
            duration,
            publishedAt,
            handle
        })
    }

    return <div className="ki-form flex flex-col gap-3 mx-auto">
        <h2>Your Video</h2>
        <p className="mb-8">Enter the information about your video with which you would upload it and see how many likes, comments and so on your video will achieve.</p>
        <div className="flex gap-3 ">
            <div className="flex flex-col w-1/3">
                <label htmlFor="handle">Channel Handle</label>
                <input onChange={e => setHandle(e.target.value)} type="text" placeholder="handle" name="handle" className="text-neutral-800" />
            </div>
            <div className="flex flex-col w-2/3">
                <label htmlFor="title">Title</label>
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder="title" name="title" className="text-neutral-800" />
            </div>
        </div>
        <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea onChange={e => setDescription(e.target.value)} placeholder="description" name="description" className="text-neutral-800 min-h-24" />
        </div>
        <div className="flex gap-3">
            <div className="flex flex-col w-full">
                <label htmlFor="duration">Duration</label>
                <input onChange={e => setDuration(e.target.value)} type="text" placeholder="duration" name="duration" className="text-neutral-800" />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="publishedAt">Publishing Date</label>
                <input onChange={e => setPublishedAt(new Date(e.target.value))} type="datetime-local" placeholder="publishedAt" name="publishedAt" className="text-neutral-800" />
            </div>
        </div>
        <button className="w-full text-white bg-fuchsia-800 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-fuchsia-800 dark:hover:bg-fuchsia-500 dark:focus:ring-gray-700 dark:border-gray-700" onClick={(handleSubmit)}>submit</button>
        <Result result={result} isLoading={isLoading} title={title} handle={handle} />
    </div>

    async function sendForm({
        title,
        description,
        duration,
        publishedAt,
        handle
    }: {
        title: string,
        description: string,
        duration: string,
        publishedAt: Date,
        handle: string
    }) {
        setIsLoading(true)
        const res = await fetch("/api/ki-helper/" + handle)
        const data = await res.json()
        const { viewCount, subscriberCount, videoCount } = data
        const machineLearningResponse = await fetch("https://datascience.kistner-it.de/", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                duration,
                month: publishedAt.getMonth(),
                weekday: publishedAt.getDay(),
                hour: publishedAt.getHours(),
                totalChannelViews: viewCount,
                subscriberCount,
                videoCount
            }),
        })
        const mlData = await machineLearningResponse.json()
        setResult({
            probability: Math.floor(mlData.probability * 100),
            comments: Math.floor(mlData.predictedComments),
            likes: Math.floor(mlData.predictedLikes),
            views: Math.floor(mlData.predictedViews)
        })
        setIsLoading(false)
    }
}

function Result({ result, isLoading, title, handle }: { result: MLResults | null, isLoading: boolean, title: string, handle: string }) {

    if (isLoading) return <div className='w-full flex justify-center'>
        <LoadingSpinner />
    </div>
    if (!result) return

    return <>
        <h2>Your Prediction</h2>
        <div className='w-4/5 mx-auto'>
            <p>{handle}: {title}</p>
        </div>
        <div className="flex w-4/5 mx-auto gap-2 justify-between">
            <div className="flex gap-2 p-4 justify-center items-center">
                <ScaleIcon className='w-8 h-8' />
                <p className='mt-0'>{formatNumber(result.probability)}%</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <EyeIcon className='w-8 h-8' />
                <p className='mt-0'>{formatNumber(result.views)}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <HandThumbUpIcon className='w-8 h-8' />
                <p className='mt-0'>{formatNumber(result.likes)}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <ChatBubbleLeftIcon className='w-8 h-8' />
                <p className='mt-0'>{formatNumber(result.comments)}</p>
            </div>
        </div>
    </>
}
