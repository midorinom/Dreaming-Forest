"use client";
import React, { useEffect, useState } from "react";
import { useCharacters } from "@/app/ui/contexts/CharactersContext";
import AutoComplete from "@/app/ui/general/AutoComplete";
import type { ClassFieldProps } from "@/app/lib/definitions/characters-definitions";

const ClassSelect = ({
  setMaplestoryClass,
  displaySuccessMessage,
}: ClassFieldProps) => {
  const charactersCtx = useCharacters();
  const [classInput, setClassInput] = useState<string>("");
  const [classes, setClasses] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const input_id = "class_autocomplete";
  const dropdown_className = {
    "dropdown w-full": true,
  };
  const input_className =
    "grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-base text-primary-content bg-neutral border-0 border-b-2 border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer";
  const label_className =
    "absolute text-base text-secondary duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";
  const dropdown_content_className =
    "dropdown-content bg-base-200 top-14 max-h-40 overflow-scroll scrollbar-hide flex-col rounded-md";
  const ul_className = "menu bg-secondary";
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
      setMaplestoryClass(classInput);
    } else {
      setMaplestoryClass("");
    }
  }, [classes, classInput]);

  useEffect(() => {
    if (displaySuccessMessage) {
      setClassInput("");
    }
  }, [displaySuccessMessage]);

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
    />
  );
};

export default ClassSelect;
