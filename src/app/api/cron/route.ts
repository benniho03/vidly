import { NextRequest } from "next/server"
import { getVideos } from "~/scripts/videos"
import { db } from "~/server/db"
import { authenticateCronJob } from "./auth"
import { Video } from "~/app/data-mining/youtube/videos"

export const keywords = [
    "garden",
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
    "plant pruning",
    "plant propagation",
    "gardening tools",
    "gardening equipment",
    "watering",
    "Weed control",
    "Gardening tips",
    "Garden life hacks",
    "Garden tutorials",
    "Repotting plants",
    "Taking plant cuttings",
    "Garden care",
    "Garden ideas",
    "Garden projects",
    "DIY garden",
    "Pruning roses",
    "Creating raised beds",
    "Herb garden",
    "Harvesting herbs",
    "Orchard",
    "Planting fruit trees",
    "Planting berries",
    "Winter-hardy plants",
    "Low-maintenance plants",
    "Natural garden",
    "Mowing the lawn",
    "Seeding the lawn",
    "Laying sod",
    "Fertilizing the lawn",
    "Gardening for beginners",
    "Vertical garden",
    "Planting a balcony garden",
    "Creating a garden pond",
    "Pond maintenance",
    "Creating a lawn",
    "Pruning trees",
    "Pruning shrubs",
    "Child-friendly garden",
    "Building a birdhouse",
    "Insect hotel",
    "Wildlife in the garden",
    "Frost protection in the garden",
    "Summer flowers",
    "Spring flowers",
    "Garden furniture",
    "Garden lighting",
    "Garden decoration",
    "Taking cuttings",
] as const

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
            const index = ((now.getDate() - 1) * 4) % keywords.length
            const result = await getVideos({
                maxResults: 1000,
                searchTerm: keywords[index] ?? keywords[0],
            })

            results.push(...result.body.videos)
        }

        console.log("Found " + results.length + " videos")

        if (results.length === 0) {
            return new Response("No videos found", { status: 404 })
        }

        await createVideosV2(results)

        const { count } = await db.videos.createMany({
            data: results,
        })

        console.warn("Created " + count + " videos")

        return new Response(JSON.stringify(results), {
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

        await db.searchterm_helper.create({
            data: {
                query: video.query,
                videoId: video.videoId!,
            }
        })
    }
}
