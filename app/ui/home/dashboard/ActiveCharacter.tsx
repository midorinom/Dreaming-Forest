import Image from "next/image";

export default function ActiveCharacter() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full flex items-center">
        <Image
          src="/general/midori.png"
          height={0}
          width={0}
          alt="Naked Character"
          sizes="100vw"
          className="h-4/5 w-auto row-span-2 ml-8 justify-self-center"
        />
        <div className="w-3/5 mt-3 flex flex-col gap-2 justify-center">
          <div className="text-6xl text-neutral font-medium underline-dreamy-accent underline-offset-8">
            Midori
          </div>
          <div className="text-2xl text-neutral flex gap-2">
            <div>Lv 275</div>
            <div>Dual Blade</div>
          </div>
        </div>
      </div>
    </div>
  );
}
