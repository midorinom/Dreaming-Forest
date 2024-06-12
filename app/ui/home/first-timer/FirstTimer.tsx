"use client";
import { useState } from "react";
import {
  DialogueIndex,
  FirstTimerProps,
} from "@/app/lib/definitions/first-timer-definitions";
import FirstTimerProvider from "@/app/ui/contexts/FirstTimerContext";
import Image from "next/image";
import {
  small_spirit_dialogue,
  small_spirit_image,
} from "@/public/home/first-timer/small_spirit";
import RegionAndCharacter from "./RegionAndCharacter";
import CreateAccount from "./CreateAccount";

export default function FirstTimer({ classes }: FirstTimerProps) {
  const [region, setRegion] = useState<string>("");
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);

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
        {proceedClicked ? (
          <CreateAccount />
        ) : (
          <RegionAndCharacter
            region={region}
            setRegion={setRegion}
            setDialogueIndex={setDialogueIndex}
            setProceedClicked={setProceedClicked}
          />
        )}
      </div>
    </FirstTimerProvider>
  );
}
