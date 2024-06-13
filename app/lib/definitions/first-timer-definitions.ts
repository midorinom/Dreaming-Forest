export type FirstTimerContextType = {
  classes: {
    gms: string[];
    msea: string[];
  };
  region: string;
};

export type FirstTimerProps = {
  classes: {
    gms: string[];
    msea: string[];
  };
};

export type Dialogue = {
  [key in DialogueIndex]: string;
};

export type DialogueIndex = "welcome" | "add_character" | "create_account";

export type RegionAndCharacterProps = {
  region: string;
  setRegion: (region: string) => void;
  setDialogueIndex: (dialogueIndex: DialogueIndex) => void;
  setProceedClicked: (proceedClicked: boolean) => void;
};

export type CharacterDetails = {
  image: File | null;
  ign?: string;
  level?: number;
  maplestoryClass?: string;
};

export type SelectRegionProps = {
  region: string;
  setRegion: (region: string) => void;
};

export type AddCharacterProps = {
  characterDetails: CharacterDetails;
  setCharacterDetails: (characterDetails: CharacterDetails) => void;
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

export type SignUpDetails = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignUpErrors = {
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;
};
