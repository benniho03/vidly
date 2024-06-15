import { keywords } from "~/keywords";
import { db } from "~/server/db";

await db.searchterms.createMany({
    data: keywords.map(keyword => ({ query: keyword }))
})