"use client";
import { useState, useEffect } from "react";
import type { RegionAndCharacterProps } from "@/app/lib/definitions/welcome-definitions";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";

export default function RegionAndCharacter({
  region,
  setRegion,
  setUploadedFile,
  characterDetails,
  setCharacterDetails,
  setDialogueIndex,
  setProceedClicked,
}: RegionAndCharacterProps) {
  const [characterChecked, setCharacterChecked] = useState(false);
  const [readyToProceed, setReadyToProceed] = useState(false);

  function handleRadioChange() {
    if (characterChecked) {
      setCharacterChecked(false);
      setDialogueIndex("welcome");
    } else {
      setCharacterChecked(true);
      setDialogueIndex("add_character");
    }
  }

  useEffect(() => {
    if (
      region ||
      characterDetails.ign ||
      characterDetails.level ||
      characterDetails.maplestoryClass
    ) {
      if (
        region &&
        characterDetails.ign &&
        characterDetails.level &&
        characterDetails.maplestoryClass
      ) {
        setReadyToProceed(true);
      } else {
        if (readyToProceed) {
          setReadyToProceed(false);
        }
      }
    }
  }, [
    region,
    characterDetails.ign,
    characterDetails.level,
    characterDetails.maplestoryClass,
  ]);

  return (
    <div className="flex justify-center w-1/2">
      <div className="flex flex-col w-fit text-primary-content">
        <div className="collapse bg-secondary">
          <input
            type="radio"
            name="accordion"
            onChange={handleRadioChange}
            defaultChecked
          />
          <div
            className={
              "collapse-title text-xl font-medium underline-offset-8 underline-elodin-neutral"
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
          <input type="radio" name="accordion" onChange={handleRadioChange} />
          <div className="text-xl font-medium collapse-title underline-offset-8 underline-elodin-neutral">
            Add Character
          </div>
          <div className="collapse-content">
            <AddCharacter
              setUploadedFile={setUploadedFile}
              characterDetails={characterDetails}
              setCharacterDetails={setCharacterDetails}
            />
          </div>
        </div>
        <button
          disabled={!readyToProceed}
          className="self-end mt-4 text-xl font-medium rounded-full btn btn-lg glass btn-accent text-primary-content"
          onClick={() => {
            setProceedClicked(true);
            setDialogueIndex("create_account");
          }}
        >
          <img
            src="/general/butterfly_logo.png"
            alt="My Icon"
            className="h-7 w-7"
          />
          Proceed
        </button>
      </div>
    </div>
  );
}
