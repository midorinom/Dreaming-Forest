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

export type Data = {
  bossesList: Set<number>;
  subtotals: number[];
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

export type BossesListProps = {
  currentPageBossesList: number[];
  bossesInfo: BossInfo[];
  region: string;
};

export type BossesListCardProps = {
  meso: number;
  image: string;
};

export type BossesPaginationProps = {
  bossesPage: number;
  setBossesPage: (bossesPage: number) => void;
  totalBossesPages: number;
};

export type MesoTotalsProps = {
  data: Data[];
  charactersPage: number;
  totalMeso: number;
};

export type CheckboxesProps = {
  currentPageBossesList: number[];
  currentPageCharacters: Character[];
  setCharacters: (characters: Character[]) => void;
};

export type CheckboxCardProps = {};
