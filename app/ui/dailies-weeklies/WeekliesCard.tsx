"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { WeekliesCardProps } from "@/app/lib/definitions/dailies-weeklies-definitions";

export default function WeekliesCard({
  character,
  weeklies,
  filter,
}: WeekliesCardProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [totalWeekliesDone, setTotalWeekliesDone] = useState<number>(0);

  useEffect(() => {
    if (weeklies[0].done) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    let total: number = 0;

    for (const weekly of weeklies) {
      if (weekly.done) {
        total += 1;
      }
    }

    setTotalWeekliesDone(total);
  }, [weeklies]);

  return (
    <div className="flex h-full w-4/5 items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={character.image ? character.image : "/general/naked_char.png"}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <div className="mt-2 w-1/3">
        {filter || totalWeekliesDone === weeklies.length ? (
          <input
            type="checkbox"
            className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info ${checked ? "hover:border-accent" : "hover:border-info"}`}
            checked={checked}
            readOnly={true}
          />
        ) : (
          <div className="w-fit-content label-text text-lg">{`${totalWeekliesDone} / ${weeklies.length}`}</div>
        )}
      </div>
    </div>
  );
}
