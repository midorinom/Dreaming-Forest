import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { Character } from "../../lib/definitions/general-definitions";

export const runtime = "edge";

export async function PUT(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const imagepath = searchParams.get("imagepath");

  if (!imagepath) {
    return NextResponse.json(
      { error: "imagepath is required" },
      { status: 400 }
    );
  }
  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is required" },
      { status: 400 }
    );
  }

  const blob = await put(imagepath, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}

export async function DELETE(request: Request) {
  const res = await request.json();
  const characters: Character[] = res.characters;
  const images = [];

  for (const character of characters) {
    if (character.image) {
      images.push(character.image);
    }
  }

  await del(images);
}
