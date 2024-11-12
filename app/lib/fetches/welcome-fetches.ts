import { UUID } from "crypto";
import { User } from "@/app/lib/definitions/general-definitions";

export async function insertNewUser(user: User, password: string) {
  await fetch(`/api/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, password: password }),
  });
}

export async function fetchUserId(username: string): Promise<UUID | undefined> {
  const response = await fetch(`/api/userids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  });

  const res = await response.json();
  return res;
}
