import type { Character, Daily, Weekly } from "./general-definitions";

export type ActiveCharacterProps = {
  activeCharacter: Character;
};

export type DailiesWeekliesProps = {
  region: string;
  activeCharacter: Character;
};

export type BossesProps = {
  region: string;
  activeCharacter: Character;
};

export type DailiesProps = {
  region: string;
  dailies: Daily[];
  weeklies: Weekly[];
  setEditDailiesClicked: (editDailiesClicked: boolean) => void;
};

export type DailiesEditProps = {
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
  setEditDailiesClicked: (editDailiesClicked: boolean) => void;
};

export type DailiesEditCardProps = {
  daily: Daily;
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
};

export type WeekliesProps = {
  dailies: Daily[];
  weeklies: Weekly[];
};
