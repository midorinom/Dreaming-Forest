import React, { useEffect, useState } from "react";
import AutoComplete from "@/app/ui/general/AutoComplete";

type Class = {
  class_name: string;
  region: string;
};

const ClassSelect = () => {
  const [classInput, setClassInput] = useState<string>("");
  const [classes, setClasses] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const input_id = "class_autocomplete";
  const dropdown_className = {
    "dropdown w-4/5": true,
  };
  const input_className =
    "grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-base text-primary-content bg-neutral dark:bg-neutral border-0 border-b-2 border-accent appearance-none dark:text-primary-content dark:border-accent dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer";
  const label_className =
    "absolute text-base text-accent dark:text-accent duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";
  const dropdown_content_className =
    "dropdown-content bg-base-200 top-14 max-h-40 overflow-scroll scrollbar-hide flex-col rounded-md";
  const ul_className = "menu bg-accent";
  const li_className = "border-b border-b-base-content/10 w-full";

  useEffect(() => {
    function fetchData() {
      //   const url = "https://restclasses.com/v3.1/all?fields=name";
      //   const response = await fetch(url);
      //   const classes = (await response.json()) as Country[];
      //   const newItems = classes.map((p) => p.name.common).sort();

      const newItems = [
        "Cadena",
        "Dual Blade",
        "Striker",
        "Kanna",
        "Hero",
        "Dark Knight",
        "Night Walker",
        "Wind Archer",
        "Zero",
      ];
      setClasses(newItems);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!classInput) {
      setItems(classes);
      return;
    }

    const newItems = classes
      .filter((p) => p.toLowerCase().includes(classInput.toLowerCase()))
      .sort();
    setItems(newItems);
  }, [classes, classInput]);

  return (
    <AutoComplete
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
