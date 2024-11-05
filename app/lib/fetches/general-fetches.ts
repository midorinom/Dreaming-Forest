import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, or, asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { Classes } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";
import { UUID } from "crypto";
import { Character, User } from "../definitions/general-definitions";

export async function fetchClasses(region: string) {
  const db = drizzle(sql);
  noStore();

  try {
    const fetchedClasses = await db
      .select()
      .from(Classes)
      .where(or(eq(Classes.region, region), eq(Classes.region, "Both")))
      .orderBy(asc(Classes.class_name));

    return fetchedClasses;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all classes.");
  }
}

export async function insertNewCharacter(character: Character, user: User) {
  await fetch(`/api/characters`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: character, user: user }),
  });

  await fetch(`/api/tracking`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: character }),
  });
}

export async function fetchUser(userId: UUID) {
  const response = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });

  const res = await response.json();
  return res;
}
