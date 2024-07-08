"use client";
import TopNav from "../general/TopNav";
import SideNav from "../general/SideNav";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";

export default function MainApp() {
  return (
    <div
      className="grid grid-rows-[6vh_94vh] grid-cols-[4vw_1fr] bg-lucid_background bg-cover bg-center w-screen h-screen"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      <Dashboard />
    </div>
  );
}
