"use client";
import { useState, useEffect } from "react";
import { Page } from "@/app/lib/definitions/characters-definitions";
import type { User } from "@/app/lib/definitions/general-definitions";
import ViewCharacters from "./ViewCharacters";
import NavBar from "./NavBar";
import Pagination from "./Pagination";

export default function Characters() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("view");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <main className="grid grid-cols-[1fr_12vw]">
      {user && (
        <>
          {currentPage === "view" && <ViewCharacters charactersProp={user.characters} setCurrentPage={setCurrentPage}/>}
          <div className="flex flex-col items-center">
            <NavBar />
            <Pagination />
          </div>
        </>
      )}
    </main>
  );
}
