import type { Character, Tracking } from "./general-definitions";

export type ViewCharactersProps = {
  charactersProp: Character[];
};

export type CharacterCardProps = {
  characterProp: Character;
};

export type CharacterDetailsProps = {
  character: Character;
};

export type CharacterTrackingProps = {
  trackingProp: Tracking;
  character: Character;
  setCharacter: (character: Character) => void;
};

export type Page =
  | "view"
  | "add"
  | "rearrange"
  | "delete";