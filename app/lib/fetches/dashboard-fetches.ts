import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, min, and, asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { BossesInfo } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";
import { FetchDashboardBossesInfoResponse } from "@/app/lib/definitions/fetches/dashboard-fetches-definitions";

export async function fetchDashboardBossesInfo(): Promise<FetchDashboardBossesInfoResponse> {
  const db = drizzle(sql);
  noStore();

  try {
    const minMesoSubquery = db
      .select({
        dashboard_position: BossesInfo.dashboard_position,
        min_meso: min(BossesInfo.gms_meso).as("min_meso"),
      })
      .from(BossesInfo)
      .groupBy(BossesInfo.dashboard_position)
      .as("minMesoSubquery");

    const result = await db
      .select()
      .from(BossesInfo)
      .innerJoin(
        minMesoSubquery,
        and(
          eq(BossesInfo.dashboard_position, minMesoSubquery.dashboard_position),
          eq(BossesInfo.gms_meso, minMesoSubquery.min_meso),
        ),
      )
      .orderBy(asc(BossesInfo.dashboard_position));

    // Flatten the result
    const fetchedBossesInfo = result.map((row) => {
      return {
        ...row.bosses_info,
      };
    });

    return fetchedBossesInfo;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch dashboard bosses info.");
  }
}
