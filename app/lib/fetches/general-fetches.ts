import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, or, asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { Classes } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";
import { UUID } from "crypto";
import {
  User,
  Character,
  Daily,
} from "@/app/lib/definitions/general-definitions";
import {
  FetchClassesResponse,
  FetchUserResponse,
  FetchCharactersResponse,
  FetchDailiesResponse,
  FetchWeekliesResponse,
  FetchBossesResponse,
  FetchTrackingResponse,
} from "@/app/lib/definitions/fetches/general-fetches-definitions";

export async function fetchClasses(
  region: string,
): Promise<FetchClassesResponse> {
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

export async function fetchUser(userId: UUID): Promise<FetchUserResponse> {
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

export async function fetchCharacters(
  userId: UUID,
): Promise<FetchCharactersResponse> {
  const response = await fetch(`/api/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });

  const res = await response.json();
  return res;
}

export async function fetchDailies(
  characterId: UUID,
): Promise<FetchDailiesResponse> {
  const response = await fetch(`/api/dailies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId: characterId }),
  });

  const res = await response.json();
  return res;
}

export async function fetchWeeklies(
  characterId: UUID,
): Promise<FetchWeekliesResponse> {
  const response = await fetch(`/api/weeklies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId: characterId }),
  });

  const res = await response.json();
  return res;
}

export async function fetchBosses(
  characterId: UUID,
): Promise<FetchBossesResponse> {
  const response = await fetch(`/api/bosses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId: characterId }),
  });

  const res = await response.json();
  return res;
}

export async function fetchTracking(
  characterId: UUID,
): Promise<FetchTrackingResponse> {
  const response = await fetch(`/api/tracking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId: characterId }),
  });

  const res = await response.json();
  return res;
}

export async function upsertDaily(daily: Daily, characterId: UUID) {
  const response = await fetch(`/api/dailies`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ daily: daily, characterId: characterId }),
  });

  const res = await response.json();
  return res;
}
