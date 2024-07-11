import { put, del } from "@vercel/blob";
import { CharacterDetails } from "../../lib/definitions/general-definitions";

export const runtime = "edge";

export async function PUT(pathname: string, file: File) {
  const { url } = await put(pathname, file, { access: "public" });
  return url;
}

export async function DELETE(characters: CharacterDetails[]) {
  const images = [];

  for (const character of characters) {
    if (character.image) {
      images.push(character.image);
    }
  }

  await del(images);
  console.log(new Response());
}
