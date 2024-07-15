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

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const isMounted = useRef(false);
  const [dailies, setDailies] = useState<Daily[]>(activeCharacter.dailies);
  const [weeklies, setWeeklies] = useState<Weekly[]>(activeCharacter.weeklies);
  const [selectedTab, setSelectedTab] = useState<string>("Dailies");
  const [editDailiesClicked, setEditDailiesClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters[activeCharacter.position].dailies = dailies;
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [dailies]);

  return (
    <div className="flex flex-col items-end w-full mt-2">
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
      <Weeklies
        weeklies={weeklies}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}
