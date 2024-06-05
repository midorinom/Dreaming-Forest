import classNames from "classnames";
import React, { memo, useRef, useState, useEffect } from "react";

type Props = {
  items: string[];
  value: string;
  onChange(val: string): void;
};

// Dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {
  const { items, value, onChange } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

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

  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={classNames({
        "dropdown w-4/5": true,
        "dropdown-open": open,
      })}
      ref={ref}
    >
      <input
        type="text"
        className="grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-base text-primary-content bg-neutral dark:bg-neutral border-0 border-b-2 border-accent appearance-none dark:text-primary-content dark:border-accent dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
        id="class_input"
        value={value}
        onChange={handleOnChange}
        onClick={() => setOpen((prevState) => !prevState)}
        placeholder=""
        tabIndex={0}
      />
      <label
        htmlFor="class_input"
        className={`absolute text-base text-accent dark:text-accent duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"`}
      >
        Class
      </label>
      {open && items && items[0] && (
        <div className="dropdown-content bg-base-200 top-14 max-h-40 overflow-scroll scrollbar-hide flex-col rounded-md">
          <ul
            className="menu bg-accent"
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
                  className="border-b border-b-base-content/10 w-full"
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
