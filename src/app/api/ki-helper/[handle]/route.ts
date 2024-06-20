import { NextApiRequest } from "next"

export async function GET(req: NextApiRequest, { params }: { params: { handle: string } }) {

    const response = await fetch("https://www.googleapis.com/youtube/v3/channels?" + new URLSearchParams({
        part: "snippet,statistics",
        forHandle: params.handle as string,
        key: process.env.API_KEY_CHANNELS as string
    }))

    const channel = await response.json()

    const data = {
        viewCount: channel.items[0].statistics.viewCount,
        subscriberCount: channel.items[0].statistics.subscriberCount,
        videoCount: channel.items[0].statistics.videoCount,
    }

    return new Response(JSON.stringify(data))

}