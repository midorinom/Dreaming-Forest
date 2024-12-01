import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Tracking } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
import { Character } from "../../lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function PATCH(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const character: Character = res.character;

  const newTracking = {
    tracking_id: uuidv4() as UUID,
    character_id: character.characterId,
    dailies: character.tracking.dailies,
    weeklies: character.tracking.weeklies,
    bosses: character.tracking.bosses,
    progression: character.tracking.progression,
  };

  try {
    await db
      .insert(Tracking)
      .values(newTracking)
      .onConflictDoUpdate({
        target: Tracking.character_id,
        set: {
          dailies: character.tracking.dailies,
          weeklies: character.tracking.weeklies,
          bosses: character.tracking.bosses,
          progression: character.tracking.progression,
        },
      });
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error upserting tracking", error);
    throw error;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const characterId: string = res.characterId;

  try {
    const fetchedTracking = await db
      .select()
      .from(Tracking)
      .where(eq(Tracking.character_id, characterId));
    return NextResponse.json(fetchedTracking[0]);
  } catch (error) {
    console.error("Error getting tracking", error);
    throw error;
  }
}
