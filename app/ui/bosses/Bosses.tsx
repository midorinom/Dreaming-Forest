"use client";
import { useState } from "react";
import { Page } from "@/app/lib/definitions/bosses-definitions";
import NavBar from "@/app/ui/bosses/NavBar";
import BossesView from "@/app/ui/bosses/view/BossesView";
import BossesEdit from "@/app/ui/bosses/edit/BossesEdit";

export default function Bosses() {
  const [currentPage, setCurrentPage] = useState<Page>("view");
  return (
    <main className="relative">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "view" ? <BossesView /> : <BossesEdit />}
    </main>
  );
}
