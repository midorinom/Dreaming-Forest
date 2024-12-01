import { User } from "./general-definitions";

export type ResetButtonProps = {
  user: User;
};

export type SyncButtonProps = {
  user: User;
  isQueryingDatabase: (isQueryingDatabase: boolean) => void;
};

export type CreateAccountButtonProps = {
  user: User;
};
