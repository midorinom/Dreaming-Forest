import React, { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import type { AutoCompleteProps } from "@/app/lib/definitions/general-definitions";

const Autocomplete = (props: AutoCompleteProps) => {
  const {
    items,
    value,
    onChange,
    input_id,
    dropdown_className,
    input_className,
    label_className,
    dropdown_content_className,
    ul_className,
    li_className,
    label,
    clearableOnlyWhenOpen,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const new_dropdown_className = {
    "dropdown-open": open,
    ...dropdown_className,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    if (!open) {
      setOpen(true);
    }
  }

  function handleClear() {
    onChange("");
    if (open) {
      setOpen(false);
    }
  }

  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={classNames(new_dropdown_className)}
      ref={ref}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          className={input_className}
          id={input_id}
          value={value}
          onChange={handleOnChange}
          onClick={() => setOpen((prevState) => !prevState)}
          placeholder=""
          tabIndex={0}
        />
        <label htmlFor={input_id} className={label_className}>
          {label}
        </label>
        {((clearableOnlyWhenOpen && open) ||
          (!clearableOnlyWhenOpen && value)) && (
          <Image
            src={"/general/ui_icons/clear_icon.png"}
            height={0}
            width={0}
            alt="Clear Icon"
            sizes="100vw"
            className="absolute right-0 h-1/2 w-auto hover:cursor-pointer"
            onClick={handleClear}
          />
        )}
      </div>
      {open && items && items[0] && (
        <div className={dropdown_content_className}>
          <ul
            className={ul_className}
            // use ref to calculate the width of parent
            style={{ width: ref.current?.clientWidth }}
          >
            {items.map((item, index) => {
              return (
                <li
                  key={index}
                  tabIndex={index + 1}
                  onClick={(e: React.MouseEvent) => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={li_className}
                >
                  <button onClick={(e) => e.preventDefault()}>{item}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Autocomplete);
