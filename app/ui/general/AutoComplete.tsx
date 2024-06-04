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
      console.log("hi");
      console.log(items);
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
        className="input input-bordered w-full text-primary-content"
        value={value}
        onChange={handleOnChange}
        onClick={() => setOpen((prevState) => !prevState)}
        placeholder="Class"
        tabIndex={0}
      />
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
