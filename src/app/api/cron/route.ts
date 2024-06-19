import { NextRequest } from "next/server"
import { getVideos } from "~/scripts/videos"
import { db } from "~/server/db"
import { authenticateCronJob } from "./auth"
import { Video } from "~/app/data-mining/youtube/videos"
import { addCalculatedFields } from "~/scripts/calculated-fields"
import { keywords } from "~/keywords"

export const maxDuration = 30
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {

    try {

        const now = new Date()

        const { authenticated } = authenticateCronJob(req)
        if (!authenticated) {
            console.error("Received unauthorized request")
            return new Response("Unauthorized", { status: 401 })
        }
        let results: Video[] = []

        for (let i = 0; i < 4; i++) {
            const index = ((now.getDate() - 1) * 4) % keywords.length + i
            const result = await getVideos({
                maxResults: 1000,
                searchTerm: keywords[index] ?? keywords[0],
                // searchTerm: "minecraft",
            })

            results.push(...result.body.videos)
        }

        console.log("Found " + results.length + " videos")

        if (results.length === 0) {
            return new Response("No videos found", { status: 404 })
        }

        await createVideosV2(results)
        console.log("V2 created")

        const { count } = await db.videos.createMany({
            data: results,
        })
        console.log("V1 created")

        console.warn("Created " + count + " videos")

        return new Response(`Created ${count} videos`, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.log(error)
        return new Response("An Error occured", { status: 200 })
    }
}

export async function createVideosV2(videos: Video[]) {
    for (const video of videos) {
        const found = await db.videos_v2.findFirst({
            where: {
                videoId: video.videoId,
            }
        })

        const foundSearchTerm = await db.searchterms.findFirst({
            where: {
                query: video.query,
            }
        })

        if (!foundSearchTerm) {
            await db.searchterms.create({
                data: {
                    query: video.query,
                }
            })
        }

        if (!found) {
            await db.videos_v2.create({
                data: video,
            })
        }

        await db.searchterm_helper.upsert({
            where: {
                AND: {
                    query: video.query,
                    videoId: video.videoId!,
                },
                videoId_query: {
                    query: video.query,
                    videoId: video.videoId!,
                },
            },
            create: {
                query: video.query,
                videoId: video.videoId!,
            },
            update: {},
        })
    }
}

