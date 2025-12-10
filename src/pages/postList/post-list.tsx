import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getUserPostsFetch,
  createPostFetch,
  deletePostFetch,
  updatePostFetch,
} from "../../api/postApi";
import type { Post } from "../../types/Post";
import Modal from "../../components/modal/modal";
import "./post-list.css";

export default function UserPosts() {
  //useState
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  //Navigation
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const data = await getUserPostsFetch(userId);
        setError(null);
        setPosts(data);
      } catch {
        setError("Impossibile caricare i post");
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

      const newPost = await createPostFetch({
        user_id: userId,
        title: newTitle,
        body: newBody,
      });
      setError(null);
      setPosts((prev) => [newPost, ...prev]);
      setNewTitle("");
      setNewBody("");
      toast.success("Post creato");
    } catch {
      setError("Errore nella creazione del post");
    } finally {
      setIsLoading(false);
      setIsVisibleCreate(false);
    }
  }

  async function handleDeletePost(postId: number) {
    try {
      await deletePostFetch(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success("Post eliminato con successo");
    } catch {
      toast.error("Errore durante l'eliminazione del post");
    }
  }

  function handleStartEdit(post: Post) {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  }

  async function handleSaveEdit(postId: number) {
    try {
      const updatedPost = await updatePostFetch(postId, {
        title: editTitle,
        body: editBody,
      });
      setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
      setEditingPostId(null);
    } catch {
      toast.error("Errore durante la modifica del post");
    }
  }

  if (isLoading) return <div className="box">Caricamento...</div>;
  if (error)
    return (
      <div className="box">
        <p className="error-message">{error}</p>
      </div>
    );

  return (
    <div id="post-list">
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
            <button className="button" onClick={() => setIsVisibleCreate(true)}>
              Crea post
            </button>
          )}
        </div>

        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <div className="flex justify-between items-center">
                  <h3 className="post-title">{post.title}</h3>

                  <div className="flex gap-2">
                    {editingPostId === post.id ? (
                      <>
                        <button
                          className="button button-sm"
                          onClick={() => handleSaveEdit(post.id)}
                        >
                          Salva
                        </button>
                        <button
                          className="button button-sm delete-user"
                          onClick={() => setEditingPostId(null)}
                        >
                          Annulla
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button button-sm"
                          onClick={() => handleStartEdit(post)}
                        >
                          Modifica
                        </button>
                        <button
                          className="button button-sm delete-user"
                          onClick={() => setOpenDeleteModal(post.id)}
                        >
                          Elimina
                        </button>
                        <Modal
                          open={openDeleteModal === post.id}
                          title="Conferma eliminazione"
                          paragraph="Sei sicuro di voler eliminare questo post?"
                          onClose={() => setOpenDeleteModal(null)}
                          onClickDelete={() => {
                            handleDeletePost(post.id);
                            setOpenDeleteModal(null);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {editingPostId === post.id ? (
                  <div className="edit-form">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                    />
                  </div>
                ) : (
                  <p className="post-body">{post.body}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Inizia a creare i tuoi post</p>
        )}
      </section>
    </div>
  );
}
