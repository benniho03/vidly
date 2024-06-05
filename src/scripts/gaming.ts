import fs from "fs/promises"

export default async function getGamingVideos({ pageToken }: { pageToken: string }) {

    const params = new URLSearchParams({
        part: "snippet,statistics,contentDetails,topicDetails",
        pageToken,
        chart: "mostPopular",
        regionCode: "DE",
        videoCategoryId: "20",
        maxResults: "50",
        key: "AIzaSyAQfZSM7eKT5UP8ahpyIk4vl0hsOB5vMjo",
    })

    const res = await fetch("https://youtube.googleapis.com/youtube/v3/videos?" + params)

    if (!res.ok) {
        console.error(res.status, res.statusText, await res.json())
        throw new Error("Failed to fetch videos")
    }
    const data = await res.json()
    console.log("Res", ({ ...data, items: "items here!" }))

    return {
        videos: data.items,
        nextPageToken: data.nextPageToken,
    }
}