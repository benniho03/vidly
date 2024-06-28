import { Video } from "../data-mining/youtube/videos";

type AverageOptions = "likeCount" | "commentCount" | "duration" | "viewCount" | "titlecharlength" | "descriptioncharlength";

export function AverageNumberDisplay({ videos, property }: { videos: Video[], property: AverageOptions }) {
    const average = videos.reduce((acc, video) => {
        if (!video[property]) {
            return acc
        }
        console.log(video[property]!)
        return acc + Number(video[property]!) ?? 0;
    }, 0) / videos.length;

    return (
        <>
            <p className="content">{average.toFixed(0)}</p >
            <p className="content-title">⌀ {getPropertyDisplay(property)}</p>
        </>
    )
}

function getPropertyDisplay(property: AverageOptions) {

    switch (property) {
        case "likeCount":
            return "Likes";
        case "commentCount":
            return "Comments";
        case "duration":
            return "Duration";
        case "viewCount":
            return "Views";
        case "titlecharlength":
            return "Title Length";
        case "descriptioncharlength":
            return "Description Length";
    }
}

export function NumberFact({ videos, prop }: { videos: any[], prop: String, }) {
    let sum = 0;
    let average;
    let isVideoCount = false;

    for (let i = 0; i < videos.length; i++) {
        switch (prop) {
            case "title length":
                if (videos[i].titlecharlength !== null) {
                    sum += parseInt(videos[i].titlecharlength, 10);
                }
                break;
            case "description length":
                if (videos[i].descriptioncharlength !== null) {
                    sum += parseInt(videos[i].descriptioncharlength, 10);
                }
                break;
            case "duration":
                if (videos[i].duration !== null) {
                    sum += parseInt(videos[i].duration, 10);
                }
                break;
            case "video count":
                if (videos[i] !== null) {
                    sum = videos.length
                    isVideoCount = true;
                }
                break;
            case "views":
                if (videos[i].viewCount !== null) {
                    sum += parseInt(videos[i].viewCount, 10);
                }
                break;
            case "likes":
                if (videos[i].likeCount !== null) {
                    sum += parseInt(videos[i].likeCount, 10);
                }
                break;
        }

    }
    if (isVideoCount) {
        average = sum;
    } else {
        average = sum / videos.length;
    }


    return (
        <>
            <p className="content">{average}</p >
            <p className="content-title">⌀ {prop}</p>
        </>
    )
}