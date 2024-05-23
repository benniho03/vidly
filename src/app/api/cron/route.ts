import { NextRequest } from "next/server"
import { getVideos } from "~/scripts/videos"
import { db } from "~/server/db"
import { authenticateCronJob } from "./auth"

export async function GET(req: NextRequest) {

    const keywords = [
        "gardening",
        "flowers",
        "greenhouse",
        "plants",
        "vegetables",
        "fruit",
        "trees",
        "landscaping",
        "gardens",
        "lawn",
        "soil",
        "compost",
        "mulch",
        "fertilizer",
        "garden pests",
        "weeds",
        "plant disease",
        "pruning",
        "propagation",
        "gardening tools",
        "gardening equipment",
        "irrigation",
        "watering",
    ] as const

    const { authenticated } = authenticateCronJob(req)
    if(!authenticated) return new Response("Unauthorized", { status: 401 })

    try {

        const now = new Date()
        const dateOfMonth = now.getDate()

        const result = await getVideos({
            maxResults: 4000,
            searchTerm: keywords[dateOfMonth % keywords.length] ?? keywords[0],
        })

        console.warn("Cron job got videos")

        if (result.body.videos.length === 0) {
            return new Response("No videos found", { status: 404 })
        }

        const { count } = await db.videos.createMany({
            data: result.body.videos,
        })

        console.warn("Created " + count + " videos")

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}