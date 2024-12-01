"use client";
import { useRouter } from "next/navigation";
import { ResetButtonProps } from "@/app/lib/definitions/settings-definitions";
import { deleteImages } from "@/app/lib/functions/utility-functions";

export default function ResetButton({ user }: ResetButtonProps) {
  const router = useRouter();

  function handleClick() {
    const isLoggedIn: boolean = user.username ? true : false;
    let confirmMessage: string = isLoggedIn
      ? "Are you sure you want to log out?"
      : "Are you sure you want to wipe all your data on this browser?";

    const confirm = window.confirm(confirmMessage);

    if (confirm) {
      if (!isLoggedIn) {
        deleteCharacters();
      }

      localStorage.removeItem("user");
      router.replace("/");
    }

    async function deleteCharacters() {
      const images = [];

      for (const character of user.characters) {
        if (character.image) {
          images.push(character.image);
        }
      }

      if (images.length > 0) {
        deleteImages(user.characters);
      }
    }
  }

  return (
    <button
      className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      {user.username ? "Log Out" : "Clear Data"}
    </button>
  );
}
