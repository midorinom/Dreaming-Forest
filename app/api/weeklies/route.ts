import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Weeklies } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
