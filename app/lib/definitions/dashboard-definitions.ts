import type { Boss, Character, Daily, Weekly } from "./general-definitions";

export type ActiveCharacterProps = {
  character: Character;
};

export type DailiesWeekliesProps = {
  region: string;
  characters: Character[];
};

export type BossesProps = {
  region: string;
  characters: Character[];
};
