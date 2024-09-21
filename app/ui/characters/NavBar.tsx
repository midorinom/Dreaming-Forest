"use client";
import { useState } from "react";
import { NavBarProps } from "@/app/lib/definitions/characters-definitions";
import NavBarIcon from "./NavBarIcon";

export default function NavBar({ currentPage, setCurrentPage }: NavBarProps) {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  return (
    <div className="relative flex h-[7vh] w-full items-center justify-around">
      <div
        className={`absolute h-full w-full bg-accent ${
          buttonHovered ? "opacity-100" : "opacity-[.60]"
        }`}
      ></div>
      <NavBarIcon
        icon={currentPage === "rearrange" ? "view" : "rearrange"}
        setCurrentPage={setCurrentPage}
        setButtonHovered={setButtonHovered}
      />
      <NavBarIcon
        icon={currentPage === "add" ? "view" : "add"}
        setCurrentPage={setCurrentPage}
        setButtonHovered={setButtonHovered}
      />
      <NavBarIcon
        icon={currentPage === "delete" ? "view" : "delete"}
        setCurrentPage={setCurrentPage}
        setButtonHovered={setButtonHovered}
      />
    </div>
  );
}
