"use client";
import type { WeekliesProps } from "@/app/lib/definitions/dashboard-definitions";

export default function Weeklies({ dailies, weeklies }: WeekliesProps) {
  return (
    <div className={`collapse collapse-open w-[36vw] bg-secondary`}>
      <div
        className={`${
          weeklies.length === 0 && "mb-1"
        } collapse-title pt-3 text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral`}
      >
        Weeklies
      </div>
      {weeklies.length > 0 && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
