import { Character } from "./general-definitions";
import { Classes } from "./general-definitions";

export type WelcomeContextType = {
  classes: {
    gms: string[];
    msea: string[];
  };
  region: string;
};

export type WelcomeProps = {
  classes: Classes;
};

export type Dialogue = {
  [key in DialogueIndex]: string;
};

export type DialogueIndex =
  | "welcome"
  | "select_region"
  | "add_character"
  | "create_account"
  | "uploading"
  | "login";

export type RegionAndCharacterProps = {
  region: string;
  setRegion: (region: string) => void;
  setUploadedFile: (file: File | null) => void;
  character: Character;
  setCharacter: (character: Character) => void;
  setDialogueIndex: (dialogueIndex: DialogueIndex) => void;
  setProceedClicked: (proceedClicked: boolean) => void;
};

export type SelectRegionProps = {
  region: string;
  setRegion: (region: string) => void;
};

export type AddCharacterProps = {
  setUploadedFile: (file: File | null) => void;
  character: Character;
  setCharacter: (character: Character) => void;
};

export type ImageFieldProps = {
  setUploadedFile: (image: File | null) => void;
};

export type IgnFieldProps = {
  setIgn: (ign: string) => void;
};

export type LevelFieldProps = {
  level: number;
  setLevel: (level: number) => void;
};

export type ClassFieldProps = {
  setMaplestoryClass: (maplestoryClass: string) => void;
};

export type CreateAccountProps = {
  setDone: (done: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

export type UsernameFieldProps = {
  setUsername: (username: string) => void;
  usernameError: string;
  setUsernameError: (usernameError: string) => void;
};

export type PasswordFieldProps = {
  setPassword: (password: string) => void;
  confirmPasswordError: string;
};

export type ConfirmPasswordFieldProps = {
  setConfirmPassword: (confirmPassword: string) => void;
  confirmPasswordError: string;
};

export type LoginProps = {
  setLoginPage: (loginPage: boolean) => void;
  setDialogueIndex: (dialogueIndex: DialogueIndex) => void;
};

export type LoginUsernameFieldProps = {
  setUsername: (username: string) => void;
  usernameError: string;
  setUsernameError: (usernameError: string) => void;
};

export type LoginPasswordFieldProps = {
  setPassword: (password: string) => void;
  passwordError: string;
  setPasswordError: (usernameError: string) => void;
};
