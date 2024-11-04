import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Characters } from "@/drizzle/schema";
import { Character, User } from "../../lib/definitions/general-definitions";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function PUT(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const character: Character = res.character;
  const user: User = res.user;

  const newCharacter = {
    character_id: character.characterId,
    user_id: user.userId,
    ign: character.ign,
    level: character.level,
    class_name: character.maplestoryClass,
    image: character.image,
    position: character.position,
  };

  try {
    await db.insert(Characters).values(newCharacter).onConflictDoNothing();
  } catch (error) {
    console.error("Error inserting character", error);
    throw error;
  }

  return NextResponse.json({ message: "ok" });
}
