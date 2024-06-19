export async function getVideoIdsFromSearch({ searchTerm, maxResults, newAPIToken = false }: { searchTerm: string, maxResults: number, newAPIToken?: boolean }) {

    const apiToken = newAPIToken ? process.env.API_KEY_NEW! : process.env.API_KEY!

    return await fetchVideoIds({ searchTerm, maxResults, apiToken })

}

export async function fetchVideoIds({ searchTerm, maxResults, apiToken }: { searchTerm: string, maxResults: number, apiToken: string }) {
    console.log("Fetching video ids")
    const videoIds: string[] = []
    let nextPageToken: string | undefined;

    for (let i = 0; i < Math.ceil(maxResults / 50); i++) {

        const params = new URLSearchParams({
            part: "snippet",
            q: searchTerm,
            key: apiToken,
            maxResults: maxResults.toString(), // 50 is max
            type: "video",
            pageToken: nextPageToken ?? "",
            order: "viewCount",
        })

        const response = await fetch("https://www.googleapis.com/youtube/v3/search?" + params)

        if (!response.ok) {
            console.log(response)
            console.error(response.status, response.statusText, await response.json())
            throw new Error("Failed to fetch videos")
        }

        const data = await response.json()

        nextPageToken = data.nextPageToken

        if (!data.items) throw new Error("No videos found")

        videoIds.push(...data.items.map((item: any) => item.id.videoId) as string[])
    }

    return videoIds
} 