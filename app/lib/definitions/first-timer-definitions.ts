import { CharacterDetails, UserDetails } from "./general-definitions";
import { Classes } from "./home-definitions";

export type FirstTimerContextType = {
  classes: {
    gms: string[];
    msea: string[];
  };
  region: string;
};

export type FirstTimerProps = {
  classes: Classes;
};

export type Dialogue = {
  [key in DialogueIndex]: string;
};

export type DialogueIndex = "welcome" | "add_character" | "create_account";

export type RegionAndCharacterProps = {
  region: string;
  setRegion: (region: string) => void;
  characterDetails: CharacterDetails;
  setCharacterDetails: (characterDetails: CharacterDetails) => void;
  setDialogueIndex: (dialogueIndex: DialogueIndex) => void;
  setProceedClicked: (proceedClicked: boolean) => void;
};

export type SelectRegionProps = {
  region: string;
  setRegion: (region: string) => void;
};

export type AddCharacterProps = {
  characterDetails: CharacterDetails;
  setCharacterDetails: (characterDetails: CharacterDetails) => void;
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
};

export type UsernameFieldProps = {
  setUsername: (username: string) => void;
};

export type PasswordFieldProps = {
  setPassword: (password: string) => void;
  confirmPasswordError: string;
};

export type ConfirmPasswordFieldProps = {
  setConfirmPassword: (confirmPassword: string) => void;
  confirmPasswordError: string;
};
