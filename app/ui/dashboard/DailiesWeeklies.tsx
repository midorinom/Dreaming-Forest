import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import { Daily, Weekly } from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [weeklies, setWeeklies] = useState<Weekly[]>([]);

  useEffect(() => {
    setDailies(activeCharacter.dailies);
    setWeeklies(activeCharacter.weeklies);
  }, []);

  return (
    <div className="flex flex-col items-end w-full mt-2">
      <Dailies region={region} dailies={dailies} weeklies={weeklies} />
      <Weeklies dailies={dailies} weeklies={weeklies} />
    </div>
  );
}
