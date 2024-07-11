import React, { ReactNode, createContext, useContext } from "react";
import type { WelcomeContextType } from "@/app/lib/definitions/welcome-definitions";

type WelcomeProviderProps = {
  children: ReactNode;
  value: WelcomeContextType;
};

const WelcomeContext = createContext<WelcomeContextType | null>(null);

export const useWelcome = () => {
  return useContext(WelcomeContext);
};

export default function WelcomeProvider({
  children,
  value,
}: WelcomeProviderProps) {
  return (
    <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>
  );
}
