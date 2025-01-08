import { BossInfo } from "@/app/lib/definitions/general-definitions";
import { Character } from "./general-definitions";

export type BossesProps = {
  bossesInfo: BossInfo[];
};

export type Page = "edit" | "view";

export type NavBarProps = {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;
};

export type BossesViewProps = {
  bossesInfo: BossInfo[];
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  region: string;
};

export type CharactersProps = {
  characters: Character[];
  currentPageCharacters: Character[];
  charactersPage: number;
  setCharactersPage: (charactersPage: number) => void;
};

export type CharacterCardProps = {
  character: Character;
};
