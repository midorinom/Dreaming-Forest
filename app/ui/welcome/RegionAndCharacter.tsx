"use client";
import { useState, useEffect } from "react";
import type { RegionAndCharacterProps } from "@/app/lib/definitions/welcome-definitions";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";

export default function RegionAndCharacter({
  region,
  setRegion,
  setUploadedFile,
  character,
  setCharacter,
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
      character.ign ||
      character.level ||
      character.maplestoryClass
    ) {
      if (
        region &&
        character.ign &&
        character.level &&
        character.maplestoryClass
      ) {
        setReadyToProceed(true);
      } else {
        if (readyToProceed) {
          setReadyToProceed(false);
        }
      }
    }
  }, [region, character.ign, character.level, character.maplestoryClass]);

  return (
    <div className="flex w-1/2 justify-center">
      <div className="flex w-fit flex-col text-primary-content">
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
              setUploadedFile={setUploadedFile}
              character={character}
              setCharacter={setCharacter}
            />
          </div>
        </div>
        <button
          disabled={!readyToProceed}
          className="btn glass btn-accent btn-lg mt-4 self-end rounded-full text-xl font-medium text-primary-content"
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
