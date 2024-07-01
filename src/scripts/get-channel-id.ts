import { current } from "tailwindcss/colors"
import { db } from "~/server/db"

type channelData = {
    id: string
    title: string
    thumbnail: string
    description: string
    publishedAt: string | Date
    country: string
    viewCount: number
    subscriberCount: number
    videoCount: number
    madeforkids: string
}

await getVideoChannelId() // uncomment to run
// console.log("Uncomment to run getVideoChannelId")

async function getVideoChannelId() {

    const results = await db.videos.findMany({
        select: {
            videoId: true
        }
    })

    const videoIds = results.map(result => result.videoId)

    for (let i = 0; i < Math.ceil(videoIds.length / 50); i++) {

        const chunk = videoIds.slice(i * 50, (i + 1) * 50)

        const params = new URLSearchParams({
            part: "snippet,statistics,contentDetails,topicDetails",
            id: Array.isArray(chunk) ? chunk.join(",") : chunk,
            key: process.env.API_KEY_CHANNELS as string
        })

        const response = await fetch("https://www.googleapis.com/youtube/v3/videos?" + params)

        if (!response.ok) {
            console.error(response.status, response.statusText)
            // console.log(await response.text())
            throw new Error("Failed to fetch videos",)
        }

        const data = await response.json()

        if (!data.items) throw new Error("No videos found")

        const channelIds = data.items.map((item: { snippet: { channelId: string } }) => item.snippet.channelId)

        for (const item of data.items) {
            console.log(item.id, item.snippet.channelId)
            await db.videos.updateMany({
                where: {
                    videoId: {
                        contains: item.id
                    }
                },
                data: {
                    channel: item.snippet.channelId
                }
            })
        }

        await createChannelData(channelIds)
    }
}

export async function createChannelData(channelIds: string[]) {

    let channels = []

    for (let i = 0; i < Math.ceil(channelIds.length / 50); i++) {


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
        channels.push(...channelData)
    }

    for (const channel of channels) {
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
