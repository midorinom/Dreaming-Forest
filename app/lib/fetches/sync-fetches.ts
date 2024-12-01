import { UUID } from "crypto";
import {
  User,
  Character,
  Daily,
} from "@/app/lib/definitions/general-definitions";

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

export async function upsertDaily(daily: Daily, characterId: UUID) {
  await fetch(`/api/dailies`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ daily: daily, characterId: characterId }),
  });
}
