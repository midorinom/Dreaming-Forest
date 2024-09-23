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

export type AddCharactersProps = {
  setCharacters: (characters: Character[]) => void;
};

export type ImageFieldProps = {
  setUploadedFile: (image: File | null) => void;
};

export type IgnFieldProps = {
  setIgn: (ign: string) => void;
};

export type LevelFieldProps = {
  level: number;
  setLevel: (level: number) => void;
  displaySuccessMessage: boolean;
};

export type ClassFieldProps = {
  setMaplestoryClass: (maplestoryClass: string) => void;
};
