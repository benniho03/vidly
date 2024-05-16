import { db } from "~/server/db";

export async function GET() {
    try {

        const video = await db.videos.findFirst()

        if (!video) {
            return new Response("No video found", { status: 404 })
        }

        return new Response(JSON.stringify(video), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error(error)
        return new Response("Internal server error" + error, { status: 500 })
    }
}