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

export type SelectRegionProps = {
  region: string;
  setRegion: (region: string) => void;
};

export type IgnFieldProps = {
  setIgn: (ign: string) => void;
};

export type LevelFieldProps = {
  level: number;
  setLevel: (level: number) => void;
};

export type MaplestoryClass = {
  class_name: string;
};
