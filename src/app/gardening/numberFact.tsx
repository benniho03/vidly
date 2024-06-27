import { Video } from "../data-mining/youtube/videos";

export function NumberFact({ videos, prop }: { videos: any[], prop: String, }) {
    let sum = 0;

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
        }

    }

    let average = sum / videos.length;

    return (
        <>
            <p className="content">{average}</p >
            <p className="content-title">⌀ {prop}</p>
            
           
        </>
    )
}
import { Video } from "../data-mining/youtube/videos";

export function NumberFact({ videos, prop }: { videos: any[], prop: String, }) {
    let sum = 0;

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
        }

    }

    let average = sum / videos.length;

    return (
        <>
            <p>{average}</p >
            <p>⌀ {prop}</p>
        </>
    )
}