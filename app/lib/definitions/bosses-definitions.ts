import { Boss, BossInfo } from "@/app/lib/definitions/general-definitions";
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
  currentPageBossesList: number[];
  setCharacters: (characters: Character[]) => void;
  region: string;
  data: Data[];
  setData: (data: Data[]) => void;
  bossesInfo: BossInfo[];
  totalMeso: number;
  setTotalMeso: (meso: number) => void;
};

export type CharacterCardProps = {
  character: Character;
  currentPageBossesList: number[];
  setCharacters: (characters: Character[]) => void;
  region: string;
  data: Data[];
  setData: (data: Data[]) => void;
  bossesInfo: BossInfo[];
  totalMeso: number;
  setTotalMeso: (meso: number) => void;
  charactersPage: number;
  characterColumn: number;
};

export type BossesListProps = {
  currentPageBossesList: number[];
  bossesInfo: BossInfo[];
  region: string;
  data: Data[];
  currentPageCharacters: Character[];
  charactersPage: number;
  totalMeso: number;
  setCharacters: (characters: Character[]) => void;
  setData: (data: Data[]) => void;
  setTotalMeso: (meso: number) => void;
  rowHovered: number;
};

export type BossesListCardProps = {
  meso: number;
  image: string;
  data: Data[];
  currentPageCharacters: Character[];
  charactersPage: number;
  totalMeso: number;
  bossPosition: number;
  setCharacters: (characters: Character[]) => void;
  region: string;
  setData: (data: Data[]) => void;
  bossesInfo: BossInfo[];
  setTotalMeso: (meso: number) => void;
  row: number;
  rowHovered: number;
};

export type BossesPaginationProps = {
  bossesPage: number;
  setBossesPage: (bossesPage: number) => void;
  totalBossesPages: number;
};

export type MesoTotalsProps = {
  data: Data[];
  currentPageCharacters: Character[];
  charactersPage: number;
  totalMeso: number;
  bossesList: number[];
  setCharacters: (characters: Character[]) => void;
  region: string;
  setData: (data: Data[]) => void;
  bossesInfo: BossInfo[];
  setTotalMeso: (meso: number) => void;
};

export type CheckboxesProps = {
  currentPageBossesList: number[];
  currentPageCharacters: Character[];
  setCharacters: (characters: Character[]) => void;
  region: string;
  data: Data[];
  setData: (data: Data[]) => void;
  charactersPage: number;
  bossesInfo: BossInfo[];
  totalMeso: number;
  setTotalMeso: (meso: number) => void;
  setRowHovered: (rowHovered: number) => void;
};

export type CheckboxCardProps = {
  boss: Boss | undefined;
  characterPosition: number;
  region: string;
  setCharacters: (characters: Character[]) => void;
  data: Data[];
  setData: (data: Data[]) => void;
  charactersPage: number;
  row: number;
  column: number;
  bossesInfo: BossInfo[];
  totalMeso: number;
  setTotalMeso: (meso: number) => void;
  setRowHovered: (rowHovered: number) => void;
};

export type BossesEditProps = {
  bossesInfo: BossInfo[];
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
};

export type ActiveCharacterProps = {
  activeCharacter: Character;
};

export type EditorProps = {
  activeCharacter: Character;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  bossesInfo: BossInfo[];
};

export type EditorCardProps = {
  boss: Boss;
  bossesInfo: BossInfo[];
  activeCharacter: Character;
  setCharacters: (characters: Character[]) => void;
};
