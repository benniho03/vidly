console.log("Hello?")
import { title } from "process"
import { fetchVideos } from "~/app/data-mining/youtube/videos"
import { keywords } from "~/keywords"
import { db } from "~/server/db"

const RESULTS_PER_KEYWORD = 1000

export default async function queryVideos() {
    let quotaExceeded = false

    const mostUsedKeywordResults = await db.videos.groupBy({
        by: ["query"],
        _count: {
            _all: true
        },
        orderBy: {
            _count: {
                query: "asc"
            }
        }
    })

    const keywordUsage = mostUsedKeywordResults.map(keyword => ({
        keyword: keyword.query,
        count: keyword._count._all
    }))

    const unusedKeywords = keywords.filter(keyword => !keywordUsage.find(k => k.keyword === keyword))

    const keywordsToQuery = unusedKeywords.length > 0 ? unusedKeywords : mostUsedKeywordResults.map(k => k.query)

    let videos = []
    console.log("Looking for videos with keywords: ", keywordsToQuery)
    for (const keyword of keywordsToQuery) {
        if (!keyword) continue
        const apiKey = process.env.API_KEY_NEW

        if (!apiKey) {
            return
        }

        if (!quotaExceeded) {
            try {

                const result = await fetchVideos({
                    searchTerm: keyword,
                    maxResults: RESULTS_PER_KEYWORD,
                    apiToken: apiKey
                })

                videos.push(...result)
            } catch (e) {
                console.error(e)
                // Update API Key to be unusable when quota is exceeded
                quotaExceeded = true
            }
        }

    }

    const { count } = await db.videos.createMany({
        data: videos,
    })

    console.log("Created " + count + " videos")
}
await queryVideos()