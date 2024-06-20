import { getVideoIdsFromSearch } from "../app/data-mining/youtube/search"
import { getVideoDetails } from "../app/data-mining/youtube/videos"

export async function getVideos({ searchTerm, maxResults, newAPIToken = false }: { searchTerm: string, maxResults: number, newAPIToken?: boolean }) {

    const start = new Date().getTime()

    const videoIds = await getVideoIdsFromSearch({ searchTerm, maxResults, newAPIToken })

    const videoDetails = await getVideoDetails({ videoIds, searchTerm, newAPIToken })

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
