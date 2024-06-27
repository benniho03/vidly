"use server"

import { db } from "~/server/db"
import ViewsDiagrams from "./viewsDiagrams"

export async function DiagramDisplay(videos: any) {
    return <>
        <ViewsDiagrams videos={videos}></ViewsDiagrams>
    </>
}