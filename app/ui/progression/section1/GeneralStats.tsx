"use client";
import { Section1Props } from "@/app/lib/definitions/progression-definitions";

export default function GeneralStats({ activeCharacter }: Section1Props) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div>
        {activeCharacter.progression.general.stat && (
          <div className="flex justify-between">
            <span>Stat</span>
            <span className="w-[30%] bg-white text-center">51 400</span>
          </div>
        )}
        {activeCharacter.progression.general.combatPower && (
          <div className="flex justify-between">
            <span>Combat Power</span>
            <span className="w-[30%] bg-white text-center">210 M</span>
          </div>
        )}
        {activeCharacter.progression.general.starForce && (
          <div className="flex justify-between">
            <span>Star Force</span>
            <span className="w-[30%] bg-white text-center">428</span>
          </div>
        )}
      </div>
      <div>
        {activeCharacter.progression.general.arcaneForce && (
          <div className="flex justify-between">
            <span>Arcane Force</span>
            <span className="w-[30%] bg-white text-center">1350</span>
          </div>
        )}
        {activeCharacter.progression.general.sacredForce && (
          <div className="flex justify-between">
            <span>Sacred Force</span>
            <span className="w-[30%] bg-white text-center">300</span>
          </div>
        )}
      </div>
      <div>
        {activeCharacter.progression.general.dojo && (
          <div className="flex justify-between">
            <span>Dojo</span>
            <span className="w-[30%] bg-white text-center">F60</span>
          </div>
        )}
        {activeCharacter.progression.general.ba && (
          <div className="flex justify-between">
            <span>BA</span>
            <span className="w-[30%] bg-white text-center">200 b/s</span>
          </div>
        )}
      </div>
    </div>
  );
}
