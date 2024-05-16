import { getVideos } from "~/app/data-mining"
import { db } from "~/server/db"

export async function GET() {

    const result = await getVideos({
        maxResults: 3,
        searchTerm: "minecraft"
    })

    if (result.body.videos.length === 0) {
        return new Response("No videos found", { status: 404 })
    }

    const { count } = await db.videos.createMany({
        data: result.body.videos,
    })

    return new Response(`Found ${count} videos`, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}