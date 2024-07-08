import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex w-full h-full gap-2 justify-center items-center">
        <Image
          src="/general/small_spirit_crying.png"
          height={0}
          width={0}
          alt="Small Spirit Crying"
          sizes="100vw"
          className="w-1/5 mb-16"
        />
        <div className="text-5xl text-primary-content font-medium">
          Under Construction
        </div>
      </div>
    </div>
  );
}
