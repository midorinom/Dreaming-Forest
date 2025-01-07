import { Character, Daily, Weekly } from "./general-definitions";

export type PaginationProps = {
  id: "dailies" | "weeklies";
  currentPagePagination: number;
  setCurrentPagePagination: (currentPagePagination: number) => void;
  totalPagesPagination: number;
};

export type DailiesProps = {
  dailiesCharacters: Character[];
  setDailiesCharacters: (dailiesCharacters: Character[]) => void;
  region: string;
};

export type DailiesCardProps = {
  character: Character;
  dailies: Daily[];
  filter: string;
  dailiesCharacters: Character[];
  setDailiesCharacters: (dailiesCharacters: Character[]) => void;
  region: string;
};

export type WeekliesProps = {
  weekliesCharacters: Character[];
  setWeekliesCharacters: (weekliesCharacters: Character[]) => void;
  region: string;
};

export type WeekliesCardProps = {
  character: Character;
  weeklies: Weekly[];
  filter: string;
  weekliesCharacters: Character[];
  setWeekliesCharacters: (weekliesCharacters: Character[]) => void;
  region: string;
};

export type FilterProps = {
  uniqueDescriptions: string[];
  setFilter: (filter: string) => void;
};
