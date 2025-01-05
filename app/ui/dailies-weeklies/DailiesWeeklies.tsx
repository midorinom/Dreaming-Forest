"use client";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";

export default function DailiesWeeklies() {
  return (
    <main className="flex justify-around p-12">
      <Dailies />
      <Weeklies />
    </main>
  );
}
