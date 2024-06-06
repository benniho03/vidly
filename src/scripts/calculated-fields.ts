import { Video } from "~/app/data-mining/youtube/videos"
import { db } from "~/server/db"

await addCalculatedFields()

export async function addCalculatedFields() {
    const video = await db.videos.findFirst({
        where: {
            description: {
                not: ""
            }
        }
    })
    // let newVideo: VideoWithCalculatedfields = { ...video, titleCharLength: null };
    // newVideo = {...video, titleCharLength: getTitleCharLength(video)}
    const titleCharLength = getTitleCharLength(video)
    const titleWordCount = getTitleWordCount(video)
    const descriptionCharLength = getDescriptionCharLength(video)
    const descriptionWordCount = getDescriptionWordCount(video)
    const publishedAtTime = getPublishedAtTime(video)
    const publishedAtDay = getPublishedAtDay(video)
    const likesPerViewRate = getLikesPerViewRate(video)
    const commentsPerViewRate = getCommentsPerViewRate(video)
    const includesTitleEmoji = getIncludesTitleEmoji(video)
    console.log()
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
    const text = "hallo"
    console.log([...text].some(char => char.charCodeAt(0) > 127))
}
