import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFetch } from "../../api/userApi";
import { useUserContext } from "../../context/userContext";
import "./user-login.css";

export default function UserLogin() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!id) {
      setError("Inserisci un ID utente");
      return;
    }

    try {
      const user = await getUserFetch(Number(id));
      setUser(user);
      navigate(`/user-detail/${user.id}`);
    } catch {
      setError("Utente non trovato");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="login-id">ID utente</label>

        <input
          id="login-id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Inserisci ID"
        />

        <button type="submit" className="button">
          Login
        </button>

        {error && <p className="logged-msg">{error}</p>}
      </form>
    </div>
  );
}
