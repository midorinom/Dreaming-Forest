"use client";
import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Daily, Weekly } from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";
import DailiesEdit from "./DailiesEdit";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [weeklies, setWeeklies] = useState<Weekly[]>([]);
  const [editDailiesClicked, setEditDailiesClicked] = useState<boolean>(false);

  useEffect(() => {
    setDailies(activeCharacter.dailies);
    setWeeklies(activeCharacter.weeklies);
  }, []);

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
        />
      )}
      <Weeklies weeklies={weeklies} />
    </div>
  );
}
