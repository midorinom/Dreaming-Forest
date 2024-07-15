import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import type { DailiesEditProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Daily } from "@/app/lib/definitions/general-definitions";
import DailiesEditCard from "./DailiesEditCard";

export default function DailiesEdit({
  dailies,
  setDailies,
  setEditDailiesClicked,
}: DailiesEditProps) {
  function addDaily() {
    const newDaily: Daily = {
      dailyId: uuidv4() as UUID,
      description: "Test",
      done: null,
      position: dailies.length,
    };
    setDailies([...dailies, newDaily]);
  }

  return (
    <div className="collapse collapse-open w-[36vw] bg-primary">
      <div className="collapse-title pl-2 pr-5 pt-3">
        <div className="flex content-center justify-between">
          <Image
            src="/general/ui_icons/back_icon.png"
            height={0}
            width={0}
            alt="Back Button"
            sizes="100vw"
            className="h-[2.75rem] w-[auto] hover:cursor-pointer"
            onClick={() => setEditDailiesClicked(false)}
          />
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Dailies
          </span>
          <button
            className="btn btn-neutral text-3xl text-info"
            onClick={addDaily}
          >
            +
          </button>
        </div>
      </div>
      {dailies.length > 0 && (
        <div className="collapse-content max-h-[41vh]">
          {dailies.map((daily) => (
            <DailiesEditCard daily={daily} setDailies={setDailies} />
          ))}
        </div>
      )}
    </div>
  );
}
