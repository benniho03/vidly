import { db } from "~/server/db";
import Papa from "papaparse";
import fs from "fs/promises"


async function generateCSV() {
    const allVideos = await db.videos.findMany();
    const csv = Papa.unparse(allVideos);
    await fs.writeFile("videos.csv", csv);
}

await generateCSV()