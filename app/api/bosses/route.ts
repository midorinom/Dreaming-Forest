import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Bosses } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Boss } from "@/app/lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const characterId: string = res.characterId;

  try {
    const fetchedBosses = await db
      .select()
      .from(Bosses)
      .where(eq(Bosses.character_id, characterId));
    return NextResponse.json(fetchedBosses);
  } catch (error) {
    console.error("Error getting bosses", error);
    throw error;
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const boss: Boss = res.boss;
  const characterId: string = res.characterId;

  const newBoss = {
    boss_id: boss.bossId,
    character_id: characterId,
    dashboard_position: boss.dashboardPosition,
    bosses_position: boss.bossesPosition,
    dashboard_image: boss.dashboardImage,
    done: boss.done ? new Date(boss.done).toDateString() : null,
    party_size: boss.partySize,
  };

  try {
    await db
      .insert(Bosses)
      .values(newBoss)
      .onConflictDoUpdate({
        target: Bosses.boss_id,
        set: {
          dashboard_position: boss.dashboardPosition,
          bosses_position: boss.bossesPosition,
          dashboard_image: boss.dashboardImage,
          done: boss.done ? new Date(boss.done).toDateString() : null,
          party_size: boss.partySize,
        },
      });
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error upserting bosses", error);
    throw error;
  }
}
