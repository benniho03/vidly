import { db } from "~/server/db";
import { Video } from "../data-mining/youtube/videos";
import { AverageNumberDisplay, NumberFact } from "./numberFact";
import { InteractiveScatterPlot } from "~/components/scatter-plot";
import { DurationDistribution } from "~/components/duration-distribution";
import ViewsDiagrams from "../tremor/viewsDiagrams";
import { MultipleTags } from "./multipleTags";
import { formatNumber } from "~/lib/utils";

export default async function Gardening() {

    const AMONT_OF_VIDEOS_FOR_DIAGRAMS = 1500

    const videosForDiagram = await db.videos.findMany({
        take: AMONT_OF_VIDEOS_FOR_DIAGRAMS
    })

    const rawVideos = await db.videos.findMany({
        take: 100
    });
  
    const videos = assertVideos(rawVideos);
    const videosForTagChart = videos.map(v => ({
        'videoId': v.videoId,
        'tags': v.tags,
        'clicks': v.viewCount
    }))

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
                    <h2>Key Statistics</h2>
                    <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="viewCount" /></div>
                        <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="likeCount" /></div>
                        <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="commentCount" /></div>
                    </div>
                    <div className="number-facts grid grid-cols-3 gap-4 mt-4">
                        <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="duration" /></div>
                        <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="titlecharlength" /></div>
                        <div className="number-facts-item"><AverageNumberDisplay videos={rawVideos} property="descriptioncharlength" /></div>
                    </div>
                </div>
                <ViewsDiagrams videos={rawVideos} color="green" />
                <h2>TOP 10 TAGS</h2>
                <p>Find out which tags are used for most of the gardening videos. Use ist as inspiration to reach a bigger crowd.</p>
                <MultipleTags videoTags={videosForTagChart} color="green" />
                <h2 className="mt-8">INTERACTIVE SCATTER PLOT</h2>
                <p className="mb-4">Use our scatter plot to finde correlations between the view count, the like count, the comment count and duration. Optimize the lenght of your videos to achieve your main goal! </p>
                <InteractiveScatterPlot videos={rawVideos} color="green" />
                <h2>DURATION OF GARDENING VIDEOS</h2>
                <p>Take a closer look at the duration of other gardening videos. Which is the current trend? Use it to optimize the length of your videos even further.</p>
                <DurationDistribution videos={rawVideos} color="green" />
                <div className="mt-8 mb-8">
                    <h2>Top 10  gardening videos</h2>
                    <p>Here you can see a list of the current most popular gardening videos. Find out what the have in common and make use of it.</p>
                    <div className="video-list grid grid-cols-2 gap-x-4 gap-y-8">
                        <Top10Videos />
                    </div>
                </div>
            </div>
        </div>
    );
}

async function Top10Videos() {
    const top10Videos = await db.videos.findMany({
        orderBy: {
            viewCount: "desc",
        },
        take: 10,
        skip: 1,
        distinct: "videoId",
        where: {
            NOT: {
                categoryid: 10,
            },
            title: {
                contains: "garden"
            }
        }
    })
    const channelIds = top10Videos.filter((video) => {
        return !!video.channel
    }).map((video) => {
        return video.channel
    }) as string[]

    const top10Channels = await db.channels.findMany({
        take: 10,
        where: {
            OR: [
                { id: { contains: channelIds[0] } },
                { id: { contains: channelIds[1] } },
                { id: { contains: channelIds[2] } },
                { id: { contains: channelIds[3] } },
                { id: { contains: channelIds[4] } },
                { id: { contains: channelIds[5] } },
                { id: { contains: channelIds[6] } },
                { id: { contains: channelIds[7] } },
                { id: { contains: channelIds[8] } },
                { id: { contains: channelIds[9] } },
            ]
        }
    })

    return (
        top10Videos.map((video, index) => {
            return <>
                <div className="video-list-item grid grid-cols-2 gap-4 items-center">
                    <div className="video-list-item-image">
                        <img src={video.thumbnail!} width="100%" />
                    </div>
                    <div className="video-list-item-content">
                        <p className="video-title">{index + 1}.</p>
                        <p className="video-title">{video.title}</p>
                        <p className="video-viewcount">View count: {formatNumber(video.viewCount!) ?? "N/A"}</p>
                        <p className="video-channel">Channel: {top10Channels[index]!.title}</p
                    </div>
                </div>

            </>
        })
    )

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