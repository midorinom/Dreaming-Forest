import { BossInfo } from "@/app/lib/definitions/general-definitions";

export type BossesProps = {
  bossesInfo: BossInfo[];
};

export type Page = "edit" | "view";

export type NavBarProps = {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;
};
