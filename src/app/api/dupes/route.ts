import { removeDuplicateVideoIds } from "~/scripts/remove-duplicates"
import { db } from "~/server/db"
import { authenticateCronJob } from "../cron/auth"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {

    const { authenticated } = authenticateCronJob(req)
    if(!authenticated) return new Response("Unauthorized", { status: 401 })

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