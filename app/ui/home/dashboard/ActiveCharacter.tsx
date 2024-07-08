import Image from "next/image";
import { ActiveCharacterProps } from "@/app/lib/definitions/dashboard-definitions";

export default function ActiveCharacter({
  activeCharacter,
}: ActiveCharacterProps) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full flex items-center">
        <Image
          src={
            activeCharacter.imageBase64
              ? activeCharacter.imageBase64
              : "/general/naked_char.png"
          }
          height={0}
          width={0}
          alt="Active Character"
          sizes="100vw"
          className="h-4/5 w-auto row-span-2 ml-8 justify-self-center"
        />
        <div className="w-3/5 mt-3 flex flex-col gap-2 justify-center">
          <div className="text-6xl text-neutral font-medium underline-dreamy-accent underline-offset-8">
            {activeCharacter.ign}
          </div>
          <div className="text-2xl text-neutral flex gap-2">
            <div>Lv {activeCharacter.level}</div>
            <div> {activeCharacter.maplestoryClass}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
