import { NextRequest } from "next/server";

export function authenticateCronJob(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return {
        authenticated: false
      }
    }
    return {
      authenticated: true
    }
}