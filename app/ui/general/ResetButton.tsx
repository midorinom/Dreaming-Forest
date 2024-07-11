"use client";
import { useRouter } from "next/navigation";
import { ResetButtonProps } from "@/app/lib/definitions/general-definitions";

export default function ResetButton({ userDetails }: ResetButtonProps) {
  const router = useRouter();

  function handleClick() {
    async function deleteCharacters() {
      const images = [];

      for (const character of userDetails.characters) {
        if (character.image) {
          images.push(character.image);
        }
      }

      if (images.length > 0) {
        await fetch(`/api/character-images`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ characters: userDetails.characters }),
        });
      }

      localStorage.removeItem("userDetails");
      router.replace("/");
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to wipe all your data on this browser?"
    );
    if (confirmDelete) {
      deleteCharacters();
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
