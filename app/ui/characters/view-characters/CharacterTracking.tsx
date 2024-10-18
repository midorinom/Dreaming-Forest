"use client";
import { ChangeEvent } from "react";
import type { CharacterTrackingProps } from "@/app/lib/definitions/characters-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";

export default function CharacterTracking({
  trackingProp,
  character,
  setCharacter,
}: CharacterTrackingProps) {
  function handleCheckboxChange(
    e: ChangeEvent<HTMLInputElement>,
    label: "dailies" | "weeklies" | "bosses" | "progression",
    done: boolean,
  ) {
    const newCharacter: Character = JSON.parse(JSON.stringify(character));

    if (done) {
      newCharacter.tracking[label] = false;
    } else {
      newCharacter.tracking[label] = true;
    }

    setCharacter(newCharacter);
  }

  return (
    <div className="grid h-full w-[90%] grid-cols-2 items-start justify-items-center">
      <div className="flex flex-col items-start">
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${trackingProp.dailies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={trackingProp.dailies}
              onChange={(e) =>
                handleCheckboxChange(e, "dailies", trackingProp.dailies)
              }
            />
            <span className="label-text text-lg">Dailies</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${trackingProp.weeklies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={trackingProp.weeklies}
              onChange={(e) =>
                handleCheckboxChange(e, "weeklies", trackingProp.weeklies)
              }
            />
            <span className="label-text text-lg">Weeklies</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${trackingProp.bosses ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={trackingProp.bosses}
              onChange={(e) =>
                handleCheckboxChange(e, "bosses", trackingProp.bosses)
              }
            />
            <span className="label-text text-lg">Bosses</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${trackingProp.progression ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={trackingProp.progression}
              onChange={(e) =>
                handleCheckboxChange(e, "progression", trackingProp.progression)
              }
            />
            <span className="label-text text-lg">Progression</span>
          </label>
        </div>
      </div>
    </div>
  );
}
