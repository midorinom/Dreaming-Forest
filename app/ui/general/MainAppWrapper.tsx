"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainAppWrapperProps } from "@/app/lib/definitions/general-definitions";
import TopNav from "@/app/ui/general/TopNav";
import SideNav from "@/app/ui/general/SideNav";
import DreamySkeleton from "@/app/ui/general/DreamySkeleton";

export default function MainAppWrapper({ page }: MainAppWrapperProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check whether the user is a first-timer
  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      setIsLoading(false);
    } else {
      router.replace("welcome");
    }
  }, []);

  return isLoading ? (
    <DreamySkeleton />
  ) : (
    <div
      className="grid grid-rows-[6vh_94vh] grid-cols-[4vw_1fr] bg-lucid_background bg-cover bg-center w-screen h-screen"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      {page}
    </div>
  );
}
