"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SideNav() {
  const [buttonHovered, setButtonHovered] = useState<string>("");
  const pathname = usePathname();
  const showNav = pathname !== "/welcome";

  return (
    showNav && (
      <div className="col-span-1 col-start-1 row-span-1 row-start-2">
        <div className="relative flex h-[31vh] w-full flex-col items-center justify-around">
          <div
            className={`absolute h-full w-full bg-accent ${
              buttonHovered ? "opacity-100" : "opacity-[.60]"
            }`}
          ></div>
          <Link href="/characters">
            <Image
              src="/general/ui_icons/characters_icon.png"
              height={0}
              width={0}
              alt="Characters Button"
              sizes="100vw"
              className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("characters")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/dailies-weeklies">
            <Image
              src="/general/ui_icons/dailies_icon.png"
              height={0}
              width={0}
              alt="Dailies Button"
              sizes="100vw"
              className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("dailiesWeeklies")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/bosses">
            <Image
              src="/general/ui_icons/bosses_icon.png"
              height={0}
              width={0}
              alt="Bosses Button"
              sizes="100vw"
              className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("bosses")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/progression">
            <Image
              src="/general/ui_icons/progression_icon.png"
              height={0}
              width={0}
              alt="Progression Button"
              sizes="100vw"
              className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("progression")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          {buttonHovered === "characters" && (
            <div className="w-fit-content absolute left-[4vw] top-[1.5vh] z-10 flex h-[5vh] items-center bg-accent p-2 text-2xl font-medium text-info">
              Characters
            </div>
          )}
          {buttonHovered === "dailiesWeeklies" && (
            <div className="w-fit-content absolute left-[4vw] top-[9.3vh] z-10 flex h-[5vh] items-center bg-accent p-2 text-2xl font-medium text-info">
              Dailies/Weeklies
            </div>
          )}
          {buttonHovered === "bosses" && (
            <div className="w-fit-content absolute left-[4vw] top-[17.1vh] z-10 flex h-[5vh] items-center bg-accent p-2 text-2xl font-medium text-info">
              Bosses
            </div>
          )}
          {buttonHovered === "progression" && (
            <div className="w-fit-content absolute left-[4vw] top-[24.7vh] z-10 flex h-[5vh] items-center bg-accent p-2 text-2xl font-medium text-info">
              Progression
            </div>
          )}
        </div>
      </div>
    )
  );
}
