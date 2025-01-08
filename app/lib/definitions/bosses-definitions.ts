export type Page = "edit" | "view";

export type NavBarProps = {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;
};
