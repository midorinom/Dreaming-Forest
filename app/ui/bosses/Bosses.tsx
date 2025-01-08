"use client";
import { useState } from "react";
import { Page } from "@/app/lib/definitions/bosses-definitions";
import NavBar from "@/app/ui/bosses/NavBar";

export default function Bosses() {
  const [currentPage, setCurrentPage] = useState<Page>("view");
  return (
    <main className="relative">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
