"use client";
import { NavBarIconProps } from "@/app/lib/definitions/characters-definitions";
import Image from "next/image";

export default function NavBarIcon({
  icon,
  setCurrentPage,
  setButtonHovered,
}: NavBarIconProps) {
  let imageUrl = "/general/ui_icons/view_characters_icon.png";

  switch (icon) {
    case "rearrange":
      imageUrl = "/general/ui_icons/rearrange_icon.png";
      break;

    case "add":
      imageUrl = "/general/ui_icons/add_character_icon.png";
      break;

    case "delete":
      imageUrl = "/general/ui_icons/delete_character_icon.png";
      break;

    default:
      break;
  }

  return (
    <Image
      src={imageUrl}
      height={0}
      width={0}
      alt={`${icon} Characters Button`}
      sizes="100vw"
      className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
    />
  );
}
