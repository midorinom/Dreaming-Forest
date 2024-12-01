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
import { insertNewUser } from "@/app/lib/fetches/welcome-fetches";
import { insertNewCharacter } from "@/app/lib/fetches/sync-fetches";
import { storeImage } from "@/app/lib/functions/utility-functions";
import WelcomeProvider from "@/app/ui/contexts/WelcomeContext";
import {
  smallSpiritDialogue,
  smallSpiritImage,
} from "@/public/welcome/small_spirit";
import Login from "./login/Login";
import RegionAndCharacter from "./region-and-character/RegionAndCharacter";
import CreateAccount from "./create-account/CreateAccount";
import ElodinSkeleton from "../general/ElodinSkeleton";

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
    tracking: {
      dailies: true,
      weeklies: true,
      bosses: true,
      progression: true,
    },
  } as Character);
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>("welcome");
  const [proceedClicked, setProceedClicked] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [isUploadingToDatabase, setIsUploadingToDatabase] =
    useState<boolean>(false);
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Check whether the user is a new user
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (done) {
      setIsUploadingToDatabase(true);
      setDialogueIndex("uploading");
      const newUser: User = {
        userId: uuidv4() as UUID,
        username: username,
        region: region,
        characters: [character],
      };

      updateDatabase(newUser);
    }

    async function updateDatabase(newUser: User) {
      if (uploadedFile) {
        await storeImage(newUser.userId, newUser.characters[0], uploadedFile);
      }

      if (username) {
        newUser.username = username;
        await insertNewUser(newUser, password);
        await insertNewCharacter(character, newUser);
      }

      localStorage.setItem("user", JSON.stringify(newUser));
      router.push("/");
    }
  }, [done]);

  return (
    <WelcomeProvider value={{ classes, region }}>
      {isLoading ? (
        <ElodinSkeleton />
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
            <div className="chat chat-start min-w-80">
              <div className="chat-bubble chat-bubble-accent">
                {smallSpiritDialogue[dialogueIndex]}
              </div>
            </div>
          </div>
          {isUploadingToDatabase ? (
            <span className="loading loading-spinner mt-32 h-1/5 w-auto text-accent"></span>
          ) : loginPage ? (
            <Login
              setLoginPage={setLoginPage}
              setDialogueIndex={setDialogueIndex}
            />
          ) : proceedClicked ? (
            <CreateAccount
              setDone={setDone}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
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
