import { PCA } from "ml-pca"
import { getVideos } from ".";
import { db } from "~/server/db";

const videos = await db.videos.findMany({ take: 50 })

const matrix = videos.map(video => [
    video.viewCount ?? 0, 
    video.likeCount ?? 0, 
    video.commentCount ?? 0
])

const pca = new PCA(matrix)

console.log(pca.getEigenvalues())