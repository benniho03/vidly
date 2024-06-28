import { db } from "~/server/db";
import { AmountOfVideosByCategory } from "./numberVideosByCategory";
import { Video } from "../data-mining/youtube/videos";
import { DiagramDisplay } from "../tremor/diagramDisplay";
import { NumberFact } from "./numberFact";
import ScatterPlot, { InteractiveScatterPlot } from "~/components/scatter-plot";
import { DurationDistribution } from "~/components/duration-distribution";
import ViewsDiagrams from "../tremor/viewsDiagrams";

export default async function Gardening() {

    const rawVideos = await db.videos.findMany({
        take: 100
    });
    const videos = assertVideos(rawVideos);

    return (
        <div>
            <div className="hero">
                <img src="/assets/hero-gardening.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-lime-950"></div>
                    <h1>Gardening</h1>
                    <p>Welcome to our Gardening page. Are you interested in this topic? Do you create content for YouTube? Here you will find all the interesting information on this topic. For example, you can find out when the perfect time is to upload your video to get as many views as possible. Try it out!</p>
                    <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
                    <div className="pictures flex space-x-4">

                        <div className="picture-one">
                            <img src="/assets/gardening-image-1.jpg" />
                        </div>
                        <div className="picture-two">
                            <img src="/assets/gardening-image-2.jpg" />
                        </div>

                    </div>
                </div>
                <div className="keyfacts">
                    <h2>Key facts</h2>
                    <div className="number-facts grid grid-cols-3 gap-4">
                        <div className="number-facts-item"><NumberFact videos={rawVideos} prop={"title length"} /></div>
                        <div className="number-facts-item"><NumberFact videos={rawVideos} prop={"description length"} /></div>
                        <div className="number-facts-item"><NumberFact videos={rawVideos} prop={"duration"} /></div>
                    </div>
                </div>
                <ViewsDiagrams videos={rawVideos} color="green" />
                <InteractiveScatterPlot videos={rawVideos} color="green" />
                <DurationDistribution videos={rawVideos} color="green" />
            </div>
        </div>
    );
}

export function assertVideos(videos: any): Video[] {
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