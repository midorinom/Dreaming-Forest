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
  Character,
  User,
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
  const [character, setCharacter] = useState<Character>({
    characterId: uuidv4() as UUID,
    image: "",
    ign: "",
    level: 0,
    maplestoryClass: "",
    dailies: [],
    weeklies: [],
    bosses: [],
    position: 0,
  } as Character);
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [done, setDone] = useState(false);
  const [isUploadingToDatabase, setIsUploadingToDatabase] = useState(false);
  const router = useRouter();

  // Check whether the user is a first-timer
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function storeImage(newUser: User, image: File) {
      const imagePath = `characters/${newUser.userId}/${character.ign}`;

      const response = await fetch(
        `/api/character-images?imagepath=${imagePath}`,
        {
          method: "PUT",
          body: image,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { url } = await response.json();
      newUser.characters[0].image = url;
      localStorage.setItem("user", JSON.stringify(newUser));
      router.push("/");
    }

    if (done) {
      setIsUploadingToDatabase(true);
      setDialogueIndex("uploading");
      const newUser: User = {
        userId: uuidv4() as UUID,
        region: region,
        characters: [character],
      };

      if (uploadedFile) {
        storeImage(newUser, uploadedFile);
      } else {
        localStorage.setItem("user", JSON.stringify(newUser));
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
          className="flex h-screen flex-col items-center gap-4 bg-elodin_background bg-cover bg-center p-6"
          data-theme="elodin"
        >
          <div className="flex w-1/2 items-center">
            <Image
              src={smallSpiritImage[dialogueIndex]}
              height={0}
              width={0}
              alt="Small Spirit"
              sizes="100vw"
              className="h-44 w-auto"
            />
            <div className="chat chat-start min-w-64">
              <div className="chat-bubble chat-bubble-accent">
                {smallSpiritDialogue[dialogueIndex]}
              </div>
            </div>
          </div>
          {isUploadingToDatabase ? (
            <span className="loading loading-spinner mt-36 h-1/5 w-auto text-accent"></span>
          ) : proceedClicked ? (
            <CreateAccount setDone={setDone} />
          ) : (
            <RegionAndCharacter
              region={region}
              setRegion={setRegion}
              setUploadedFile={setUploadedFile}
              character={character}
              setCharacter={setCharacter}
              setDialogueIndex={setDialogueIndex}
              setProceedClicked={setProceedClicked}
            />
          )}
        </main>
      )}
    </WelcomeProvider>
  );
}
