import { Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { Diagram } from "./diagram";
import ViewsPerTimeLineChart from "./viewsPerTimeLineChart";

export default async function Tremor() {

    const videos = await db.videos.findMany()

    return (
        <div>
            <h1>D3</h1>

            <ViewsPerTimeLineChart />

            {/* <Diagram videos={videos} /> */}
            {
                videos.map(video => <p key={video.id}>{video.title}</p>)
            }
        </div>
    );
}
