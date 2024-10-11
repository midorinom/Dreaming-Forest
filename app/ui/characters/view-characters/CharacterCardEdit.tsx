"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { CharacterCardEditProps } from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function CharacterCardEdit({
  characterProp,
  setEditClicked,
}: CharacterCardEditProps) {
  const isMounted = useRef(false);
  const [character, setCharacter] = useState<Character>(characterProp);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");
  const [isUploadingToDatabase, setIsUploadingToDatabase] =
    useState<boolean>(false);
  const [isPrimaryBackground, setIsPrimaryBackground] =
    useState<boolean>(false);

  useEffect(() => {
    if (character.position % 4 === 0 || character.position % 4 === 3) {
      setIsPrimaryBackground(true);
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters[character.position] = character;
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [character]);

  return (
    <>
      {character && (
        <div
          className={`relative flex h-[84%] w-[83%] items-center justify-center ${character.position % 4 === 0 || character.position % 4 === 1 ? "self-end" : "self-start"} rounded-3xl ${isPrimaryBackground ? "bg-primary/75" : "bg-secondary/75"}`}
        >
          {isUploadingToDatabase ? (
            <span className="loading loading-spinner h-1/5 w-auto text-accent"></span>
          ) : (
            <div className="flex h-full w-full flex-col gap-4">
              <div className="collapse grid h-full grid-cols-2 grid-rows-3 items-center overflow-visible bg-primary">
                <Image
                  src="/general/ui_icons/back_icon.png"
                  height={0}
                  width={0}
                  alt="Back Button"
                  sizes="100vw"
                  className="absolute left-2 top-2 z-10 h-[3rem] w-[auto] hover:cursor-pointer"
                  onClick={() => setEditClicked(false)}
                />
                <ImageField setUploadedFile={setUploadedFile} />
                <IgnField setIgn={setIgn} />
                <LevelField level={level} setLevel={setLevel} />
                <ClassField setMaplestoryClass={setMaplestoryClass} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
