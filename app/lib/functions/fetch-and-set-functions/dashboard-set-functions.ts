import {
  fetchCharacters,
  fetchTracking,
  fetchUser,
} from "@/app/lib/fetches/general-fetches";
import { Character, User } from "@/app/lib/definitions/general-definitions";

export async function dashboardInitialSet(
  parsedUser: User,
  setUser: (user: User) => void,
  setActiveCharacter: (character: Character) => void,
  setIsQueryingDatabase: (isQueryingDatabase: boolean) => void,
) {
  setIsQueryingDatabase(true);
  const fetchedUser = await fetchUser(parsedUser.userId);
  const fetchedCharacters = await fetchCharacters(parsedUser.userId);

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

  const fetchedTracking = await fetchTracking(characters[0].characterId);
  characters[0].tracking = {
    dailies: fetchedTracking.dailies,
    weeklies: fetchedTracking.weeklies,
    bosses: fetchedTracking.bosses,
    progression: fetchedTracking.progression,
  };

  setActiveCharacter(characters[0]);
  setIsQueryingDatabase(false);
}
