import { UUID } from "crypto";
import { ReactElement } from "react";

export type AutoCompleteProps = {
  items: string[];
  value: string;
  onChange(val: string): void;
  input_id: string;
  dropdown_className: {};
  input_className: string;
  label_className: string;
  dropdown_content_className: string;
  ul_className: string;
  li_className: string;
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

export type Character = {
  characterId: UUID;
  image: string;
  ign: string;
  level: number;
  maplestoryClass: string;
  dailies: Daily[];
};

export type UserDetails = {
  userId: UUID;
  region: string;
  characters: Character[];
};

export type MainAppWrapperProps = {
  page: ReactElement;
};

export type ResetButtonProps = {
  userDetails: UserDetails;
};
