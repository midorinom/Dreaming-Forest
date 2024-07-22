"use client";
import { useState } from "react";
import type { CharacterTrackingProps } from "@/app/lib/definitions/characters-definitions";
import type { Tracking } from "@/app/lib/definitions/general-definitions";

export default function CharacterTracking({
  trackingProp,
}: CharacterTrackingProps) {
  const [tracking, setTracking] = useState<Tracking>(trackingProp);

  return (
    <div className="grid h-full w-[90%] grid-cols-2 items-start justify-items-center">
      <div className="flex flex-col items-start">
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${tracking.dailies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={tracking.dailies}
            />
            <span className="label-text text-lg">Dailies</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${tracking.dailies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={tracking.dailies}
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
              className={`checkbox-accent checkbox checkbox-lg border-info ${tracking.dailies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={tracking.dailies}
            />
            <span className="label-text text-lg">Bossing</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label flex cursor-pointer gap-3">
            <input
              type="checkbox"
              className={`checkbox-accent checkbox checkbox-lg border-info ${tracking.dailies ? "hover:border-accent" : "hover:border-neutral"}`}
              checked={tracking.dailies}
            />
            <span className="label-text text-lg">Progression</span>
          </label>
        </div>
      </div>
    </div>
  );
}
