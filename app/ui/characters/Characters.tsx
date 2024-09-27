"use client";
import { useState, useEffect } from "react";
import {
  CharactersProps,
  Page,
} from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>("view");
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(0);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser: User = JSON.parse(localUser);

      setUser(parsedLocalUser);
      setRegion(parsedLocalUser.region);
      setCharacters(parsedLocalUser.characters);
    }
  }, []);

  useEffect(() => {
    if (characters.length > 0 && currentPage !== "add") {
      if (currentPage === "view")
        setTotalPagesPagination(Math.ceil(characters.length / 4));
      else setTotalPagesPagination(Math.ceil(characters.length / 10));
    }
  }, [characters, currentPage]);

  return (
    <>
      {user && region && characters && (
        <CharactersProvider value={{ classes, region }}>
          <main className="grid grid-cols-[1fr_12vw]">
            <>
              {currentPage === "view" && (
                <ViewCharacters
                  charactersProp={characters}
                  currentPagePagination={currentPagePagination}
                />
              )}
              {currentPage === "rearrange" && <RearrangeCharacters />}
              {currentPage === "add" && (
                <AddCharacter setCharacters={setCharacters} />
              )}
              {currentPage === "delete" && <DeleteCharacters />}
              <div className="flex flex-col items-center">
                <NavBar
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <Pagination
                  currentPage={currentPage}
                  currentPagePagination={currentPagePagination}
                  setCurrentPagePagination={setCurrentPagePagination}
                  totalPagesPagination={totalPagesPagination}
                />
              </div>
            </>
          </main>
        </CharactersProvider>
      )}
    </>
  );
}
