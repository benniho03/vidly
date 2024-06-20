import { revalidatePath } from "next/cache"
import { getVideoIdsFromSearch } from "~/app/data-mining/youtube/search"
import { getVideos } from "~/scripts/videos"
import { db } from "~/server/db"

export default async function ResearchKeywordPage({ params }: { params: { keyword: string } }) {

    const { keyword } = params

    const videos = await db.videos.findMany({
        where: {
            query: keyword
        }
    })

    if (!videos || !videos.length) {
        console.log("Getting new videos")
        await getVideosForKeyword(keyword)
    }

    return <div>
        <h1>Researching {keyword}</h1>
        {
            videos.map(video => <div key={video.id}>
                <h2>{video.title}</h2>
                <img src={video.thumbnail!} />
            </div>)
        }
    </div>
}

async function getVideosForKeyword(keyword: string) {

    const videos = await getVideos({
        maxResults: 100,
        searchTerm: keyword,
        newAPIToken: true
    })

    // TODO: Save videos to research database

    // await db.videos.createMany({
    //     data: videos.body.videos.map(video => ({
    //         ...video,
    //         query: keyword
    //     }))
    // })

    revalidatePath("/research/" + encodeURIComponent(keyword))
}