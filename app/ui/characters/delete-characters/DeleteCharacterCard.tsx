"use client";
import Image from "next/image";
import { DeleteCharacterCardProps } from "@/app/lib/definitions/characters-definitions";
import { deleteImage } from "@/app/lib/functions/utility-functions";

export default function DeleteCharacterCard({
  characterProp,
  characters,
  setCharacters,
  setIsLoading,
}: DeleteCharacterCardProps) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${characterProp.ign}?`,
    );
    if (confirmDelete) {
      setIsLoading(true);

      if (characterProp.image) await deleteImage(characterProp);
      const newCharacters = [];

      for (let i = 0; i < characters.length; i++) {
        if (characters[i].characterId === characterProp.characterId) continue;

        const newCharacter = JSON.parse(JSON.stringify(characters[i]));
        if (i > characterProp.position) {
          newCharacter.position = i - 1;
        }

        newCharacters.push(newCharacter);
      }

      setCharacters(newCharacters);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-4/5 w-full flex-col items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={
            characterProp.image
              ? characterProp.image
              : "/general/naked_char.png"
          }
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <Image
        src="/general/ui_icons/delete_icon.png"
        height={0}
        width={0}
        alt="Delete Button"
        sizes="100vw"
        className="h-2/5 w-auto hover:cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
}
