"use client";
import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Daily,
  User,
  Weekly,
} from "@/app/lib/definitions/general-definitions";
import { upsertDaily } from "@/app/lib/fetches/general-fetches";
import Dailies from "./dailies/Dailies";
import Weeklies from "./weeklies/Weeklies";
import DailiesEdit from "./dailies/DailiesEdit";
import WeekliesEdit from "./weeklies/WeekliesEdit";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const [currentCharacterId, setCurrentCharacterId] = useState<string>("");
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [weeklies, setWeeklies] = useState<Weekly[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("Dailies");
  const [editDailiesClicked, setEditDailiesClicked] = useState<boolean>(false);
  const [editWeekliesClicked, setEditWeekliesClicked] =
    useState<boolean>(false);

  useEffect(() => {
    if (!activeCharacter) {
      return;
    }

    setEditDailiesClicked(false);
    setEditWeekliesClicked(false);

    setDailies(activeCharacter.dailies);
    setWeeklies(activeCharacter.weeklies);

    if (
      !activeCharacter.tracking.dailies &&
      activeCharacter.tracking.weeklies
    ) {
      setSelectedTab("Weeklies");
    } else if (
      !activeCharacter.tracking.weeklies &&
      activeCharacter.tracking.dailies
    ) {
      setSelectedTab("Dailies");
    } else {
      setSelectedTab("Dailies");
    }
  }, [activeCharacter]);

  useEffect(() => {
    if (currentCharacterId !== activeCharacter.characterId) {
      setCurrentCharacterId(activeCharacter.characterId);
      return;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedUser: User = JSON.parse(localUser);

      // ---------- Disabled Login Features ----------
      // if (parsedUser.username) {
      //   for (const daily of dailies) {
      //     upsertDaily(daily, activeCharacter.characterId);
      //   }
      // } else {
      //   parsedUser.characters[activeCharacter.position].dailies = dailies;
      //   parsedUser.characters[activeCharacter.position].weeklies = weeklies;
      //   localStorage.setItem("user", JSON.stringify(parsedUser));
      // }

      parsedUser.characters[activeCharacter.position].dailies = dailies;
      parsedUser.characters[activeCharacter.position].weeklies = weeklies;
      localStorage.setItem("user", JSON.stringify(parsedUser));
    }
  }, [dailies, weeklies]);

  useEffect(() => {
    if (editDailiesClicked && selectedTab === "Weeklies") {
      if (editWeekliesClicked) {
        setEditWeekliesClicked(false);
      }
      setSelectedTab("Dailies");
    }
  }, [editDailiesClicked]);

  useEffect(() => {
    if (editWeekliesClicked && selectedTab === "Dailies") {
      if (editDailiesClicked) {
        setEditDailiesClicked(false);
      }
      setSelectedTab("Weeklies");
    }
  }, [editWeekliesClicked]);

  useEffect(() => {
    if (editDailiesClicked && selectedTab === "Weeklies") {
      setEditDailiesClicked(false);
    }

    if (editWeekliesClicked && selectedTab === "Dailies") {
      setEditWeekliesClicked(false);
    }
  }, [selectedTab]);

  return (
    <div className="mt-2 flex w-full flex-col items-end">
      {activeCharacter.tracking.dailies &&
        (editDailiesClicked ? (
          <DailiesEdit
            dailies={dailies}
            setDailies={setDailies}
            setEditDailiesClicked={setEditDailiesClicked}
          />
        ) : (
          <Dailies
            region={region}
            dailies={dailies}
            setDailies={setDailies}
            setEditDailiesClicked={setEditDailiesClicked}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            characterPosition={activeCharacter.position}
          />
        ))}
      {activeCharacter.tracking.weeklies &&
        (editWeekliesClicked ? (
          <WeekliesEdit
            region={region}
            weeklies={weeklies}
            setWeeklies={setWeeklies}
            setEditWeekliesClicked={setEditWeekliesClicked}
          />
        ) : (
          <Weeklies
            region={region}
            weeklies={weeklies}
            setWeeklies={setWeeklies}
            setEditWeekliesClicked={setEditWeekliesClicked}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            characterPosition={activeCharacter.position}
          />
        ))}
    </div>
  );
}
