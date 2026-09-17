import { Link, useNavigate } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  function handleAuth() {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      login();
      navigate("/checkout");
    }
  }

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">🍽️ Addis Eats</Link>
      </div>

      <nav>
        <Link to="/">Home</Link>

        <Link to="/products">Menu</Link>

        <Link to="/cart">
          <CartBadge />
        </Link>

        <Link to="/about">About</Link>

        <button onClick={handleAuth}>{isLoggedIn ? "Logout" : "Login"}</button>
      </nav>
    </header>
  );
}
