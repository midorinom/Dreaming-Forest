import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Tracking } from "@/drizzle/schema";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
import { Character } from "../../lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function PUT(request: Request): Promise<NextResponse> {
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
    await db.insert(Tracking).values(newTracking).onConflictDoNothing();
  } catch (error) {
    console.error("Error inserting tracking", error);
    throw error;
  }

  return NextResponse.json({ message: "ok" });
}
