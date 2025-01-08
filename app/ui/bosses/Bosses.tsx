"use client";
import { useState, useEffect } from "react";
import { BossesProps, Page } from "@/app/lib/definitions/bosses-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import NavBar from "@/app/ui/bosses/NavBar";
import BossesView from "@/app/ui/bosses/view/BossesView";
import BossesEdit from "@/app/ui/bosses/edit/BossesEdit";

export default function Bosses({ bossesInfo }: BossesProps) {
  const [currentPage, setCurrentPage] = useState<Page>("view");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [region, setRegion] = useState<string>("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser: User = JSON.parse(localUser);

      setCharacters(parsedLocalUser.characters);
      setRegion(parsedLocalUser.region);
    }
  }, []);

  return (
    <>
      {region && characters.length > 0 && (
        <main className="relative">
          <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {currentPage === "view" ? (
            <BossesView
              bossesInfo={bossesInfo}
              characters={characters}
              region={region}
            />
          ) : (
            <BossesEdit />
          )}
        </main>
      )}
    </>
  );
}
