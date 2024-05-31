import { Video } from "../youtube/videos";

const musicVideoKeywords = [
    ""
]

function killMusicVideos({ videos }: { videos: Video[] }) {
    return videos.filter(video => {
        const { title } = video
        
    })
}