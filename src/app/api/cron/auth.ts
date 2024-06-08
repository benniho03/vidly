import { NextRequest } from "next/server";

export function authenticateCronJob(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  return {
    authenticated: authHeader === `Bearer ${process.env.CRON_SECRET}`
  }
}