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

export type CharacterCardEditProps = {
  character: Character;
  setCharacter: (character: Character) => void;
  setEditClicked: (editClicked: boolean) => void;
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
  characters: Character[];
  currentPagePagination: number;
};

export type AddCharactersProps = {
  setCharacters: (characters: Character[]) => void;
};

export type ImageFieldProps = {
  setUploadedFile: (image: File | null) => void;
  displaySuccessMessage?: boolean;
  isPrimaryBackground?: boolean;
  image?: string;
};

export type IgnFieldProps = {
  ign?: string;
  setIgn: (ign: string) => void;
  displaySuccessMessage?: boolean;
  isPrimaryBackground?: boolean;
};

export type LevelFieldProps = {
  level: number;
  setLevel: (level: number) => void;
  displaySuccessMessage?: boolean;
  isPrimaryBackground?: boolean;
};

export type ClassFieldProps = {
  maplestoryClass?: string;
  setMaplestoryClass: (maplestoryClass: string) => void;
  displaySuccessMessage?: boolean;
  isTopCard?: boolean;
  isPrimaryBackground?: boolean;
};

export type PaginationProps = {
  currentPage: Page;
  currentPagePagination: number;
  setCurrentPagePagination: (currentPagePagination: number) => void;
  totalPagesPagination: number;
};

export type DeleteCharactersProps = {
  charactersProp: Character[];
  currentPagePagination: number;
};

export type RearrangeCharactersProps = {
  charactersProp: Character[];
  currentPagePagination: number;
};
