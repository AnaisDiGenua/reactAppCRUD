import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPostsFetch, createPostFetch } from "../../api/postApi";
import type { Post } from "../../types/Post";
import "./post-list.css";

export default function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);

  const { id } = useParams();
  const userId = Number(id);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserPostsFetch(userId);
        setPosts(data);
      } catch (e) {
        setError("Impossibile caricare i post");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isNaN(userId)) {
      loadPosts();
    }
  }, [userId]);

  async function handleCreatePost() {
    try {
      setIsLoading(true);
      setError(null);

      const newPost = await createPostFetch({
        user_id: userId,
        title: newTitle,
        body: newBody,
      });

      setPosts((prev) => [newPost, ...prev]);

      setNewTitle("");
      setNewBody("");
      alert("Post creato");
    } catch (e) {
      setError("Errore nella creazione del post");
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsVisibleCreate(false);
    }
  }

  const handleCreateButton = () => {
    setIsVisibleCreate(true);
  };

  return (
    <div id="post-list">
      {isLoading && <p className="loading">Caricamento...</p>}
      {error && <p className="error-message">{error}</p>}

      {isVisibleCreate && (
        <section className="box box-lg">
          <h2>Crea un nuovo post</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}
          >
            <label htmlFor="post-title">Titolo</label>
            <input
              id="post-title"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <label htmlFor="post-body">Testo</label>
            <textarea
              id="post-body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="button"
                disabled={!newTitle || !newBody}
              >
                Crea post
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setIsVisibleCreate(false)}
              >
                Annulla
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="box box-lg">
        <div className="flex justify-between mb-6">
          <h2>Tutti i tuoi post</h2>

          {!isVisibleCreate && (
            <button className="button" onClick={handleCreateButton}>
              Crea post
            </button>
          )}
        </div>

        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="flex justify-between items-center">
                <h3 className="post-title">{post.title}</h3>

                <div className="flex gap-2">
                  <button
                    className="button button-sm"
                    onClick={() => console.log("Modifica", post.id)}
                  >
                    Modifica
                  </button>

                  <button
                    className="button button-sm delete-user"
                    onClick={() => console.log("Elimina", post.id)}
                  >
                    Elimina
                  </button>
                </div>
              </div>

              <p className="post-body">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
