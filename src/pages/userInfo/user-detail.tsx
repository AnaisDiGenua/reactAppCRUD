import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteUserFetch,
  getUserFetch,
  updateUserFetch,
} from "../../api/userApi";
import UserForm from "../../components/form/userForm";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import type { User } from "../../types/User";
import Modal from "../../components/modal/modal";

export default function UserDetail() {
  //UseState
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  //Context
  const { user, setUser, logout } = useUserContext();
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

      toast.success("Utente aggiornato con successo");
    } catch {
      toast.error("Errore durante l'aggiornamento");
    }
  }

  //delete user
  async function handleDelete() {
    if (!user) return;

    try {
      await deleteUserFetch(user.id);
      logout();
      navigate("/");
    } catch {
      toast.error("Errore durante l'eliminazione");
    }
  }

  if (!localUser) return <div className="box">Caricamento...</div>;

  return (
    <div>
      <div className="box">
        <div className="flex justify-between">
          <h2>Dati Utente</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="button"
            >
              Modifica
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

      <div className="box flex flex-col">
        <h2>Danger zone</h2>
        <p>Una volta eliminato l'uente non si può recuperare l'account</p>

        <button
          type="button"
          onClick={() => setOpenDeleteModal(true)}
          className="button delete-user self-end"
        >
          Elimina
        </button>

        <Modal
          open={openDeleteModal}
          title="Conferma eliminazione"
          onClose={() => setOpenDeleteModal(false)}
          paragraph="Sei sicuro di voler eliminare questo utente?"
          onClickDelete={() => {
            setOpenDeleteModal(false);
            handleDelete();
          }}
        ></Modal>
      </div>
    </div>
  );
}
