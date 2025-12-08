import { useState } from "react";
import type { User } from "../../types/User";
import { createUserFetch } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/form/userForm";
import { useUserContext } from "../../context/userContext";
import "./user-registration.css";

export default function UserRegistration() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const { setUser } = useUserContext();

  const handleFieldChange = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    try {
      const response = await createUserFetch(newUser);
      setUser(response);
      alert("Utente creato");
      navigate(`/user-detail/${response.id}`);
    } catch {
      alert("Errore durante la registrazione");
    }
  };

  return (
    <div className="create-box">
      <h2>Registrati</h2>

      <UserForm
        userData={newUser}
        readonly={false}
        onChange={handleFieldChange}
        onSubmit={handleCreate}
        submitLabel="Crea Utente"
      />
    </div>
  );
}
