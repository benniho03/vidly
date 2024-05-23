import { db } from "~/server/db";
import { getVideos } from ".";

const videos = await getVideos({
    searchTerm: "flora",
    maxResults: 1000
})

await db.videos.createMany({
    data: videos.body.videos
})