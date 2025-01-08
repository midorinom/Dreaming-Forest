import { drizzle } from "drizzle-orm/vercel-postgres";
import { asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { BossesInfo } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";
import { FetchBossesInfoResponse } from "@/app/lib/definitions/fetches/bosses-fetches-definitions";

export async function fetchBossesInfo(): Promise<FetchBossesInfoResponse> {
  const db = drizzle(sql);
  noStore();

  try {
    const fetchedBossesInfo = await db
      .select()
      .from(BossesInfo)
      .orderBy(asc(BossesInfo.bosses_position));

    return fetchedBossesInfo;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all bosses info.");
  }
}
