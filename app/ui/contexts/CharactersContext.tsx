import React, { ReactNode, createContext, useContext } from "react";
import type { CharactersContextType } from "@/app/lib/definitions/characters-definitions";

type CharactersProviderProps = {
  children: ReactNode;
  value: CharactersContextType;
};

const CharactersContext = createContext<CharactersContextType | null>(null);

export const useCharacters = () => {
  return useContext(CharactersContext);
};

export default function CharactersProvider({
  children,
  value,
}: CharactersProviderProps) {
  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
}
