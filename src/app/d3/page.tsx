import { Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { Diagram } from "./diagram";

export default async function D3() {

    const videos = await db.videos.findMany()
    
    return (
        <div>
            <h1>D3</h1>
            
            {/* <Diagram videos={videos} /> */}
            {
                videos.map(video => <p key={video.id}>{video.title}</p>)
            }
        </div>
    );
}
