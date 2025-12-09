import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./navbar.css";

export default function Nav() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to={`/user-detail/${user.id}`}>Account</Link>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
                navigate("/");
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/user-login">Login</Link>
            <Link to="/user-registration">Registrati</Link>
          </>
        )}
      </nav>
      ;
    </>
  );
}
