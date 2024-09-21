import type { Character, Classes, Tracking } from "./general-definitions";

export type CharactersContextType = {
  classes: {
    gms: string[];
    msea: string[];
  };
  region: string;
};

export type CharactersProps = {
  classes: Classes;
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
};
