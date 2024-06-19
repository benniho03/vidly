import { Prisma } from "@prisma/client"
import { iso8601ToSeconds } from "../helpers/duration-parser"
import { getCalculatedFields } from "~/scripts/calculated-fields"
import { fetchVideoIds } from "./search"

export type Video = {
    id: string
    videoId: string | null
    title: string
    thumbnail: string
    description: string
    channel: string
    likeCount: number
    commentCount: number
    viewCount: number
    duration: number
    publishedAt: string | Date
    caption: string
    tags: string[]
    categoryid: number
    topicCategories: string[]
    language: string
    query: string
}

export type VideoDb = Prisma.videosCreateInput

export async function getVideoDetails({
    videoIds, searchTerm, newAPIToken = false
}: {
    videoIds: string[] | string, searchTerm: string, newAPIToken?: boolean
}): Promise<Video[]> {

    const videoDetails: Video[] = []

    for (let i = 0; i < Math.ceil(videoIds.length / 50); i++) {

        const chunk = videoIds.slice(i * 50, (i + 1) * 50)

        const params = new URLSearchParams({
            part: "snippet,statistics,contentDetails,topicDetails",
            id: Array.isArray(chunk) ? chunk.join(",") : chunk,
            key: newAPIToken ?
                process.env.API_KEY_NEW as string :
                process.env.API_KEY as string,
        })

        const response = await fetch("https://www.googleapis.com/youtube/v3/videos?" + params)

        if (!response.ok) {
            console.error(response.status, response.statusText)
            // console.log(await response.text())
            throw new Error("Failed to fetch videos",)
        }

        const data = await response.json()

        if (!data.items) throw new Error("No videos found")

        videoDetails.push(...data.items.map((item: any) => ({
            videoId: item.id ?? null,
            title: item.snippet.title ?? null,
            thumbnail: item.snippet.thumbnails.default.url ?? null,
            description: item.snippet.description ?? null,
            channel: item.snippet.channelId ?? null,
            categoryid: Number(item.snippet.categoryId) ?? null,
            likeCount: Number(item.statistics.likeCount) ?? null,
            commentCount: Number(item.statistics.commentCount) ?? null,
            viewCount: Number(item.statistics.viewCount) ?? null,
            duration: iso8601ToSeconds(item.contentDetails.duration) ?? null,
            publishedAt: item.snippet.publishedAt ?? null,
            caption: item.contentDetails.caption ?? null,
            tags: item.snippet.tags ?? [],
            topicCategories: item.topicDetails?.topicCategories ?? [],
            language: item.snippet.defaultAudioLanguage ?? null,
            query: searchTerm,
        })))
    }

    return videoDetails as Video[]
}

export async function fetchVideoDetails({ videoIds, searchTerm, apiToken }: { videoIds: string[] | string, searchTerm: string, apiToken: string }) {
    const videoDetails: Video[] = []

    for (let i = 0; i < Math.ceil(videoIds.length / 50); i++) {

        const chunk = videoIds.slice(i * 50, (i + 1) * 50)

        const params = new URLSearchParams({
            part: "snippet,statistics,contentDetails,topicDetails",
            id: Array.isArray(chunk) ? chunk.join(",") : chunk,
            key: apiToken
        })

        const response = await fetch("https://www.googleapis.com/youtube/v3/videos?" + params)

        if (!response.ok) {
            console.error(response.status, response.statusText)
            // console.log(await response.text())
            throw new Error("Failed to fetch videos",)
        }

        const data = await response.json()

        if (!data.items) throw new Error("No videos found")

        videoDetails.push(...data.items.map((item: any) => ({
            videoId: item.id ?? null,
            title: item.snippet.title ?? null,
            thumbnail: item.snippet.thumbnails.default.url ?? null,
            description: item.snippet.description ?? null,
            channel: item.snippet.channelId ?? null,
            categoryid: Number(item.snippet.categoryId) ?? null,
            likeCount: Number(item.statistics.likeCount) ?? null,
            commentCount: Number(item.statistics.commentCount) ?? null,
            viewCount: Number(item.statistics.viewCount) ?? null,
            duration: iso8601ToSeconds(item.contentDetails.duration) ?? null,
            publishedAt: item.snippet.publishedAt ?? null,
            caption: item.contentDetails.caption ?? null,
            tags: item.snippet.tags ?? [],
            topicCategories: item.topicDetails?.topicCategories ?? [],
            language: item.snippet.defaultAudioLanguage ?? null,
            query: searchTerm,
        })))
    }

    return videoDetails.map(getCalculatedFields) as Video[]
}

export async function fetchVideos({ searchTerm, maxResults, apiToken }: { searchTerm: string, maxResults: number, apiToken: string }) {
    const videoIds = await fetchVideoIds({ searchTerm, maxResults, apiToken })
    return await fetchVideoDetails({ videoIds, searchTerm, apiToken })
}