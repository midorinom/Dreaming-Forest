"use client";
import { useRouter } from "next/navigation";

export default function ResetButton() {
  const router = useRouter();

  function handleClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to wipe all your data on this browser?"
    );
    if (confirmDelete) {
      localStorage.removeItem("userDetails");
      router.replace("/");
    }
  }

  return (
    <button
      className="absolute right-4 top-4 btn btn-accent rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Clear Data
    </button>
  );
}
