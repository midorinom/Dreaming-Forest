"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const [buttonHovered, setButtonHovered] = useState<string>("");
  const router = useRouter();

  function handleClick(url: string) {
    router.replace(url);
  }

  return (
    <div className="row-span-1 col-span-1 row-start-2 col-start-1">
      <div className="relative flex flex-col w-full h-[31vh] items-center justify-around">
        <div
          className={`absolute w-full h-full bg-accent ${
            buttonHovered ? "opacity-100" : "opacity-[.60]"
          }`}
        ></div>
        <Image
          src="/general/characters_icon.png"
          id="characters"
          height={0}
          width={0}
          alt="Characters Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/characters")}
          onMouseEnter={() => setButtonHovered("characters")}
          onMouseLeave={() => setButtonHovered("")}
        />
        <Image
          src="/general/dailies_icon.png"
          height={0}
          width={0}
          alt="Dailies Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/dailies-weeklies")}
          onMouseEnter={() => setButtonHovered("dailiesWeeklies")}
          onMouseLeave={() => setButtonHovered("")}
        />
        <Image
          src="/general/bosses_icon.png"
          height={0}
          width={0}
          alt="Bosses Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/bosses")}
          onMouseEnter={() => setButtonHovered("bosses")}
          onMouseLeave={() => setButtonHovered("")}
        />
        <Image
          src="/general/progression_icon.png"
          height={0}
          width={0}
          alt="Progression Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/progression")}
          onMouseEnter={() => setButtonHovered("progression")}
          onMouseLeave={() => setButtonHovered("")}
        />
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
  );
}
