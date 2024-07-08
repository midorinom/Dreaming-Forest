import { DashboardProps } from "@/app/lib/definitions/dashboard-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./Bosses";
import CharactersWheel from "./CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";

export default function Dashboard({ userDetails }: DashboardProps) {
  return (
    <div className="grid grid-rows-[27vh_1fr] grid-cols-[40vw_1fr]">
      <ActiveCharacter activeCharacter={userDetails.characters[0]} />
      <CharactersWheel />
      <DailiesWeeklies />
      <Bosses />
    </div>
  );
}
