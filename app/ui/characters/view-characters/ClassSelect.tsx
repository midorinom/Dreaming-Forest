"use client";
import React, { useEffect, useState } from "react";
import { useCharacters } from "@/app/ui/contexts/CharactersContext";
import AutoComplete from "@/app/ui/general/AutoComplete";
import type { ClassFieldProps } from "@/app/lib/definitions/characters-definitions";

const ClassSelect = ({
  maplestoryClass,
  setMaplestoryClass,
  isTopCard,
  isPrimaryBackground,
}: ClassFieldProps) => {
  const charactersCtx = useCharacters();
  const [classInput, setClassInput] = useState<string | "">(
    maplestoryClass ? maplestoryClass : "",
  );
  const [classes, setClasses] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const input_id = "class_autocomplete";
  const dropdown_className = {
    "dropdown w-full": true,
  };
  const input_className = `grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-base text-primary-content bg-neutral border-0 border-b-2 ${isPrimaryBackground ? "border-secondary" : "border-primary"} appearance-none focus:outline-none focus:ring-0 ${isPrimaryBackground ? "focus:border-secondary" : "focus:border-primary"} peer`;
  const label_className = `absolute text-base ${isPrimaryBackground ? "text-secondary" : "text-primary"} duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 ${isPrimaryBackground ? "peer-focus:text-secondary" : "peer-focus:text-primary"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`;
  const dropdown_content_className = `dropdown-content bg-base-200 ${isTopCard ? "top-14" : "bottom-14"} max-h-40 overflow-scroll scrollbar-hide flex-col rounded-md z-10`;
  const ul_className = `menu ${isPrimaryBackground ? "bg-secondary" : "bg-primary"}`;
  const li_className = "border-b border-b-base-content/10 w-full";

  useEffect(() => {
    if (charactersCtx) {
      switch (charactersCtx.region) {
        case "GMS":
          setClasses(charactersCtx.classes.gms);
          break;

        case "MSEA":
          setClasses(charactersCtx.classes.msea);
          break;

        default:
          console.error("No region");
          return;
      }
    }
  }, [charactersCtx]);

  useEffect(() => {
    if (!classInput) {
      setItems(classes);
      setMaplestoryClass("");
      return;
    }

    const newItems = classes.filter((p) =>
      p.toLowerCase().startsWith(classInput.toLowerCase()),
    );
    setItems(newItems);

    if (classes.find((p) => p.toLowerCase() === classInput.toLowerCase())) {
      // Capitalise first letter of each word in the class, if the user did not
      const words = classInput.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }
      setMaplestoryClass(words.join(" "));
    } else {
      setMaplestoryClass("");
    }
  }, [classes, classInput]);

  return (
    <AutoComplete
      label={"Class"}
      items={items}
      value={classInput}
      onChange={setClassInput}
      input_id={input_id}
      dropdown_className={dropdown_className}
      input_className={input_className}
      label_className={label_className}
      dropdown_content_className={dropdown_content_className}
      ul_className={ul_className}
      li_className={li_className}
      clearable={false}
    />
  );
};

export default ClassSelect;
