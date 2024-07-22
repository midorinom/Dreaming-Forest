"use client";

export default function Pagination() {
  return (
    <div className="join join-vertical my-auto flex -translate-y-[3.5vh] flex-col">
      <input
        className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
        type="radio"
        name="options"
        aria-label=""
        defaultChecked
      />
      <input
        className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
        type="radio"
        name="options"
        aria-label=""
      />
      <input
        className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
        type="radio"
        name="options"
        aria-label=""
      />
      <input
        className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
        type="radio"
        name="options"
        aria-label=""
      />
    </div>
  );
}
