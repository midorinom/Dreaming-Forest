"use client";
import { useState, useEffect } from "react";
import {
  CharacterDetails,
  RegionAndCharacterProps,
} from "@/app/lib/definitions/first-timer-definitions";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";

export default function RegionAndCharacter({
  region,
  setRegion,
  setDialogueIndex,
  setProceedClicked,
}: RegionAndCharacterProps) {
  const [characterChecked, setCharacterChecked] = useState(false);
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails>({
    image: null,
  });
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
    <div className="w-1/2 flex justify-center">
      <div className="w-fit flex flex-col text-primary-content">
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
          <div className="collapse-title text-xl font-medium underline-offset-8 underline-elodin-neutral">
            Add Character
          </div>
          <div className="collapse-content">
            <AddCharacter
              characterDetails={characterDetails}
              setCharacterDetails={setCharacterDetails}
            />
          </div>
        </div>
        <button
          disabled={!readyToProceed}
          className="self-end btn btn-lg glass btn-accent rounded-full mt-4 text-xl font-medium text-primary-content"
          onClick={() => {
            setProceedClicked(true);
            setDialogueIndex("create_account");
          }}
        >
          <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
          Proceed
        </button>
      </div>
    </div>
  );
}
