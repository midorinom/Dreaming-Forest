import React, { useEffect, useState } from "react";
import AutoComplete from "@/app/ui/general/AutoComplete";

type Class = {
  class_name: string;
  region: string;
};

const ClassSelect = () => {
  //query typed by user
  const [classInput, setClassInput] = useState("");

  //a list to hold all the classes
  const [classes, setClasses] = useState<string[]>([]);

  //a list to show on the dropdown when user types
  const [items, setItems] = useState<string[]>([]);

  //query rest classes api and set the classes list
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
    //if there is no value, return the classes list.
    if (!classInput) {
      setItems(classes);
      return;
    }

    //if the val changes, we filter items so that it can be filtered. and set it as new state
    const newItems = classes
      .filter((p) => p.toLowerCase().includes(classInput.toLowerCase()))
      .sort();
    setItems(newItems);
  }, [classes, classInput]);

  //use the common auto complete component here.
  return (
    <AutoComplete items={items} value={classInput} onChange={setClassInput} />
  );
};

export default ClassSelect;
