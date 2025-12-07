import type { User } from "../types/User";

const BASE_URL = "https://gorest.co.in/public/v2";
const TOKEN =
  "5932f83b5b0e84f41a55a4710abcbb1ef068d9d27fd269562fc4100cbcb70e89";

//create user Api
export async function createUserFetch(newUser: Partial<User>) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("error on create user");
  }

  return response.json();
}
