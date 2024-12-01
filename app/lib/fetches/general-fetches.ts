import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, or, asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { Classes } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";
import { UUID } from "crypto";
import {
  FetchClassesResponse,
  FetchUserResponse,
  FetchCharactersResponse,
  FetchDailiesResponse,
  FetchWeekliesResponse,
  FetchBossesResponse,
  FetchTrackingResponse,
} from "@/app/lib/definitions/fetches/general-fetches-definitions";
import {
  Boss,
  Character,
  Daily,
  Tracking,
  User,
  Weekly,
} from "@/app/lib/definitions/general-definitions";

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

export async function fetchAllUserDetails(userId: UUID): Promise<User> {
  const fetchedUser = await fetchUser(userId);
  const fetchedCharacters = await fetchCharacters(userId);

  const characters: Character[] = [];
  for (const fetchedCharacter of fetchedCharacters) {
    const dailies: Daily[] = [];
    const weeklies: Weekly[] = [];
    const bosses: Boss[] = [];

    const fetchedDailies = await fetchDailies(fetchedCharacter.character_id);
    const fetchedWeeklies = await fetchWeeklies(fetchedCharacter.character_id);
    const fetchedBosses = await fetchBosses(fetchedCharacter.character_id);
    const fetchedTracking = await fetchTracking(fetchedCharacter.character_id);

    for (const fetchedDaily of fetchedDailies) {
      const daily: Daily = {
        dailyId: fetchedDaily.daily_id,
        description: fetchedDaily.description,
        done: fetchedDaily.done,
        position: fetchedDaily.position,
      };

      dailies.push(daily);
    }

    for (const fetchedWeekly of fetchedWeeklies) {
      const weekly: Weekly = {
        weeklyId: fetchedWeekly.weekly_id,
        description: fetchedWeekly.description,
        done: fetchedWeekly.done,
        position: fetchedWeekly.position,
        resetDate: fetchedWeekly.reset_date,
      };

      weeklies.push(weekly);
    }

    for (const fetchedBoss of fetchedBosses) {
      const boss: Boss = {
        bossId: fetchedBoss.boss_id,
        dashboardPosition: fetchedBoss.dashboard_position,
        bossesPosition: fetchedBoss.bosses_position,
        dashboardImage: fetchedBoss.dashboard_image,
        done: fetchedBoss.done,
        partySize: fetchedBoss.party_size,
      };

      bosses.push(boss);
    }

    const newCharacter: Character = {
      characterId: fetchedCharacter.character_id,
      image: fetchedCharacter.image,
      ign: fetchedCharacter.ign,
      level: fetchedCharacter.level,
      maplestoryClass: fetchedCharacter.class_name,
      dailies: dailies,
      weeklies: weeklies,
      bosses: bosses,
      position: fetchedCharacter.position,
      tracking: {
        dailies: fetchedTracking.dailies,
        weeklies: fetchedTracking.weeklies,
        bosses: fetchedTracking.bosses,
        progression: fetchedTracking.progression,
      },
    };

    characters.push(newCharacter);
  }

  const user: User = {
    userId: userId,
    username: fetchedUser.user_id,
    region: fetchedUser.region,
    versionNumber: fetchedUser.version_number,
    characters: characters,
  };

  return user;
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
