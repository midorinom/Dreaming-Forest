import React, { ReactNode, createContext, useContext } from "react";
import { FirstTimerContextType } from "@/app/lib/definitions/first-timer-definitions";

type FirstTimerProviderProps = {
  children: ReactNode;
  value: FirstTimerContextType;
};

const FirstTimerContext = createContext<FirstTimerContextType | null>(null);

export const useFirstTimer = () => {
  return useContext(FirstTimerContext);
};

export default function FirstTimerProvider({
  children,
  value,
}: FirstTimerProviderProps) {
  return (
    <FirstTimerContext.Provider value={value}>
      {children}
    </FirstTimerContext.Provider>
  );
}
