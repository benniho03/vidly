import { db } from "~/server/db"
import { Graph } from "./graph"

export default async function Page() {

  const videos = await db.videos.findMany()

  const categoryIds = [...new Set([...videos.map(video => video.categoryid)])]

  const groupedVideos = categoryIds.map(categoryId => {
    return {
      categoryId: categoryId ?? 0,
      amountOfVideos: videos.filter(video => video.categoryid === categoryId).length
    }
  }).sort((a, b) => b.amountOfVideos - a.amountOfVideos)

  return <div className="w-1/2 mx-auto">
    <Graph data={groupedVideos} />
  </div>
}