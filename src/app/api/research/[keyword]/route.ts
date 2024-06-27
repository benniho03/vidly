import { NextRequest } from "next/server"
import { getVideos } from "~/scripts/videos"
import { db } from "~/server/db"

const AMOUNT_OF_VIDEOS = 100

export const dynamic = "force-dynamic"
export async function GET(_req: NextRequest, { params: { keyword } }: { params: { keyword: string } }) {

    const keywordParsed = parseKeyword(keyword)

    const videosInDb = await db.research.count({
        where: {
            query: keywordParsed
        }
    })

    if (!videosInDb || videosInDb < AMOUNT_OF_VIDEOS) {

        const { videos } = (await getVideos({
            maxResults: AMOUNT_OF_VIDEOS,
            searchTerm: keywordParsed,
            newAPIToken: true
        })).body
        console.log("youtube", videos)

        await db.research.createMany({
            data: [...videos.map(video => ({
                ...video,
                query: keywordParsed
            }))]
        })
    }

    const videos = await db.research.findMany({
        where: {
            query: keyword
        }
    })

    return new Response(JSON.stringify(videos), {
        status: 200,
    })
}

function parseKeyword(keyword: string) {
    return decodeURIComponent(keyword).toLowerCase()
}