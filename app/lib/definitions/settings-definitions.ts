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
  setCreateAccountClicked: (createAccountClicked: boolean) => void;
};

export type CreateAccountProps = {
  user: User;
  setCreateAccountClicked: (createAccountClicked: boolean) => void;
  setIsQueryingDatabase: (isQueryingDatabase: string) => void;
  setSmallSpiritImage: (smallSpiritImage: string) => void;
};