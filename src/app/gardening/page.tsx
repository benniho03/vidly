import { db } from "~/server/db";
import { AmountOfVideosByCategory } from "./numberVideosByCategory";
import { Video } from "../data-mining/youtube/videos";
import { ViewsByCategory } from "./viewsByCategory";
import { WeekDayByViews } from "./weekDaybyViews";
import { ViewsByTagsCount } from "./viewsByTagsCount";

export default async function Gardening() {

    const rawVideos = await db.videos.findMany();
    const videos = assertVideos(rawVideos);

    return (
        <div>
            <div className="hero">
                <img src="/assets/hero-gardening.jpg"/>
            </div>
            <div className="container mx-auto px-20">
            <div className="background">
               <div className="background-bg bg-lime-950"></div> 
            <h1>Gardening</h1>
            <p>Here you can find all the information you need to know about gardening.</p>
            <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>

            </div>
            {/* <AmountOfVideosByCategory videos={formatVideos(videos)} />
            <ViewsByCategory videos={videos.map(v => ({
                categoryid: v.categoryid,
                viewCount: v.viewCount
            }))} /> */}
            <WeekDayByViews videos={videos.map(v => ({
                published: v.publishedAt,
                viewCount: v.viewCount
            }))} />
            <ViewsByTagsCount videos={videos.map(v => ({
                tagsCount: v.tags.length,
                viewCount: v.viewCount
            }))} />
            </div>
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