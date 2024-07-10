"use client";
import { useState, useEffect } from "react";
import {
  DialogueIndex,
  FirstTimerProps,
} from "@/app/lib/definitions/first-timer-definitions";
import { CharacterDetails } from "@/app/lib/definitions/general-definitions";
import FirstTimerProvider from "@/app/ui/contexts/FirstTimerContext";
import Image from "next/image";
import {
  smallSpiritDialogue,
  smallSpiritImage,
} from "@/public/home/first-timer/small_spirit";
import RegionAndCharacter from "./RegionAndCharacter";
import CreateAccount from "./CreateAccount";

export default function FirstTimer({ classes }: FirstTimerProps) {
  const [region, setRegion] = useState<string>("");
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails>({
    image: null,
  });
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      const newUserDetails = { region: region, characters: [characterDetails] };
      localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
      window.location.href = "/"; // Perform full refresh when redirecting in order to switch layouts properly
    }
  }, [done]);

  return (
    <FirstTimerProvider value={{ classes, region }}>
      <main
        className="bg-elodin_background bg-cover bg-center h-screen flex flex-col items-center p-6 gap-4"
        data-theme="elodin"
      >
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
            <div className="chat-bubble chat-bubble-accent">
              {smallSpiritDialogue[dialogueIndex]}
            </div>
          </div>
        </div>
        {proceedClicked ? (
          <CreateAccount setDone={setDone} />
        ) : (
          <RegionAndCharacter
            region={region}
            setRegion={setRegion}
            characterDetails={characterDetails}
            setCharacterDetails={setCharacterDetails}
            setDialogueIndex={setDialogueIndex}
            setProceedClicked={setProceedClicked}
          />
        )}
      </main>
    </FirstTimerProvider>
  );
}
