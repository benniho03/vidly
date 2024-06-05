import { keywords } from "~/app/api/cron/route";
import { db } from "~/server/db";

await db.searchterms.createMany({
    data: keywords.map(keyword => ({ query: keyword }))
})