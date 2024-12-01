import { UUID } from "crypto";
import {
  User,
  Character,
  Daily,
  Weekly,
  Boss,
} from "@/app/lib/definitions/general-definitions";

export async function sync(
  user: User,
  setIsQueryingDatabase: (isQueryingDatabase: boolean) => void,
) {
  setIsQueryingDatabase(true);

  for (const character of user.characters) {
    await upsertCharacter(character, user);

    for (const daily of character.dailies) {
      await upsertDaily(daily, character.characterId);
    }

    for (const weekly of character.weeklies) {
      await upsertWeekly(weekly, character.characterId);
    }

    for (const boss of character.bosses) {
      await upsertBoss(boss, character.characterId);
    }
  }

  await updateUser(user);

  setIsQueryingDatabase(false);
}

export async function upsertCharacter(character: Character, user: User) {
  await fetch(`/api/characters`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: character, user: user }),
  });

  await fetch(`/api/tracking`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ character: character }),
  });
}

export async function upsertDaily(daily: Daily, characterId: UUID) {
  await fetch(`/api/dailies`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ daily: daily, characterId: characterId }),
  });
}

export async function upsertWeekly(weekly: Weekly, characterId: UUID) {
  await fetch(`/api/weeklies`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weekly: weekly, characterId: characterId }),
  });
}

export async function upsertBoss(boss: Boss, characterId: UUID) {
  await fetch(`/api/bosses`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boss: boss, characterId: characterId }),
  });
}

export async function updateUser(user: User) {
  await fetch(`/api/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  });
}
