import { useState } from "react";
import Image from "next/image";
import type { DailiesEditProps } from "@/app/lib/definitions/dashboard-definitions";

export default function DailiesEdit({
  dailies,
  setEditDailiesClicked,
}: DailiesEditProps) {
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);

  return (
    <div
      className={`collapse w-[36vw] ${
        dailies.length === 0 && "collapse-open"
      } bg-primary`}
    >
      {dailies.length > 0 && (
        <input type="radio" name="accordion" defaultChecked />
      )}
      <div
        className={`${
          dailies.length === 0 && "mb-1"
        } collapse-title pt-3 text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral`}
        onMouseEnter={() => setHeadingHovered(true)}
        onMouseLeave={() => setHeadingHovered(false)}
      >
        <div className="flex gap-2">
          <span>DailiesEdit</span>
          {headingHovered && (
            <Image
              src="/general/ui_icons/edit_icon.png"
              height={0}
              width={0}
              alt="Progression Button"
              sizes="100vw"
              className="h-[2.5rem] w-[auto] hover:cursor-pointer"
              onClick={() => setEditDailiesClicked(false)}
            />
          )}
        </div>
      </div>
      {dailies.length > 0 && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
