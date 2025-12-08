import { useEffect, useState } from "react";
import { getUserFetch } from "../../api/userApi";
import type { User } from "../../types/User";

export default function UserDetail() {
  const userId = 8229197;

  const [user, setUser] = useState<User | null>(null);

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
  }, []);

  if (!user) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Info account</h2>

      <p>
        <b>ID:</b> {user.id}
      </p>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Gender:</b> {user.gender}
      </p>
      <p>
        <b>Status:</b> {user.status}
      </p>
    </div>
  );
}
