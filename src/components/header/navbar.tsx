import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./navbar.css";

export default function Nav() {
  //context
  const { user, logout } = useUserContext();
  //navigation
  const navigate = useNavigate();

  const baseClasses = "px-3 py-1 rounded-md";
  const activeClasses = "bg-gray-100 text-white";

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Home
      </NavLink>

      {user ? (
        <>
          <NavLink
            to={`/user-detail/${user.id}`}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Account
          </NavLink>

          <NavLink
            to={`/users/${user.id}/posts`}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ""}`
            }
          >
            I tuoi post
          </NavLink>

          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate("/");
            }}
            className={baseClasses}
          >
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/user-login"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/user-registration"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Registrati
          </NavLink>
        </>
      )}
    </nav>
  );
}
