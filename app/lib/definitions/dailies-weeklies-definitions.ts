import { Character } from "./general-definitions";

export type PaginationProps = {
  currentPagePagination: number;
  setCurrentPagePagination: (currentPagePagination: number) => void;
  totalPagesPagination: number;
};

export type DailiesProps = {
  characters: Character[];
};

export type DailiesCardProps = {
  character: Character;
};

export type WeekliesProps = {
  characters: Character[];
};
