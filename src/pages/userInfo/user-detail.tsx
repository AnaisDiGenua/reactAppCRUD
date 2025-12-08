import { useEffect } from "react";
import { getUserFetch } from "../../api/userApi";
import UserForm from "../../components/form/userForm";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./user-detail.css";

export default function UserDetail() {
  const { id } = useParams();
  const userId = Number(id);

  const { user, setUser } = useUserContext();

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserFetch(userId);
        setUser(data);
      } catch {
        console.error("Errore on loading user");
      }
    }

    loadUser();
  }, [userId, setUser]);

  if (!user) return <p>Caricamento...</p>;

  return (
    <div className="main-wrapper">
      <div className="column-box">
        <h2>Info account</h2>

        <UserForm userData={user} readonly={true} />
      </div>
    </div>
  );
}
