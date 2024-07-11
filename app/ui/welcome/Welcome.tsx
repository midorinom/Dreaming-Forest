"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
import { PUT } from "@/app/api/character-images/route";
import type {
  DialogueIndex,
  WelcomeProps,
} from "@/app/lib/definitions/welcome-definitions";
import type {
  CharacterDetails,
  UserDetails,
} from "@/app/lib/definitions/general-definitions";
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails>({
    image: "",
    ign: "",
    level: 0,
    maplestoryClass: "",
  });
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [done, setDone] = useState(false);
  const [isUploadingToDatabase, setIsUploadingToDatabase] = useState(false);
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
    async function storeImage(newUserDetails: UserDetails, file: File) {
      const imagePath = `characters/${newUserDetails.userId}/${characterDetails.ign}`;
      const url = await PUT(imagePath, file);
      newUserDetails.characters[0].image = url;

      localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
      router.push("/");
    }

    if (done) {
      setIsUploadingToDatabase(true);
      const newUserDetails: UserDetails = {
        userId: uuidv4() as UUID,
        region: region,
        characters: [characterDetails],
      };

      if (uploadedFile) {
        storeImage(newUserDetails, uploadedFile);
      } else {
        localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
        router.push("/");
      }
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
          {isUploadingToDatabase ? (
            <span className="loading loading-spinner text-accent"></span>
          ) : proceedClicked ? (
            <CreateAccount setDone={setDone} />
          ) : (
            <RegionAndCharacter
              region={region}
              setRegion={setRegion}
              setUploadedFile={setUploadedFile}
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
