import { User } from "./general-definitions";

export type ResetButtonProps = {
  user: User;
};

export type ChangeRegionButtonProps = {
  user: User;
  setUser: (user: User) => void;
};

export type SyncButtonProps = {
  user: User;
  setUser: (user: User) => void;
  setIsQueryingDatabase: (isQueryingDatabase: string) => void;
  setSmallSpiritImage: (smallSpiritImage: string) => void;
};

export type CreateAccountButtonProps = {
  setCreateAccountClicked: (createAccountClicked: boolean) => void;
};

export type CreateAccountProps = {
  user: User;
  setUser: (user: User) => void;
  setCreateAccountClicked: (createAccountClicked: boolean) => void;
  setIsQueryingDatabase: (isQueryingDatabase: string) => void;
  setSmallSpiritImage: (smallSpiritImage: string) => void;
};
