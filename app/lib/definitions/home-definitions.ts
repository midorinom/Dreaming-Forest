import { ReactNode } from "react";

export type Classes = {
  gms: string[];
  msea: string[];
};

export type HomeProps = {
  classes: Classes;
};

export type MainAppProps = {
  pageComponent: ReactNode;
};