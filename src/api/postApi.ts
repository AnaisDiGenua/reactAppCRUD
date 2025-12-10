import type { Post } from "../types/Post";

const BASE_URL = "https://gorest.co.in/public/v2";
const TOKEN =
  "5932f83b5b0e84f41a55a4710abcbb1ef068d9d27fd269562fc4100cbcb70e89";

//get user posts
export async function getUserPostsFetch(userId: number) {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Errore nel recupero dei post");
  }

  const data = await response.json();
  return data;
}

//create new post
export async function createPostFetch(newPost: Partial<Post>) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error(errorBody);
    throw new Error("Errore nella creazione del post");
  }

  const data = await response.json();
  return data;
}

//delete post
export async function deletePostFetch(postId: number) {
  const response = await fetch(
    `https://gorest.co.in/public/v2/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Errore nell'eliminazione del post");
  }
}

//update post
export async function updatePostFetch(
  postId: number,
  payload: { title: string; body: string }
) {
  const response = await fetch(
    `https://gorest.co.in/public/v2/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Errore nell'aggiornamento del post");
  }

  return response.json();
}
