"use client";
import { SelectRegionProps } from "@/app/lib/definitions/first-timer-definitions";

export default function SelectRegion({ region, setRegion }: SelectRegionProps) {
  const handleClick = (regionClicked: string) => {
    switch (regionClicked) {
      case "MSEA":
        if (region === "GMS" || !region) {
          setRegion("MSEA");
        } else {
          setRegion("");
        }
        break;

      case "GMS":
        if (region === "MSEA" || !region) {
          setRegion("GMS");
        } else {
          setRegion("");
        }
        break;

      default:
        return;
    }
  };

  return (
    <div className="min-h-14 flex items-center justify-start gap-5">
      <button
        className={
          region === "MSEA" ? "btn btn-primary" : "btn btn-outline btn-neutral"
        }
        onClick={() => handleClick("MSEA")}
      >
        MSEA
      </button>
      <button
        className={
          region === "GMS" ? "btn btn-primary" : "btn btn-outline btn-neutral"
        }
        onClick={() => handleClick("GMS")}
      >
        GMS
      </button>
    </div>
  );
}
