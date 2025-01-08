"use client";
import { CheckboxesProps } from "@/app/lib/definitions/bosses-definitions";
import CheckboxCard from "./CheckboxCard";

export default function Checkboxes({
  currentPageBossesList,
  currentPageCharacters,
  setCharacters,
}: CheckboxesProps) {
  return (
    <div className="collapse col-span-1 col-start-3 row-span-1 row-start-2 mx-auto h-full w-[96.5%] bg-primary/85 pr-16"></div>
  );
}
