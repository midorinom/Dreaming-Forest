"use client";
import { useState, useEffect } from "react";
import { SelectRegionProps } from "@/app/lib/definitions/first-timer-definitions";

export default function SelectRegion({ setRegionDone }: SelectRegionProps) {
  const [mseaSelected, setMseaSelected] = useState(false);
  const [gmsSelected, setGmsSelected] = useState(false);
  const handleClick = (region: string) => {
    switch (region) {
      case "msea":
        setMseaSelected((prevState) => !prevState);
        if (gmsSelected) {
          setGmsSelected(false);
        }
        break;

      case "gms":
        setGmsSelected((prevState) => !prevState);
        if (mseaSelected) {
          setMseaSelected(false);
        }
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    setRegionDone(mseaSelected || gmsSelected);
  }, [mseaSelected || gmsSelected]);

  return (
    <div className="min-h-16 flex items-center justify-start gap-5">
      <button
        className={
          mseaSelected ? "btn btn-primary" : "btn btn-outline btn-neutral"
        }
        onClick={() => handleClick("msea")}
      >
        MSEA
      </button>
      <button
        className={
          gmsSelected ? "btn btn-primary" : "btn btn-outline btn-neutral"
        }
        onClick={() => handleClick("gms")}
      >
        GMS
      </button>
    </div>
  );
}
