"use client";
import { NavBarIconProps } from "@/app/lib/definitions/characters-definitions";
import Image from "next/image";

export default function NavBarIcon({
  icon,
  setCurrentPage,
  setButtonHovered,
}: NavBarIconProps) {
  return (
    <Image
      src="/general/ui_icons/rearrange_icon.png"
      height={0}
      width={0}
      alt="Rearrange Button"
      sizes="100vw"
      className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
    />
  );
}
