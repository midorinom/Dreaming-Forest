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
        <div className="relative flex flex-col w-full h-[31vh] items-center justify-around">
          <div
            className={`absolute w-full h-full bg-accent ${
              buttonHovered ? "opacity-100" : "opacity-[.60]"
            }`}
          ></div>
          <Link href="/characters">
            <Image
              src="/general/characters_icon.png"
              id="characters"
              height={0}
              width={0}
              alt="Characters Button"
              sizes="100vw"
              className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("characters")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/dailies-weeklies">
            <Image
              src="/general/dailies_icon.png"
              height={0}
              width={0}
              alt="Dailies Button"
              sizes="100vw"
              className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("dailiesWeeklies")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/bosses">
            <Image
              src="/general/bosses_icon.png"
              height={0}
              width={0}
              alt="Bosses Button"
              sizes="100vw"
              className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("bosses")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          <Link href="/progression">
            <Image
              src="/general/progression_icon.png"
              height={0}
              width={0}
              alt="Progression Button"
              sizes="100vw"
              className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
              onMouseEnter={() => setButtonHovered("progression")}
              onMouseLeave={() => setButtonHovered("")}
            />
          </Link>
          {buttonHovered === "characters" && (
            <div className="absolute top-[1.5vh] z-10 left-[4vw] w-fit-content h-[5vh] bg-accent text-2xl text-info font-medium flex items-center p-2">
              Characters
            </div>
          )}
          {buttonHovered === "dailiesWeeklies" && (
            <div className="absolute top-[9.3vh] z-10 left-[4vw] w-fit-content h-[5vh] bg-accent text-2xl text-info font-medium flex items-center p-2">
              Dailies/Weeklies
            </div>
          )}
          {buttonHovered === "bosses" && (
            <div className="absolute top-[17.1vh] z-10 left-[4vw] w-fit-content h-[5vh] bg-accent text-2xl text-info font-medium flex items-center p-2">
              Bosses
            </div>
          )}
          {buttonHovered === "progression" && (
            <div className="absolute top-[24.7vh] z-10 left-[4vw] w-fit-content h-[5vh] bg-accent text-2xl text-info font-medium flex items-center p-2">
              Progression
            </div>
          )}
        </div>
      </div>
    )
  );
}
