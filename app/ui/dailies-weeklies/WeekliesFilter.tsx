"use client";
import React, { useEffect, useState } from "react";
import AutoComplete from "@/app/ui/general/AutoComplete";
import type { FilterProps } from "@/app/lib/definitions/dailies-weeklies-definitions";

const WeekliesFilter = ({ uniqueDescriptions, setFilter }: FilterProps) => {
  const [filterInput, setFilterInput] = useState<string | "">("");
  const [weeklies, setWeeklies] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const input_id = `weeklies_filter_autocomplete`;
  const dropdown_className = {
    "dropdown w-3/5": true,
    "dropdown mr-5": true,
  };
  const input_className = `grow block h-1/2 rounded-t-lg px-2.5 pb-2 pt-2 w-full text-info text-primary-content bg-neutral border-0 border-b-2 border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-neutral peer`;
  const label_className = `absolute text-base text-info duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`;
  const dropdown_content_className = `dropdown-content bg-base-200 top-[9.5] max-h-40 overflow-scroll scrollbar-hide flex-col rounded-md z-10`;
  const ul_className = `menu bg-accent`;
  const li_className = "border-b border-b-base-content/10 w-full";

  useEffect(() => {
    setWeeklies(uniqueDescriptions);
  }, []);

  useEffect(() => {
    if (!filterInput) {
      setItems(weeklies);
      setFilter("");
      return;
    }

    const newItems = weeklies.filter((p) =>
      p.toLowerCase().startsWith(filterInput.toLowerCase()),
    );
    setItems(newItems);

    setFilter(filterInput);
  }, [weeklies, filterInput]);

  return (
    <AutoComplete
      label={""}
      items={items}
      value={filterInput}
      onChange={setFilterInput}
      input_id={input_id}
      dropdown_className={dropdown_className}
      input_className={input_className}
      label_className={label_className}
      dropdown_content_className={dropdown_content_className}
      ul_className={ul_className}
      li_className={li_className}
      clearableOnlyWhenOpen={false}
    />
  );
};

export default WeekliesFilter;
