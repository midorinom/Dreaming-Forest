"use client";
import { useState } from "react";

export default function SelectRegion() {
  const [mseaClicked, setMseaClicked] = useState(false);
  const [gmsClicked, setGmsClicked] = useState(false);
  const handleClick = (region: string) => {
    switch (region) {
      case "msea":
        setMseaClicked((prevState) => !prevState);
        break;
      case "gms":
        setGmsClicked((prevState) => !prevState);
        break;
      default:
        return;
    }
  };

  return (
    <div className="flex justify-start gap-5">
      <button
        className={
          mseaClicked ? "btn btn-primary" : "btn btn-outline btn-primary"
        }
        onClick={() => handleClick("msea")}
      >
        MSEA
      </button>
      <button
        className={
          gmsClicked ? "btn btn-secondary" : "btn btn-outline btn-secondary"
        }
        onClick={() => handleClick("gms")}
      >
        GMS
      </button>
    </div>
  );
}
