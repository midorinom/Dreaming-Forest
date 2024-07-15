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
      <div className="relative col-span-2 col-start-1 row-span-1 row-start-1 flex items-center justify-between">
        <div className="absolute h-full w-full bg-info opacity-[.70]"></div>
        <div className="relative left-3 flex items-center gap-2.5">
          <Link href="/">
            <Image
              src="/general/ui_icons/butterfly_logo.png"
              height={0}
              width={0}
              alt="Butterfly Logo"
              sizes="100vw"
              className="mb-1 h-[4vh] w-[3.5vw] hover:cursor-pointer"
              onClick={() => handleClick("/")}
            />
          </Link>
          <Link href="/">
            <div
              className={`${rougeScript.className} mt-0.5 text-3xl text-primary hover:cursor-pointer`}
              onClick={() => handleClick("/")}
            >
              Dreaming Forest
            </div>
          </Link>
        </div>
        <div className="relative right-4">
          <Link href="/settings">
            <Image
              src="/general/ui_icons/settings_icon.png"
              height={0}
              width={0}
              alt="Settings Button"
              sizes="100vw"
              className="h-[4vh] w-[3vw] hover:cursor-pointer"
              onClick={() => handleClick("/settings")}
            />
          </Link>
        </div>
      </div>
    )
  );
}
