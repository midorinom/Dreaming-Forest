import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const username: string = res.username.toLowerCase();

  try {
    const fetchedUser = await db
      .select()
      .from(Users)
      .where(eq(Users.username, username));

    if (fetchedUser[0]) {
      return NextResponse.json(fetchedUser[0].user_id);
    } else {
      return NextResponse.json("");
    }
  } catch (error) {
    console.error("Error getting user", error);
    throw error;
  }
}
