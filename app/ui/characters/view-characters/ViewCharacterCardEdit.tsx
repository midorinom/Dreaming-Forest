"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { ViewCharacterCardEditProps } from "@/app/lib/definitions/characters-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function CharacterCardEdit({
  character,
  setCharacter,
  setEditClicked,
}: ViewCharacterCardEditProps) {
  const [userId, setUserId] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");
  const [isUploadingToDatabase, setIsUploadingToDatabase] =
    useState<boolean>(false);
  const [isPrimaryBackground, setIsPrimaryBackground] =
    useState<boolean>(false);
  const [isTopCard, setIsTopCard] = useState<boolean>(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      return console.error("No user");
    } else {
      const parsedUser: User = JSON.parse(localUser);
      setUserId(parsedUser.userId);
    }

    if (character.position % 4 === 0 || character.position % 4 === 3) {
      setIsPrimaryBackground(true);
    }

    if (character.position % 4 === 0 || character.position % 4 === 1) {
      setIsTopCard(true);
    }
  }, []);

  useEffect(() => {
    if (!ign && !level && !uploadedFile && !maplestoryClass) {
      return;
    }

    updateCharacter();
  }, [uploadedFile, ign, level, maplestoryClass]);

  async function updateCharacter() {
    const newCharacter = { ...character };

    // Define fetch function for deleting image
    async function deleteImage() {
      const response = await fetch(`/api/character-images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characters: [character] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    }

    // Define fetch function for storing image
    async function storeImage(image: File) {
      const imagePath = `characters/${userId}/${character.ign}`;

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

    if (uploadedFile) {
      // Set new user in local storage, upload image to database if there is one
      setIsUploadingToDatabase(true);

      try {
        if (character.image) await deleteImage();
        await storeImage(uploadedFile);
        setUploadedFile(null);
      } catch (error) {
        console.error("Error adding character", error);
        throw new Error("Error adding character");
      }

      setIsUploadingToDatabase(false);
    }

    if (ign) {
      newCharacter.ign = ign;
    }

    if (level) {
      newCharacter.level = level;
    }

    if (maplestoryClass) {
      newCharacter.maplestoryClass = maplestoryClass;
    }

    setCharacter(newCharacter);
  }

  return (
    <>
      {character && (
        <div
          className={`relative flex h-[84%] w-[83%] items-center justify-center ${character.position % 4 === 0 || character.position % 4 === 1 ? "self-end" : "self-start"} rounded-3xl ${isPrimaryBackground ? "bg-primary" : "bg-secondary"}`}
        >
          {isUploadingToDatabase ? (
            <span className="loading loading-spinner h-1/5 w-auto text-accent"></span>
          ) : (
            <div className="flex h-full w-full flex-col gap-4">
              <div className="collapse grid h-full grid-cols-2 grid-rows-3 items-center overflow-visible">
                <Image
                  src="/general/ui_icons/back_icon.png"
                  height={0}
                  width={0}
                  alt="Back Button"
                  sizes="100vw"
                  className="absolute left-2 top-2 z-10 h-[3rem] w-[auto] hover:cursor-pointer"
                  onClick={() => setEditClicked(false)}
                />
                <ImageField
                  setUploadedFile={setUploadedFile}
                  isPrimaryBackground={isPrimaryBackground}
                  image={character.image}
                />
                <IgnField
                  ign={character.ign}
                  setIgn={setIgn}
                  isPrimaryBackground={isPrimaryBackground}
                />
                <LevelField
                  level={character.level}
                  setLevel={setLevel}
                  isPrimaryBackground={isPrimaryBackground}
                />
                <ClassField
                  maplestoryClass={character.maplestoryClass}
                  setMaplestoryClass={setMaplestoryClass}
                  isTopCard={isTopCard}
                  isPrimaryBackground={isPrimaryBackground}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}