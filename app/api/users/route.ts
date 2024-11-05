import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Users } from "@/drizzle/schema";
import { User } from "../../lib/definitions/general-definitions";
import bcryptjs from "bcryptjs";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

export async function PUT(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const user: User = res.user;
  const password: string = res.password;
  const hashedPassword = await hashPassword(password);

  const newUser = {
    user_id: user.userId,
    username: user.username,
    pw_hash: hashedPassword,
    region: user.region,
    last_logged_in: new Date().toDateString(),
  };

  try {
    await db.insert(Users).values(newUser).onConflictDoNothing();
  } catch (error) {
    console.error("Error inserting user", error);
    throw error;
  }

  return NextResponse.json({ message: "ok" });

  async function hashPassword(plainPassword: string) {
    const saltRounds = 10; // Defines the complexity of the hashing
    const hashedPassword = await bcryptjs.hash(plainPassword, saltRounds);

    return hashedPassword;
  }
}
