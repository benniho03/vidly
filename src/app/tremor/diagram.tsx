import { Prisma } from "@prisma/client"
import * as d3 from "d3"

type Video = {
    id: string;
    videoId?: string;
    title?: string;
    thumbnail?: string;
    description?: string;
    channel?: string;
    likeCount?: number;
    commentCount?: number;
    viewCount?: number;
    duration?: number;
    publishedAt?: Date;
    caption?: string;
    tags?: string[];
    topicCategories?: string[];
    language?: string;
    query?: string;
}


export function Diagram({ videos }: { videos: Video[] }) {
    const data = videos.map(video => video.viewCount)

    const pie = d3.pie()

    return <div>
    </div>
}