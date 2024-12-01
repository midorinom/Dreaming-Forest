"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  MainAppWrapperProps,
  User,
} from "@/app/lib/definitions/general-definitions";
import {
  fetchAllUserDetails,
  fetchUser,
} from "@/app/lib/fetches/general-fetches";
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
      const parsedUser: User = JSON.parse(localUser);
      if (parsedUser.username) {
        checkVersionNumber(parsedUser);
      }

      setIsLoading(false);
    } else {
      router.replace("welcome");
    }
  }, []);

  async function checkVersionNumber(user: User) {
    const fetchedUser = await fetchUser(user.userId);
    if (user.versionNumber < fetchedUser.version_number) {
      // Current local version is outdated. Fetch all data and then set to localStorage
      const userDetails: User = await fetchAllUserDetails(user.userId);
      localStorage.setItem("user", JSON.stringify(userDetails));
    }
  }

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
