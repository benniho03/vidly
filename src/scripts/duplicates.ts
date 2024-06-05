import { db } from "~/server/db";

const videoIds = await db.videos.findMany({
    select: {
        videoId: true
    }
})
const videoIdsUnique = [...new Set(videoIds.map(video => video.videoId))]

console.log(videoIdsUnique)
console.log(videoIdsUnique.length)