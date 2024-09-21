"use client";
import { useState, useEffect } from "react";
import {
  CharactersProps,
  Page,
} from "@/app/lib/definitions/characters-definitions";
import type { User } from "@/app/lib/definitions/general-definitions";
import CharactersProvider from "@/app/ui/contexts/CharactersContext";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import ViewCharacters from "./view-characters/ViewCharacters";
import RearrangeCharacters from "./rearrange-characters/RearrangeCharacters";
import AddCharacter from "./add-character/AddCharacter";
import DeleteCharacters from "./delete-characters/DeleteCharacters";

export default function Characters({ classes }: CharactersProps) {
  const [user, setUser] = useState<User | null>(null);
  const [region, setRegion] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<Page>("view");

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser = JSON.parse(localUser);

      setRegion(parsedLocalUser.region);
      setUser(parsedLocalUser);
    }
  }, []);

  return (
    <>
      {user && (
        <CharactersProvider value={{ classes, region }}>
          <main className="grid grid-cols-[1fr_12vw]">
            <>
              {currentPage === "view" && (
                <ViewCharacters charactersProp={user.characters} />
              )}
              {currentPage === "rearrange" && <RearrangeCharacters />}
              {currentPage === "add" && <AddCharacter />}
              {currentPage === "delete" && <DeleteCharacters />}
              <div className="flex flex-col items-center">
                <NavBar
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <Pagination />
              </div>
            </>
          </main>
        </CharactersProvider>
      )}
    </>
  );
}
