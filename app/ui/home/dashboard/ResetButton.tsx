"use client";

export default function ResetButton() {
  function handleClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to wipe all your data on this browser?"
    );
    if (confirmDelete) {
      localStorage.removeItem("userDetails");
      window.location.reload();
    }
  }

  return (
    <button
      className="absolute right-4 bottom-4 btn btn-accent rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Clear Data
    </button>
  );
}
