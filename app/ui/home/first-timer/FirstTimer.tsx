"use client";
import { useState, useEffect } from "react";
import {
  CharacterDetails,
  DialogueIndex,
  FirstTimerProps,
} from "@/app/lib/definitions/first-timer-definitions";
import FirstTimerProvider from "@/app/ui/contexts/FirstTimerContext";
import Image from "next/image";
import SelectRegion from "./SelectRegion";
import AddCharacter from "./AddCharacter";
import {
  small_spirit_dialogue,
  small_spirit_image,
} from "@/public/home/first-timer/small_spirit";

export default function FirstTimer({ classes }: FirstTimerProps) {
  const [region, setRegion] = useState<string>("");
  const [characterChecked, setCharacterChecked] = useState(false);
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails>({
    image: null,
  });
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
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
    <FirstTimerProvider value={{ classes, region }}>
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="w-1/2 flex items-center">
          <Image
            src={small_spirit_image[dialogueIndex]}
            height={0}
            width={0}
            alt="Naked Character"
            sizes="100vw"
            className="w-auto h-44"
          />
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-info">
              {small_spirit_dialogue[dialogueIndex]}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center">
          <div className="min-w-fit text-primary-content">
            <div className="collapse bg-accent">
              <input
                type="radio"
                name="accordion"
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
              />
              <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
                Add Character
              </div>
              <div className="collapse-content">
                <AddCharacter
                  characterDetails={characterDetails}
                  setCharacterDetails={setCharacterDetails}
                />
              </div>
            </div>
            {/* <div className="collapse bg-warning">
              <input
                type="radio"
                name="accordion"
                onChange={() => {
                  if (characterChecked) {
                    setCharacterChecked(false);
                  }
                }}
              />
              <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
                Create Account
              </div>
              <div className="collapse-content">Create Account</div>
            </div> */}
          </div>
          <button
            disabled={!readyToProceed}
            className="self-end btn btn-lg glass btn-info rounded-full mt-4 text-xl font-medium text-primary-content"
          >
            <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
            Proceed
          </button>
        </div>
      </div>
    </FirstTimerProvider>
  );
}
