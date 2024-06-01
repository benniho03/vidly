import { db } from "~/server/db";
import { AmountOfVideosByCategory } from "./numberVideosByCategory";
import { Video } from "../data-mining/youtube/videos";
import { ViewsByCategory } from "./viewsByCategory";
import { WeekDayByViews } from "./weekDaybyViews";

export default async function Gardening() {

    const rawVideos = await db.videos.findMany();
    const videos = assertVideos(rawVideos);

    return (
        <div>
            <h1>Gardening</h1>
            <p>Here you can find all the information you need to know about gardening.</p>
            {/* <AmountOfVideosByCategory videos={formatVideos(videos)} />
            <ViewsByCategory videos={videos.map(v => ({
                categoryid: v.categoryid,
                viewCount: v.viewCount
            }))} /> */}
            <WeekDayByViews videos={videos.map(v => ({
                published: v.publishedAt,
                viewCount: v.viewCount
            }))} />
        </div>
    );
}

function assertVideos(videos: any): Video[] {
    return videos.map((video: any) => ({
        id: video.id,
        videoId: video.videoId ?? "",
        title: video.title ?? "",
        thumbnail: video.thumbnail ?? "",
        description: video.description ?? "",
        channel: video.channel ?? "",
        likeCount: video.likeCount ?? "",
        commentCount: video.commentCount ?? "",
        viewCount: video.viewCount ?? "",
        duration: video.duration ?? "",
        publishedAt: video.publishedAt ?? "",
        caption: video.caption ?? "",
        tags: video.tags ?? [],
        categoryid: video.categoryid ?? 0,
        topicCategories: video.topicCategories ?? [],
        language: video.language ?? "",
        query: video.query ?? ""
    }))
}