import { db } from "~/server/db";

export default async function Overview() {

    const videos = await db.videos.findMany();
    const allSearchTerms = videos.map(video => video.query);

    const searchTermsUnique = [...new Set(allSearchTerms)];

    const occurences = searchTermsUnique.map(searchTerm => {
        return {
            searchTerm,
            count: allSearchTerms.filter(term => term === searchTerm).length
        }
    }).sort((a, b) => b.count - a.count);

    return (
        <div>
            <h1>Overview</h1>
            <p>Number of videos: {videos.length}</p>
            {
                occurences.map(occurence => <p key={occurence.searchTerm}>{occurence.searchTerm}: {occurence.count}</p>)
            }
        </div>
    );
}