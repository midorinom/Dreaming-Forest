"use client";
import type { WeekliesProps } from "@/app/lib/definitions/dashboard-definitions";

export default function Weeklies({
  weeklies,
  selectedTab,
  setSelectedTab,
}: WeekliesProps) {
  function handleHeadingClick() {
    if (selectedTab === "Dailies" && weeklies.length > 0) {
      setSelectedTab("Weeklies");
    }
  }

  return (
    <div
      className={`collapse w-[36vw] ${
        weeklies.length > 0 && selectedTab === "Weeklies" && "pb-3"
      } ${(weeklies.length === 0 || selectedTab === "Weeklies") && "collapse-open"} gap-2 bg-secondary`}
    >
      <div
        className={`${(weeklies.length === 0 || selectedTab !== "Weeklies") && "mb-1"} collapse-title pb-0 pt-3`}
        onClick={handleHeadingClick}
      >
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Weeklies
          </span>
        </div>
      </div>
      {weeklies.length > 0 && selectedTab === "Weeklies" && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
