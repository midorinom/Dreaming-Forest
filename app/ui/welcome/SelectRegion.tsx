"use client";
import type { SelectRegionProps } from "@/app/lib/definitions/welcome-definitions";

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
        console.error("No region selected");
        setRegion("");
        return;
    }
  };

  return (
    <div className="flex items-center justify-start gap-5 min-h-14">
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
