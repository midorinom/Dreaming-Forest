"use client";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";

export default function FirstTimer() {
  return (
    <div className="w-1/3 text-primary-content">
      <div className="collapse bg-accent">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-pink">
          Select Region
        </div>
        <div className="collapse-content">
          <SelectRegion />
        </div>
      </div>
      <div className="collapse bg-primary">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-pink">
          Add Character
        </div>
        <div className="collapse-content">
          <AddCharacter />
        </div>
      </div>
    </div>
  );
}
