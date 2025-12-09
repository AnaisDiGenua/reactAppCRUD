import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const { user } = useUserContext();
  return (
    <>
      <div className="home-wrapper">
        <h1>React App</h1>
        <p>App per gestire il tuo utente e i tuoi post</p>

        {user ? (
          <div className="home-logged">
            <h2>Ciao {user.name}!</h2>
            <p>Puoi accedere ai dettagli del tuo account qui sotto.</p>

            <Link className="button" to={`/user-detail/${user.id}`}>
              Vai al tuo profilo
            </Link>
          </div>
        ) : (
          <div>
            Fai il login per vedere i dettagli del tuo profilo oppure registrati
          </div>
        )}
      </div>
    </>
  );
}
