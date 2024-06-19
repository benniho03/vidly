"use server"

import { db } from "~/server/db"
import ViewsDiagrams from "./viewsDiagrams"

export async function DiagramDisplay(){
    const videos = await db.videos.findMany()
    return <>
    <ViewsDiagrams videos={videos}></ViewsDiagrams>
    </>
}