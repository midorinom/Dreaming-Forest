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
  setUser: (user: User) => void,
  setIsQueryingDatabase: (isQueryingDatabase: string) => void,
  setSmallSpiritImage: (smallSpiritImage: string) => void,
) {
  for (const character of user.characters) {
    setIsQueryingDatabase(
      `Please wait, we are currently uploading ${character.ign}'s data to the database.`,
    );

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

  setIsQueryingDatabase(
    "Please wait, we are currently uploading your user data to the database.",
  );

  const newUser = JSON.parse(JSON.stringify(user));
  newUser.versionNumber++;
  await updateUser(newUser);

  setSmallSpiritImage("/welcome/small_spirit_happy.png");
  setIsQueryingDatabase(
    "Sync is all done! We'll redirect you back to the settings page in a few seconds.",
  );

  setTimeout(() => setIsQueryingDatabase(""), 5000);
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
