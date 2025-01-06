import { Character, Daily, Weekly } from "./general-definitions";

export type PaginationProps = {
  id: "dailies" | "weeklies";
  currentPagePagination: number;
  setCurrentPagePagination: (currentPagePagination: number) => void;
  totalPagesPagination: number;
};

export type DailiesProps = {
  charactersProp: Character[];
};

export type DailiesCardProps = {
  character: Character;
  dailies: Daily[];
  filter: string;
};

export type WeekliesProps = {
  charactersProp: Character[];
};

export type WeekliesCardProps = {
  character: Character;
  weeklies: Weekly[];
  filter: string;
};

export type FilterProps = {
  uniqueDescriptions: string[];
  setFilter: (filter: string) => void;
};
