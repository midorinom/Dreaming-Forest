"use client";
import { useRouter } from "next/navigation";
import { ResetButtonProps } from "@/app/lib/definitions/general-definitions";
import { deleteCharacterImages } from "@/app/upload-image/route";

export default function ResetButton({ userDetails }: ResetButtonProps) {
  const router = useRouter();

  function handleClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to wipe all your data on this browser?"
    );
    if (confirmDelete) {
      deleteCharacterImages(userDetails.characters);
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
