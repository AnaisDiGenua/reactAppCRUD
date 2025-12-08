import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./navbar.css";

export default function Nav() {
  const { user } = useUserContext();

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {!user && (
          <>
            <a>Login</a>
            <Link to="/user-registration">Registrati</Link>
          </>
        )}
        {user && (
          <>
            <Link to={`/user-detail/${user.id}`}>Account</Link>
          </>
        )}
      </nav>
      ;
    </>
  );
}
