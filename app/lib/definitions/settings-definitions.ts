import { User } from "./general-definitions";

export type ResetButtonProps = {
  user: User;
};

export type SyncButtonProps = {
  user: User;
  setIsQueryingDatabase: (isQueryingDatabase: string) => void;
  setSmallSpiritImage: (smallSpiritImage: string) => void;
};

export type CreateAccountButtonProps = {
  user: User;
};
