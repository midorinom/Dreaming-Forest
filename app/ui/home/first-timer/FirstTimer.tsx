"use client";
import { useState, useEffect } from "react";
import {
  DialogueIndex,
  FirstTimerProps,
} from "@/app/lib/definitions/first-timer-definitions";
import FirstTimerProvider from "@/app/ui/contexts/FirstTimerContext";
import Image from "next/image";
import {
  smallSpiritDialogue,
  smallSpiritImage,
} from "@/public/home/first-timer/small_spirit";
import RegionAndCharacter from "./RegionAndCharacter";
import CreateAccount from "./CreateAccount";

export default function FirstTimer({
  classes,
  setIsFirstTimer,
}: FirstTimerProps) {
  const [region, setRegion] = useState<string>("");
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [skipClicked, setSkipClicked] = useState(false);

  useEffect(() => {
    if (skipClicked) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ characters: "hehe" })
      );
      setIsFirstTimer(false);
    }
  }, [skipClicked]);

  return (
    <FirstTimerProvider value={{ classes, region }}>
      <div className="bg-elodin_background bg-cover bg-center h-screen flex flex-col items-center p-6 gap-4">
        <div className="w-1/2 flex items-center">
          <Image
            src={smallSpiritImage[dialogueIndex]}
            height={0}
            width={0}
            alt="Naked Character"
            sizes="100vw"
            className="w-auto h-44"
          />
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-info">
              {smallSpiritDialogue[dialogueIndex]}
            </div>
          </div>
        </div>
        {proceedClicked ? (
          <CreateAccount setSkipClicked={setSkipClicked} />
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
