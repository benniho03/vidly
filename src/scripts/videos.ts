import { getVideoIdsFromSearch } from "../app/data-mining/youtube/search"
import { getVideoDetails } from "../app/data-mining/youtube/videos"

export async function getVideos({searchTerm, maxResults}: {searchTerm: string, maxResults: number}) {

    const start = new Date().getTime()

    const videoIds = await getVideoIdsFromSearch({ searchTerm, maxResults })

    const videoDetails = await getVideoDetails({videoIds, searchTerm})

    const end = new Date().getTime()
    const timeTaken = (end - start) / 1000

    return {
        head: {
            timeTaken,
        }, 
        body: {
            videos: videoDetails,
        }
    }

}


await getVideos({
    searchTerm: "minecraft",
    maxResults: 3,
})
