import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Dailies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Daily } from "@/app/lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const characterId: string = res.characterId;

  try {
    const fetchedDailies = await db
      .select()
      .from(Dailies)
      .where(eq(Dailies.character_id, characterId));
    return NextResponse.json(fetchedDailies);
  } catch (error) {
    console.error("Error getting dailies", error);
    throw error;
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const daily: Daily = res.daily;
  const characterId: string = res.characterId;

  const newDaily = {
    daily_id: daily.dailyId,
    character_id: characterId,
    description: daily.description,
    done: daily.done ? new Date(daily.done).toDateString() : null,
    position: daily.position,
  };

  try {
    await db
      .insert(Dailies)
      .values(newDaily)
      .onConflictDoUpdate({
        target: Dailies.daily_id,
        set: {
          description: newDaily.description,
          done: newDaily.done,
          position: newDaily.position,
        },
      });
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error upserting dailies", error);
    throw error;
  }
}
