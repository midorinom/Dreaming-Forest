import { UUID } from "crypto";

export type FetchClassesResponse = { region: string; class_name: string }[];

export type FetchUserResponse = {
  user_id: UUID;
  username: string;
  region: string;
  pw_hash: string;
  last_logged_in: Date;
};

export type FetchCharactersResponse = {
  character_id: UUID;
  user_id: UUID;
  ign: string;
  level: number;
  class_name: string;
  image: string;
  position: number;
}[];

export type FetchTrackingResponse = {
  tracking_id: UUID;
  character_id: UUID;
  dailies: boolean;
  weeklies: boolean;
  bosses: boolean;
  progression: boolean;
};
