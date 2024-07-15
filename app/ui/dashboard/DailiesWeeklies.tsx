import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import { Daily, Weekly } from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";

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
      <div
        className={`w-[36vw] collapse ${
          (weeklies.length === 0 || dailies.length === 0) && "collapse-open"
        } bg-secondary`}
      >
        {weeklies.length > 0 && <input type="radio" name="accordion" />}
        <div
          className={`${
            weeklies.length === 0 && "mb-1"
          } pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8`}
        >
          Weeklies
        </div>
        {weeklies.length > 0 && (
          <div className="collapse-content max-h-[41vh]"></div>
        )}
      </div>
    </div>
  );
}
