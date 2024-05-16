import { db } from "~/server/db";

export default async function Overview() {

    const videos = await db.videos.findMany();    
    const allSearchTerms = videos.map(video => video.query);

    const searchTermsUnique = [...new Set(allSearchTerms)];
    
    return (
        <div>
            <h1>Overview</h1>
            {
                searchTermsUnique.map(searchTerm => <p>{searchTerm}</p>)
            }
            {
                videos.length
            }
        </div>
    );
}