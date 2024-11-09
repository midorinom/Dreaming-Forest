export async function fetchUserId(username: string) {
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
