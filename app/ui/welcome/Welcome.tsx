"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DialogueIndex,
  WelcomeProps,
} from "@/app/lib/definitions/welcome-definitions";
import { CharacterDetails } from "@/app/lib/definitions/general-definitions";
import WelcomeProvider from "@/app/ui/contexts/WelcomeContext";
import {
  smallSpiritDialogue,
  smallSpiritImage,
} from "@/public/welcome/small_spirit";
import RegionAndCharacter from "./RegionAndCharacter";
import CreateAccount from "./CreateAccount";
import DreamySkeleton from "../general/DreamySkeleton";

export default function Welcome({ classes }: WelcomeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<string>("");
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails>({
    image: null,
  });
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  // Check whether the user is a first-timer
  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (done) {
      const newUserDetails = { region: region, characters: [characterDetails] };
      localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
      router.push("/");
    }
  }, [done]);

  return (
    <WelcomeProvider value={{ classes, region }}>
      {isLoading ? (
        <DreamySkeleton />
      ) : (
        <main
          className="bg-elodin_background bg-cover bg-center h-screen flex flex-col items-center p-6 gap-4"
          data-theme="elodin"
        >
          <div className="w-1/2 flex items-center">
            <Image
              src={smallSpiritImage[dialogueIndex]}
              height={0}
              width={0}
              alt="Small Spirit"
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
      )}
    </WelcomeProvider>
  );
}
