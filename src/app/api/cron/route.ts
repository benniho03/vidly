import { getVideos } from "~/app/data-mining"
import { db } from "~/server/db"

export async function GET() {

    console.warn("Cron job started")

    const result = await getVideos({
        maxResults: 50,
        searchTerm: "minecraft"
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
}