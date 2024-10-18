"use client";
import Image from "next/image";
import { RearrangeCharacterCardProps } from "@/app/lib/definitions/characters-definitions";

export default function RearrangeCharacterCard({
  characterProp,
  characters,
  setCharacters,
}: RearrangeCharacterCardProps) {
  async function handleRearrange(direction: "left" | "right") {
    // const newCharacters = [];
    // for (let i = 0; i < characters.length; i++) {
    //   if (characters[i].characterId === characterProp.characterId) continue;
    //   const newCharacter = { ...characters[i] };
    //   if (i > characterProp.position) {
    //     newCharacter.position = i - 1;
    //   }
    //   newCharacters.push(newCharacter);
    // }
    // setCharacters(newCharacters);
    console.log(direction);
  }

  return (
    <div className="flex h-3/5 w-full flex-col items-center justify-center gap-4">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-[45%] w-full items-center justify-center"
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
      <div className="flex h-[15%]">
        {characterProp.position !== 0 && (
          <Image
            src="/general/ui_icons/rearrange_left_icon.png"
            height={0}
            width={0}
            alt="Rearrange Left Button"
            sizes="100vw"
            className="h-full w-auto hover:cursor-pointer"
            onClick={() => handleRearrange("left")}
          />
        )}
        {characterProp.position !== characters.length - 1 && (
          <Image
            src="/general/ui_icons/rearrange_right_icon.png"
            height={0}
            width={0}
            alt="Rearrange Right Button"
            sizes="100vw"
            className="h-full w-auto hover:cursor-pointer"
            onClick={() => handleRearrange("right")}
          />
        )}
      </div>
    </div>
  );
}
