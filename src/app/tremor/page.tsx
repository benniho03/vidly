
import { db } from "~/server/db";
import { DiagramDisplay } from "./diagramDisplay";


export default async function Tremor() {

    const videos = await db.videos.findMany({
        take: 5000
    })

    return (
        <div>
            <DiagramDisplay videos={videos} />
        </div>
    );
}
