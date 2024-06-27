import { Video } from "~/app/data-mining/youtube/videos"
import { db } from "~/server/db"

// await addCalculatedFields() // Uncomment this line to run the script
// Imports from this file run the script, why tf???

export async function addCalculatedFields() {
    const videos = await db.videos.findMany()
    for (const video of videos) {
        await db.videos.update({
            where: {
                id: video.id
            },
            data: {
                titlecharlength: getTitleCharLength(video),
                titlewordcount: getTitleWordCount(video),
                descriptioncharlength: getDescriptionCharLength(video),
                descriptionwordcount: getDescriptionWordCount(video),
                publishedattime: getPublishedAtTime(video),
                publishedatday: getPublishedAtDay(video),
                likesperviewrate: getLikesPerViewRate(video),
                commentsperviewrate: getCommentsPerViewRate(video),
                includestitleemoji: getIncludesTitleEmoji(video).toString()
            }
        })
        console.log(getTitleCharLength(video))
    }
    console.log("finished")
    // let newVideo: VideoWithCalculatedfields = { ...video, titleCharLength: null };
    // newVideo = {...video, titleCharLength: getTitleCharLength(video)}

}

export function getCalculatedFields(video: Video) {
    return ({
        ...video,
        titlecharlength: getTitleCharLength(video),
        titlewordcount: getTitleWordCount(video),
        descriptioncharlength: getDescriptionCharLength(video),
        descriptionwordcount: getDescriptionWordCount(video),
        publishedattime: getPublishedAtTime(video),
        publishedatday: getPublishedAtDay(video),
        likesperviewrate: getLikesPerViewRate(video),
        commentsperviewrate: getCommentsPerViewRate(video),
        includestitleemoji: getIncludesTitleEmoji(video).toString()
    })
}

function getTitleCharLength(video: Video) {
    if (!video.title) {
        return null
    }
    return video.title.length
}

function getTitleWordCount(video: Video) {
    if (!video.title) {
        return null
    }
    return video.title.split(" ").length
}

function getDescriptionCharLength(video: Video) {
    if (!video.description) {
        return null
    }
    return video.description.length
}

function getDescriptionWordCount(video: Video) {
    if (!video.description) {
        return null
    }
    return video.description.split(" ").length
}

function getPublishedAtTime(video: Video) {
    const publishedAt = new Date(video.publishedAt)
    return publishedAt.toTimeString()
}

function getPublishedAtDay(video: Video) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const publishedAt = new Date(video.publishedAt)
    return weekday[publishedAt.getDay()];
}

function getLikesPerViewRate(video: Video) {
    return video.likeCount / video.viewCount
}

function getCommentsPerViewRate(video: Video) {
    return video.commentCount / video.viewCount
}

function getIncludesTitleEmoji(video: Video) {
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?)/gu;
    return emojiRegex.test(video.title)
}
