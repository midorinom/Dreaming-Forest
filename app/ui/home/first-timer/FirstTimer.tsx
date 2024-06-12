"use client";
import { useState } from "react";
import { FirstTimerProps } from "@/app/lib/definitions/first-timer-definitions";
import FirstTimerProvider from "@/app/ui/contexts/FirstTimerContext";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";
import styles from "./FirstTimer.module.css";

export default function FirstTimer({ classes }: FirstTimerProps) {
  const [region, setRegion] = useState<string>("");
  const [characterChecked, setCharacterChecked] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false); // to reset the fade in animation

  const AddCharacterOnChange = () => {
    setCharacterChecked(true);

    setIsAnimated(false);
    setTimeout(() => setIsAnimated(true), 10);
  };

  return (
    <FirstTimerProvider value={{ classes, region }}>
      <div className="min-w-fit w-1/3 text-primary-content">
        <div className="collapse bg-accent">
          <input
            type="radio"
            name="accordion"
            onChange={() => {
              setCharacterChecked(false);
            }}
            defaultChecked
          />
          <div
            className={
              "collapse-title text-xl font-medium underline-offset-8 underline-neutral"
            }
          >
            Select Region
          </div>
          <div className="collapse-content">
            <SelectRegion region={region} setRegion={setRegion} />
          </div>
        </div>
        <div
          className={`${
            characterChecked ? "overflow-visible" : ""
          } collapse bg-primary`}
        >
          <input
            type="radio"
            name="accordion"
            onChange={AddCharacterOnChange}
          />
          <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
            Add Character
          </div>
          <div
            className={`collapse-content ${
              isAnimated ? styles["fade-in"] : ""
            }`}
          >
            <AddCharacter />
          </div>
        </div>
      </div>
    </FirstTimerProvider>
  );
}
