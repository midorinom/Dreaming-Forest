import { UUID } from "crypto";
import {
  User,
  Character,
  Daily,
  Weekly,
} from "@/app/lib/definitions/general-definitions";

export async function sync(user: User) {
  for (const character of user.characters) {
    upsertCharacter(character, user);
  }

  await fetch(`/api/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  });
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

export async function upsertWeeekly(weekly: Weekly, characterId: UUID) {
  await fetch(`/api/weekliees`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weekly: weekly, characterId: characterId }),
  });
}
