"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { MainAppWrapperProps } from "@/app/lib/definitions/general-definitions";
import TopNav from "@/app/ui/general/TopNav";
import SideNav from "@/app/ui/general/SideNav";
import DreamySkeleton from "@/app/ui/general/DreamySkeleton";

export default function MainAppWrapper({ page }: MainAppWrapperProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check whether the user is a first-timer
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setIsLoading(false);
    } else {
      router.replace("welcome");
    }
  }, []);

  return isLoading ? (
    <DreamySkeleton />
  ) : (
    <div
      className="grid h-screen w-screen grid-cols-[4vw_1fr] grid-rows-[6vh_94vh] bg-lucid_background bg-cover bg-center"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      {page}
    </div>
  );
}
