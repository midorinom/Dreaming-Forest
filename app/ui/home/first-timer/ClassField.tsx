"use client";
import { memo, useState, Suspense } from "react";
import ClassSelect from "./ClassSelect";

function ClassField() {
  const [classInput, setClassInput] = useState("");

  return (
    <div className="relative col-start-2 row-start-3 w-4/5">
      {/* <input
        type="text"
        id="class_input"
        className="grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-base text-primary-content bg-neutral dark:bg-neutral border-0 border-b-2 border-accent appearance-none dark:text-primary-content dark:border-accent dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
        placeholder=""
        maxLength={12}
      />
      <label
        htmlFor="class_input"
        className="absolute text-base text-accent dark:text-accent duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Class
      </label> */}
      <ClassSelect />
    </div>
  );
}

export default memo(ClassField);
