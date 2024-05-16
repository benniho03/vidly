import { iso8601ToSeconds } from "../helpers/duration-parser"


export async function getVideoDetails({
     videoIds, searchTerm 
    }: {
         videoIds: string[] | string, searchTerm: string 
        }): Promise<any[]> {

    const videoDetails = []

    for (let i = 0; i < Math.ceil(videoIds.length / 50); i++) {

        const chunk = videoIds.slice(i * 50, (i + 1) * 50)

        const params = new URLSearchParams({
            part: "snippet,statistics,contentDetails,topicDetails",
            id: Array.isArray(chunk) ? chunk.join(",") : chunk,
            key: process.env.API_KEY as string,
        })

        const response = await fetch("https://www.googleapis.com/youtube/v3/videos?" + params)

        if (!response.ok) {
            console.error(response.status, response.statusText)
            // console.log(await response.text())
            throw new Error("Failed to fetch videos",)
        }

        const data = await response.json()

        if (!data.items) throw new Error("No videos found")

        videoDetails.push(...data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title ?? null,
            thumbnail: item.snippet.thumbnails.default.url ?? null,
            description: item.snippet.description ?? null,
            channel: item.snippet.channelTitle ?? null,
            likeCount: Number(item.statistics.likeCount) ?? null,
            commentCount: Number(item.statistics.commentCount) ?? null,
            viewCount: Number(item.statistics.viewCount) ?? null,
            duration: iso8601ToSeconds(item.contentDetails.duration) ?? null,
            publishedAt: item.snippet.publishedAt ?? null,
            caption: item.contentDetails.caption ?? null,
            tags: item.snippet.tags ?? [],
            topicCategories: item.topicDetails?.topicCategories ?? [],
            language: item.snippet.defaultAudioLanguage ?? null,
            query: searchTerm,
        })))
    }

    return videoDetails.map(video => {
        const videoId = video.id
        delete video.id
        return {
            videoId,
            ...video
        }
    })
}
