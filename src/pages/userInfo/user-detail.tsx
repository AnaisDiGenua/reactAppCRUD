import { useEffect, useState } from "react";
import {
  deleteUserFetch,
  getUserFetch,
  updateUserFetch,
} from "../../api/userApi";
import UserForm from "../../components/form/userForm";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import type { User } from "../../types/User";
import "./user-detail.css";

export default function UserDetail() {
  //UseState
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>();
  //Context
  const { user, setUser } = useUserContext();
  //Navigation
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();

  //Load user data
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await getUserFetch(userId);
        setUser(response);
        setLocalUser(response);
      } catch {
        console.error("Error on loading user");
      }
    }

    loadUser();
  }, [userId, setUser]);

  //update data
  async function handleUpdate() {
    if (!localUser) return;
    try {
      const updated = await updateUserFetch(localUser.id, localUser);
      setUser(updated);
      setLocalUser(updated);
      setIsEditing(false);

      alert("Utente aggiornato con successo");
    } catch {
      alert("Errore durante l'aggiornamento");
    }
  }

  //delete user
  async function handleDelete() {
    if (!user) return;

    const ok = confirm("Sei sicuro di voler eliminare questo utente?");
    if (!ok) return;

    try {
      await deleteUserFetch(user.id);
      setUser(null);
      navigate("/");
    } catch {
      alert("Errore durante l'eliminazione");
    }
  }

  if (!localUser) return <p>Caricamento...</p>;

  return (
    <div className="main-wrapper">
      <div className="column-box">
        <div className="column-box-header">
          <h2>Dati Utente</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="button"
            >
              Modify
            </button>
          )}
        </div>

        <UserForm
          userData={localUser}
          readonly={!isEditing}
          onChange={(field, value) =>
            setLocalUser((prev) => (prev ? { ...prev, [field]: value } : prev))
          }
          onSubmit={handleUpdate}
        />
      </div>

      <div className="column-box">
        <h2>Danger zone</h2>
        <p>Una volta eliminato l'uente non si può recuperare l'account</p>

        <button
          type="button"
          onClick={handleDelete}
          className="button delete-user"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
