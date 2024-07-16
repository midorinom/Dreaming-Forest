import type { BossInfo, Character, Daily, Weekly } from "./general-definitions";

export type DashboardProps = {
  bossesInfo: BossInfo[];
};

export type ActiveCharacterProps = {
  activeCharacter: Character;
};

export type DailiesWeekliesProps = {
  region: string;
  activeCharacter: Character;
};

export type DailiesProps = {
  region: string;
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
  setEditDailiesClicked: (editDailiesClicked: boolean) => void;
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  characterPosition: number;
};

export type DailiesEditProps = {
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
  setEditDailiesClicked: (editDailiesClicked: boolean) => void;
};

export type DailiesCardProps = {
  dailyProp: Daily;
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
  region: string;
};

export type DailiesEditCardProps = {
  dailyProp: Daily;
  dailies: Daily[];
  setDailies: (dailies: Daily[]) => void;
};

export type DailyInputProps = {
  daily: Daily;
  setDaily: (daily: Daily) => void;
};

export type WeekliesProps = {
  region: string;
  weeklies: Weekly[];
  setWeeklies: (weeklies: Weekly[]) => void;
  setEditWeekliesClicked: (editWeekliesClicked: boolean) => void;
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  characterPosition: number;
};

export type WeekliesEditProps = {
  region: string;
  weeklies: Weekly[];
  setWeeklies: (weeklies: Weekly[]) => void;
  setEditWeekliesClicked: (editWeekliesClicked: boolean) => void;
};

export type WeekliesCardProps = {
  weeklyProp: Weekly;
  weeklies: Weekly[];
  setWeeklies: (weeklies: Weekly[]) => void;
  region: string;
};

export type WeekliesEditCardProps = {
  resetDates: Date[];
  weeklyProp: Weekly;
  weeklies: Weekly[];
  setWeeklies: (dailies: Weekly[]) => void;
};

export type WeeklyInputProps = {
  weekly: Weekly;
  setWeekly: (weekly: Weekly) => void;
};

export type WeeklyTimerSelectProps = {
  weekly: Weekly;
  setWeekly: (weekly: Weekly) => void;
  resetDates: Date[];
};

export type BossesProps = {
  region: string;
  activeCharacter: Character;
  bossesInfo: BossInfo[];
};

export type BossesEditProps = {
  setEditBossesClicked: (editBossesClicked: boolean) => void;
};
