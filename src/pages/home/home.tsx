import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useUserContext();
  return (
    <>
      <div className="box text-center">
        <h1 className="text-3xl font-bold">React App</h1>
        <p className="my-3">App per gestire il tuo utente e i tuoi post</p>

        {user ? (
          <>
            <h2 className="mt-6">Ciao {user.name}!</h2>
            <p className="mb-6">
              Puoi accedere ai dettagli del tuo account qui sotto.
            </p>

            <Link className="button self-center" to={`/user-detail/${user.id}`}>
              Vai al tuo profilo
            </Link>
          </>
        ) : (
          <div>
            Fai il login per vedere i dettagli del tuo profilo oppure registrati
          </div>
        )}
      </div>
    </>
  );
}
