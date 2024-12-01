import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Weeklies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Weekly } from "@/app/lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const characterId: string = res.characterId;

  try {
    const fetchedWeeklies = await db
      .select()
      .from(Weeklies)
      .where(eq(Weeklies.character_id, characterId));
    return NextResponse.json(fetchedWeeklies);
  } catch (error) {
    console.error("Error getting weeklies", error);
    throw error;
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const weekly: Weekly = res.weekly;
  const characterId: string = res.characterId;

  const newWeekly = {
    weekly_id: weekly.weeklyId,
    character_id: characterId,
    description: weekly.description,
    done: weekly.done ? new Date(weekly.done).toDateString() : null,
    reset_date: new Date(weekly.resetDate).toDateString(),
    position: weekly.position,
  };

  try {
    await db
      .insert(Weeklies)
      .values(newWeekly)
      .onConflictDoUpdate({
        target: Weeklies.weekly_id,
        set: {
          description: weekly.description,
          done: weekly.done ? new Date(weekly.done).toDateString() : null,
          reset_date: new Date(weekly.resetDate).toDateString(),
          position: weekly.position,
        },
      });
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error upserting weeklies", error);
    throw error;
  }
}
