import { getVideos } from "~/app/data-mining"
import { removeDuplicateVideoIds } from "~/scripts/remove-duplicates"
import { db } from "~/server/db"

export async function GET() {

    try {

        const { count, error } = await removeDuplicateVideoIds()

        if (count < 0) {
            return new Response(JSON.stringify(error), { status: 500 })
        }

        return new Response(`Removed ${count} Duplicates`, {
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