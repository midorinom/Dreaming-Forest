import { Character } from "./general-definitions";

export type Progression = {
  general: ProgressionGeneral;
};

export type ProgressionGeneral = {
  stat: number;
  combatPower: number;
  starForce: number;
  arcaneForce: number;
  sacredForce: number;
  dojo: number;
  ba: number;
};

export type Section1Props = {
  activeCharacter: Character;
};

export type CharacterProps = {
  activeCharacter: Character;
};
