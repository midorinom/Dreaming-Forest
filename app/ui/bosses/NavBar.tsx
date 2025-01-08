"use client";
import { useState } from "react";
import Image from "next/image";
import { NavBarProps } from "@/app/lib/definitions/bosses-definitions";

export default function NavBar({ currentPage, setCurrentPage }: NavBarProps) {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  return (
    <div className="w-min-content absolute left-0 top-0 flex h-[8vh] items-center justify-around p-2">
      <div
        className={`absolute h-full w-full bg-accent ${
          buttonHovered ? "opacity-100" : "opacity-[.60]"
        }`}
      ></div>
      <Image
        src={`/general/ui_icons/${currentPage === "view" ? "edit" : "checklist"}_icon.png`}
        height={0}
        width={0}
        alt={"View Icon"}
        sizes="100vw"
        className={`relative ${currentPage === "view" ? "h-[5vh]" : "h-[5.5vh]"} w-[3vw] hover:cursor-pointer`}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        onClick={() => setCurrentPage(currentPage === "view" ? "edit" : "view")}
      />
    </div>
  );
}
