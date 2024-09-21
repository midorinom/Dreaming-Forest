import type { Character, Tracking } from "./general-definitions";

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

export type Page = "view" | "add" | "rearrange" | "delete";

export type NavBarProps = {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;
};

export type NavBarIconProps = {
  icon: Page;
  setCurrentPage: (currentPage: Page) => void;
  setButtonHovered: (buttonHovered: boolean) => void;
};

export type ViewCharactersProps = {
  charactersProp: Character[];
  setCurrentPage: (currentPage: Page) => void;
};
