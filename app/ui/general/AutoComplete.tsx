import classNames from "classnames";
import React, { memo, useRef, useState } from "react";

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
  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={classNames({
        "dropdown w-full": true,
        "dropdown-open": open,
      })}
      ref={ref}
    >
      <input
        type="text"
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Class"
        tabIndex={0}
      />
      <div className="dropdown-content bg-base-200 top-14 h-40 overflow-scroll scrollbar-hide flex-col rounded-md">
        <ul
          className="menu bg-secondary"
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
    </div>
  );
};

export default memo(Autocomplete);
