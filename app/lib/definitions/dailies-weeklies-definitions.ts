import { Character, Daily } from "./general-definitions";

export type PaginationProps = {
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
