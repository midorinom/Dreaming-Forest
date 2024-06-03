"use client";
import { useState } from "react";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";

export default function FirstTimer() {
  const [regionDone, setRegionDone] = useState<boolean>(false);

  return (
    <div className="min-w-fit w-1/3 text-primary-content">
      <div className="collapse bg-accent">
        <input type="radio" name="accordion" />
        <div
          className={
            "collapse-title text-xl font-medium underline-offset-8 underline-neutral"
          }
        >
          Select Region
        </div>
        <div className="collapse-content">
          <SelectRegion setRegionDone={setRegionDone} />
        </div>
      </div>
      <div className="collapse bg-primary">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
          Add Character
        </div>
        <div className="collapse-content">
          <AddCharacter />
        </div>
      </div>
    </div>
  );
}
