"use client";

export default function LevelField() {
  return (
    <label className="input input-bordered flex items-center gap-2 col-start-2 row-start-2 w-1/3">
      Lv
      <input type="text" className="grow" />
    </label>
  );
}
