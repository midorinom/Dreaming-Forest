"use client";
import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center gap-2">
        <Image
          src="/general/small_spirit_crying.png"
          height={0}
          width={0}
          alt="Small Spirit Crying"
          sizes="100vw"
          className="mb-16 w-1/5"
        />
        <div className="text-5xl font-medium text-primary-content">
          Under Construction
        </div>
      </div>
    </div>
  );
}
