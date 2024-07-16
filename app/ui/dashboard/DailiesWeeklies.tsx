"use client";
import { useState, useEffect, useRef } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Daily,
  User,
  Weekly,
} from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";
import DailiesEdit from "./DailiesEdit";
import WeekliesEdit from "./WeekliesEdit";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const isMounted = useRef(false);
  const [dailies, setDailies] = useState<Daily[]>(activeCharacter.dailies);
  const [weeklies, setWeeklies] = useState<Weekly[]>(activeCharacter.weeklies);
  const [selectedTab, setSelectedTab] = useState<string>("Dailies");
  const [editDailiesClicked, setEditDailiesClicked] = useState<boolean>(false);
  const [editWeekliesClicked, setEditWeekliesClicked] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters[activeCharacter.position].dailies = dailies;
      newUser.characters[activeCharacter.position].weeklies = weeklies;
      localStorage.setItem("user", JSON.stringify(newUser));
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
      {editDailiesClicked ? (
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
      )}
      {editWeekliesClicked ? (
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
      )}
    </div>
  );
}
