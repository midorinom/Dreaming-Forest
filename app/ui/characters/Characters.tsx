"use client";
import { useState, useEffect, useRef } from "react";
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
  const isMounted = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [region, setRegion] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>("view");
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
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
      switch (currentPage) {
        case "view":
          setTotalPagesPagination(Math.ceil(characters.length / 4));
          break;
        case "rearrange":
          setTotalPagesPagination(Math.ceil(characters.length / 5));
          break;
        case "delete":
          setTotalPagesPagination(Math.ceil(characters.length / 10));
          break;
        default:
          console.error("No Page");
          break;
      }
    }
  }, [characters, currentPage]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters = characters;
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [characters]);

  useEffect(() => {
    if (currentPage !== "add") setCurrentPagePagination(1);
  }, [currentPage]);

  return (
    <>
      {user && region && characters.length > 0 && (
        <CharactersProvider value={{ classes, region }}>
          <main className="grid grid-cols-[1fr_12vw]">
            <>
              {currentPage === "view" && (
                <ViewCharacters
                  characters={characters}
                  setCharacters={setCharacters}
                  currentPagePagination={currentPagePagination}
                />
              )}
              {currentPage === "rearrange" && (
                <RearrangeCharacters
                  characters={characters}
                  setCharacters={setCharacters}
                  currentPagePagination={currentPagePagination}
                />
              )}
              {currentPage === "add" && (
                <AddCharacter setCharacters={setCharacters} />
              )}
              {currentPage === "delete" && (
                <DeleteCharacters
                  characters={characters}
                  setCharacters={setCharacters}
                  currentPagePagination={currentPagePagination}
                />
              )}
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
