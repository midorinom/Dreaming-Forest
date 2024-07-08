"use client";
import TopNav from "../general/TopNav";
import SideNav from "../general/SideNav";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";

export default function MainApp() {
  return (
    <div
      className="bg-lucid_background bg-cover bg-center h-screen"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      <Dashboard />
    </div>
  );
}
