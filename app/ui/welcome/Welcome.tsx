"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
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
  } as CharacterDetails);
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
    async function storeImage(newUserDetails: UserDetails, image: File) {
      const imagePath = `characters/${newUserDetails.userId}/${characterDetails.ign}`;

      const response = await fetch(
        `/api/character-images?imagepath=${imagePath}`,
        {
          method: "PUT",
          body: image,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { url } = await response.json();
      newUserDetails.characters[0].image = url;
      localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
      router.push("/");
    }

    if (done) {
      setIsUploadingToDatabase(true);
      setDialogueIndex("uploading");
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
          className="flex flex-col items-center h-screen gap-4 p-6 bg-center bg-cover bg-elodin_background"
          data-theme="elodin"
        >
          <div className="flex items-center w-1/2">
            <Image
              src={smallSpiritImage[dialogueIndex]}
              height={0}
              width={0}
              alt="Small Spirit"
              sizes="100vw"
              className="w-auto h-44"
            />
            <div className="min-w-64 chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                {smallSpiritDialogue[dialogueIndex]}
              </div>
            </div>
          </div>
          {isUploadingToDatabase ? (
            <span className="w-auto loading loading-spinner text-accent h-1/5 mt-36"></span>
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
