"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
import { AddCharactersProps } from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function AddCharacter({ setCharacters }: AddCharactersProps) {
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");
  const [readyToProceed, setReadyToProceed] = useState<boolean>(false);
  const [isUploadingToDatabase, setIsUploadingToDatabase] =
    useState<boolean>(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (ign || level || maplestoryClass) {
      const newCharacter: Character = { ...character };

      if (character.ign !== ign) {
        newCharacter.ign = ign;
      }

      if (character.level !== level) {
        newCharacter.level = level;
      }

      if (character.maplestoryClass !== maplestoryClass) {
        newCharacter.maplestoryClass = maplestoryClass;
      }

      setCharacter(newCharacter);
    }
  }, [ign, level, maplestoryClass]);

  useEffect(() => {
    if (character.ign || character.level || character.maplestoryClass) {
      if (character.ign && character.level && character.maplestoryClass) {
        setReadyToProceed(true);
      } else {
        if (readyToProceed) {
          setReadyToProceed(false);
        }
      }
    }
  }, [character.ign, character.level, character.maplestoryClass]);

  async function handleSubmit() {
    // Get local user
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      return console.error("No user");
    }

    const newUser: User = JSON.parse(localUser);
    const newCharacter = { ...character };
    newCharacter.characterId = uuidv4() as UUID;

    // Define fetch function for storing image
    async function storeImage(user: User, image: File) {
      const imagePath = `characters/${user.userId}/${character.ign}`;

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

      newCharacter.image = url;
    }

    // Set new user in local storage, upload image to database if there is one
    setIsUploadingToDatabase(true);

    try {
      if (uploadedFile) {
        await storeImage(newUser, uploadedFile);
        setUploadedFile(null);
      }
    } catch (error) {
      console.error("Error adding character", error);
      throw new Error("Error adding character");
    }

    newCharacter.position = newUser.characters.length;
    newUser.characters.push(newCharacter);
    setCharacters([...newUser.characters]);

    setIsUploadingToDatabase(false);
    setDisplaySuccessMessage(true);
    setTimeout(() => setDisplaySuccessMessage(false), 5000);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {displaySuccessMessage && (
          <div
            role="alert"
            className="alert alert-success absolute left-[25%] top-[12%] w-1/4 self-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Character has been added!</span>
          </div>
        )}
        {isUploadingToDatabase ? (
          <span className="loading loading-spinner h-1/5 w-auto text-accent"></span>
        ) : (
          <div className="flex h-[55%] min-h-64 w-1/2 flex-col gap-4">
            <div className="collapse grid h-4/5 grid-cols-2 grid-rows-3 items-center overflow-visible bg-primary">
              <ImageField
                setUploadedFile={setUploadedFile}
                displaySuccessMessage={displaySuccessMessage}
              />
              <IgnField
                setIgn={setIgn}
                displaySuccessMessage={displaySuccessMessage}
              />
              <LevelField
                level={level}
                setLevel={setLevel}
                displaySuccessMessage={displaySuccessMessage}
              />
              <ClassField
                setMaplestoryClass={setMaplestoryClass}
                displaySuccessMessage={displaySuccessMessage}
              />
            </div>
            <button
              disabled={!readyToProceed}
              className="w-fit-content btn btn-neutral self-end text-3xl text-info"
              onClick={handleSubmit}
            >
              Add Character
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
