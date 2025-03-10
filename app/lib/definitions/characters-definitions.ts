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

export type ViewCharacterCardProps = {
  characterProp: Character;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
};

export type CharacterDetailsProps = {
  character: Character;
};

export type CharacterTrackingProps = {
  trackingProp: Tracking;
  character: Character;
  setCharacter: (character: Character) => void;
};

export type ViewCharacterCardEditProps = {
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
  setCharacters: (characters: Character[]) => void;
  currentPagePagination: number;
};

export type AddCharactersProps = {
  setCharacters: (characters: Character[]) => void;
};

export type ImageFieldProps = {
  setUploadedFile: (image: File | null) => void;
  submitClicked?: boolean;
  isPrimaryBackground?: boolean;
  image?: string;
};

export type IgnFieldProps = {
  ign?: string;
  setIgn: (ign: string) => void;
  submitClicked?: boolean;
  isPrimaryBackground?: boolean;
};

export type LevelFieldProps = {
  level: number;
  setLevel: (level: number) => void;
  submitClicked?: boolean;
  isPrimaryBackground?: boolean;
};

export type ClassFieldProps = {
  maplestoryClass?: string;
  setMaplestoryClass: (maplestoryClass: string) => void;
  submitClicked?: boolean;
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
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  currentPagePagination: number;
};

export type DeleteCharacterCardProps = {
  characterProp: Character;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type RearrangeCharactersProps = {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  currentPagePagination: number;
};

export type RearrangeCharacterCardProps = {
  characterProp: Character;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
};
