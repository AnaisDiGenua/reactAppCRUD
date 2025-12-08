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

//get user Api
export async function getUserFetch(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  if (!response.ok) {
    throw new Error("error on get user");
  }

  return response.json();
}

// update user Api
export async function updateUserFetch(
  id: number,
  updatedData: Partial<User>
): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("error on update user");
  }

  return response.json();
}

//delete user Api
export async function deleteUserFetch(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("error on delete user");
  }
}
