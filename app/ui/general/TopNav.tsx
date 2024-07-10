"use client";
import { Rouge_Script } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const rougeScript = Rouge_Script({ subsets: ["latin"], weight: "400" });

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const showNav = pathname !== "/welcome";

  function handleClick(url: string) {
    router.replace(url);
  }

  return (
    showNav && (
      <div className="relative flex row-span-1 col-span-2 row-start-1 col-start-1 items-center justify-between ">
        <div className="absolute w-full h-full bg-info opacity-[.70]"></div>
        <div className="relative flex items-center gap-2.5 left-3">
          <Link href="/">
            <Image
              src="/general/butterfly_logo.png"
              height={0}
              width={0}
              alt="Butterfly Logo"
              sizes="100vw"
              className="w-[3.5vw] h-[4vh] mb-1 hover:cursor-pointer"
              onClick={() => handleClick("/")}
            />
          </Link>
          <Link href="/">
            <div
              className={`${rougeScript.className} text-primary text-3xl mt-0.5 hover:cursor-pointer`}
              onClick={() => handleClick("/")}
            >
              Dreaming Forest
            </div>
          </Link>
        </div>
        <div className="relative flex gap-4 right-4">
          <Link href="/profile">
            <Image
              src="/general/profile_icon.png"
              height={0}
              width={0}
              alt="Profile Button"
              sizes="100vw"
              className="w-[3vw] h-[4vh] hover:cursor-pointer"
              onClick={() => handleClick("/profile")}
            />
          </Link>
          <Link href="/settings">
            <Image
              src="/general/settings_icon.png"
              height={0}
              width={0}
              alt="Settings Button"
              sizes="100vw"
              className="w-[3vw] h-[4vh] hover:cursor-pointer"
              onClick={() => handleClick("/settings")}
            />
          </Link>
        </div>
      </div>
    )
  );
}
