import {
  fetchUser,
  fetchCharacters,
  fetchDailies,
  fetchWeeklies,
  fetchBosses,
  fetchTracking,
} from "@/app/lib/fetches/general-fetches";
import { Character, User } from "@/app/lib/definitions/general-definitions";

export async function dashboardInitialSet(
  user: User,
  setUser: (user: User) => void,
  setActiveCharacter: (character: Character) => void,
  setIsQueryingDatabase: (isQueryingDatabase: boolean) => void,
) {
  setIsQueryingDatabase(true);
  const fetchedUser = await fetchUser(user.userId);
  const fetchedCharacters = await fetchCharacters(user.userId);

  const characters: Character[] = [];
  for (const character of fetchedCharacters) {
    const newCharacter: Character = {
      characterId: character.character_id,
      image: character.image,
      ign: character.ign,
      level: character.level,
      maplestoryClass: character.class_name,
      dailies: [],
      weeklies: [],
      bosses: [],
      position: character.position,
      tracking: {
        dailies: true,
        weeklies: true,
        bosses: true,
        progression: true,
      },
    };
    characters.push(newCharacter);
  }

  setUser({
    userId: fetchedUser.user_id,
    username: fetchedUser.username,
    region: fetchedUser.region,
    characters: characters,
  });

  dashboardActiveCharacterSet(
    characters[0],
    setActiveCharacter,
    setIsQueryingDatabase,
  );
}

export async function dashboardActiveCharacterSet(
  character: Character,
  setActiveCharacter: (character: Character) => void,
  setIsQueryingDatabase: (isQueryingDatabase: boolean) => void,
) {
  setIsQueryingDatabase(true);

  const fetchedDailies = await fetchDailies(character.characterId);
  character.dailies = fetchedDailies.map((daily) => {
    return {
      dailyId: daily.daily_id,
      description: daily.description,
      done: daily.done,
      position: daily.position,
    };
  });

  const fetchedWeeklies = await fetchWeeklies(character.characterId);
  character.weeklies = fetchedWeeklies.map((weekly) => {
    return {
      weeklyId: weekly.weekly_id,
      description: weekly.description,
      done: weekly.done,
      position: weekly.position,
      resetDate: weekly.reset_date,
    };
  });

  const fetchedBosses = await fetchBosses(character.characterId);
  character.bosses = fetchedBosses.map((boss) => {
    return {
      bossId: boss.boss_id,
      dashboardPosition: boss.dashboard_position,
      bossesPosition: boss.bosses_position,
      dashboardImage: boss.dashboard_image,
      done: boss.done,
      partySize: boss.party_size,
    };
  });

  const fetchedTracking = await fetchTracking(character.characterId);
  character.tracking = {
    dailies: fetchedTracking.dailies,
    weeklies: fetchedTracking.weeklies,
    bosses: fetchedTracking.bosses,
    progression: fetchedTracking.progression,
  };

  setActiveCharacter(character);
  setIsQueryingDatabase(false);
}
