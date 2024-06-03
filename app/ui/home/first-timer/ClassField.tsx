"use client";

export default function ClassField() {
  return (
    <label className="input input-bordered flex items-center gap-2 col-start-2 row-start-3 w-4/5">
      Class
      <input type="text" className="grow" />
    </label>
  );
}
