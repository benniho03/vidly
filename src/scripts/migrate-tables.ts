import { createVideosV2 } from "~/app/api/cron/route";
import { db } from "~/server/db";

const allVideos = await db.videos.findMany()
const videosNotNull = allVideos.map(video => ({
    id: video.id!,
    videoId: video.videoId!,
    title: video.title!,
    thumbnail: video.thumbnail!,
    description: video.description!,
    channel: video.channel!,
    likeCount: video.likeCount!,
    commentCount: video.commentCount!,
    viewCount: video.viewCount!,
    duration: video.duration!,
    publishedAt: video.publishedAt!,
    caption: video.caption!,
    tags: video.tags!,
    topicCategories: video.topicCategories!,
    language: video.language!,
    categoryid: video.categoryid!,
    query: video.query!,
}))

// await createVideosV2(videosNotNull)
console.log("Uncomment the above line to run the migration script.")