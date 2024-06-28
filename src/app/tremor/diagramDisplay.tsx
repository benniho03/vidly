"use server"

import { db } from "~/server/db"
import ViewsDiagrams from "./viewsDiagrams"
import { Video } from "../data-mining/youtube/videos"

export async function DiagramDisplay({ videos }: { videos: Video[] }) {
    return <>
        <ViewsDiagrams videos={videos} color={"sky"}></ViewsDiagrams>
    </>
}