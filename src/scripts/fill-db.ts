import { db } from "~/server/db";
import { getVideos } from "./videos";

const videos = await getVideos({
    searchTerm: "flora",
    maxResults: 1000
})

await db.videos.createMany({
    data: videos.body.videos
})