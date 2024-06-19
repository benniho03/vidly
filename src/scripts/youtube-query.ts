console.log("Hello?")
import { title } from "process"
import { fetchVideos } from "~/app/data-mining/youtube/videos"
import { keywords } from "~/keywords"
import { db } from "~/server/db"

const RESULTS_PER_KEYWORD = 1000

export default async function queryVideos() {
    let quotaExceeded = false

    const mostUsedKeywordResults = await db.videos.groupBy({
        by: ["query"],
        _count: {
            _all: true
        },
        orderBy: {
            _count: {
                query: "asc"
            }
        }
    })

    const keywordUsage = mostUsedKeywordResults.map(keyword => ({
        keyword: keyword.query,
        count: keyword._count._all
    }))

    const unusedKeywords = keywords.filter(keyword => !keywordUsage.find(k => k.keyword === keyword))

    const keywordsToQuery = unusedKeywords.length > 0 ? unusedKeywords : mostUsedKeywordResults.map(k => k.query)

    let videos = []
    console.log("Looking for videos with keywords: ", keywordsToQuery)
    for (const keyword of keywordsToQuery) {
        if (!keyword) continue
        const apiKey = process.env.API_KEY_NEW

        if (!apiKey) {
            return
        }

        if (!quotaExceeded) {
            try {

                const result = await fetchVideos({
                    searchTerm: keyword,
                    maxResults: RESULTS_PER_KEYWORD,
                    apiToken: apiKey
                })

                videos.push(...result)
            } catch (e) {
                console.error(e)
                // Update API Key to be unusable when quota is exceeded
                quotaExceeded = true
            }
        }

    }

    const { count } = await db.videos.createMany({
        data: videos,
    })
    console.log("Created " + count + " videos")

    const channelIds = [...new Set(videos.map(video => video.channel))]

    await createChannelData(channelIds)

}
await queryVideos()

export async function createChannelData(channelIds: string[]) {

    const channelParams = new URLSearchParams({
        part: "snippet,statistics,status",
        id: Array.isArray(channelIds) ? channelIds.join(",") : channelIds,
        key: process.env.API_KEY_CHANNELS as string
    })

    const channelResponse = await fetch("https://www.googleapis.com/youtube/v3/channels?" + channelParams)

    if (!channelResponse.ok) {
        console.error(channelResponse.status, channelResponse.statusText)
        // console.log(await response.text())
        throw new Error("Failed to fetch videos",)
    }

    const data = await channelResponse.json()

    const channelData = data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title ?? null,
        thumbnail: item.snippet.thumbnails.default.url ?? null,
        description: item.snippet.description ?? null,
        publishedAt: item.snippet.publishedAt ?? null,
        country: item.snippet.country ?? null,
        viewCount: Number(item.statistics.viewCount) ?? null,
        subscriberCount: Number(item.statistics.subscriberCount) ?? null,
        videoCount: Number(item.statistics.videoCount) ?? null,
        madeforkids: JSON.stringify(item.status.madeForKids) ?? null
    }))

    for (const channel of channelData) {
        const currentChannel = await db.channels.findFirst({
            where: {
                id: {
                    contains: channel.id
                }
            }
        })

        if (currentChannel) return

        await db.channels.create({
            data: channel
        })
    }
}
