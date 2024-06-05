import { NextRequest } from "next/server";
import { iso8601ToSeconds } from "~/app/data-mining/helpers/duration-parser";
import getGamingVideos from "~/scripts/gaming";
import { db } from "~/server/db";

const QUOTA = 50

export async function GET() {
    for (let i = 0; i <= QUOTA / 50; i++) {
        console.log("Round: ", i, "of", QUOTA / 50, "rounds")
        const pageTokenResult = await db.pagetoken.findFirst({
            orderBy: {
                createdat: "desc",
            },
        })
        console.log("From DB: ", pageTokenResult)

        const { videos, nextPageToken } = await getGamingVideos({ pageToken: pageTokenResult?.pagetoken ?? "" })

        console.log("From YT: ", nextPageToken)

        const formattedVideos = formatGamingVideosForDb(videos)

        await db.gaming.createMany({
            data: formattedVideos,
        })

        await db.pagetoken.create({
            data: {
                pagetoken: nextPageToken,
            }
        })

    }

    return new Response("Works?")

}

function formatGamingVideosForDb(videos: any[]) {
    return videos.map(video => ({
        videoId: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url,
        description: video.snippet.description,
        channel: video.snippet.channelTitle,
        likeCount: Number(video.statistics.likeCount),
        commentCount: Number(video.statistics.commentCount),
        viewCount: Number(video.statistics.viewCount),
        duration: iso8601ToSeconds(video.contentDetails.duration),
        publishedAt: video.snippet.publishedAt,
        caption: video.snippet.localized.caption,
        tags: video.snippet.tags,
        categoryid: Number(video.snippet.categoryId),
        topicCategories: video.topicDetails.topicCategories,
        language: video.snippet.defaultAudioLanguage,
    }))
}