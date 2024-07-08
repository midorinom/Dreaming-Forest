"use client";
import React from "react";
import TopNav from "../general/TopNav";
import SideNav from "../general/SideNav";

import { MainAppProps } from "@/app/lib/definitions/home-definitions";

export default function MainApp({ pageComponent }: MainAppProps) {
  return (
    <div
      className="grid grid-rows-[6vh_94vh] grid-cols-[4vw_1fr] bg-lucid_background bg-cover bg-center w-screen h-screen"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      {pageComponent}
    </div>
  );
}
