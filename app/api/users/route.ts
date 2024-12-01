import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
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
    username: user.username.toLowerCase(),
    pw_hash: hashedPassword,
    region: user.region,
    last_logged_in: new Date().toDateString(),
    version_number: user.versionNumber,
  };

  try {
    await db.insert(Users).values(newUser).onConflictDoNothing();
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error inserting user", error);
    throw error;
  }

  async function hashPassword(plainPassword: string) {
    const saltRounds = 10; // Defines the complexity of the hashing
    const hashedPassword = await bcryptjs.hash(plainPassword, saltRounds);

    return hashedPassword;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const userId: string = res.userId;

  try {
    const fetchedUser = await db
      .select()
      .from(Users)
      .where(eq(Users.user_id, userId));
    return NextResponse.json(fetchedUser[0]);
  } catch (error) {
    console.error("Error getting user", error);
    throw error;
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const res = await request.json();
  const user: User = res.user;

  try {
    await db
      .update(Users)
      .set({
        region: user.region,
        last_logged_in: new Date().toDateString(),
        version_number: user.versionNumber,
      })
      .where(eq(Users.user_id, user.userId));
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}
