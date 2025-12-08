import { Link } from "react-router-dom";
import "./navbar.css";

export default function Nav() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <a>Login</a>
        <Link to="/user-registration">Registrati</Link>
        <Link to="/user-detail">Account</Link>
      </nav>
    </>
  );
}
