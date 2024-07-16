import { UUID } from "crypto";
import { ReactElement } from "react";

export type AutoCompleteProps = {
  items: string[];
  value: string;
  onChange(val: string): void;
  input_id: string;
  dropdown_className: {};
  input_className: string;
  label_className?: string;
  dropdown_content_className: string;
  ul_className: string;
  li_className: string;
  label?: string;
};

export type Classes = {
  gms: string[];
  msea: string[];
};

export type Daily = {
  dailyId: UUID;
  description: string;
  done: Date | null;
  position: number;
};

export type Weekly = {
  weeklyId: UUID;
  description: string;
  done: Date | null;
  position: number;
  resetDate: Date;
};

export type Boss = {
  bossId: UUID;
  dashboardPosition: number;
  bossesPosition: number;
  dashboardImage: string;
  done: Date | null;
  partySize: number;
};

export type BossInfo = {
  bosses_position: number;
  bosses_image: string;
  dashboard_position: number;
  dashboard_image: string;
  meso: number;
};

export type Character = {
  characterId: UUID;
  image: string;
  ign: string;
  level: number;
  maplestoryClass: string;
  dailies: Daily[];
  weeklies: Weekly[];
  bosses: Boss[];
  position: number;
};

export type User = {
  userId: UUID;
  region: string;
  characters: Character[];
};

export type MainAppWrapperProps = {
  page: ReactElement;
};

export type ResetButtonProps = {
  user: User;
};
