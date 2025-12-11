import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFetch } from "../../api/userApi";
import { useUserContext } from "../../context/userContext";
import "./user-login.css";

export default function UserLogin() {
  //useState
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  //context
  const { setUser } = useUserContext();
  //navigation
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("Inserisci un ID utente");
      return;
    }
    try {
      const user = await getUserFetch(Number(id));
      setError("");
      setUser(user);
      navigate(`/`);
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

        <div className="flex justify-end mt-4">
          <button type="submit" className="button">
            Login
          </button>
        </div>

        {error && <p className="logged-msg">{error}</p>}
      </form>
    </div>
  );
}
