import { Link, Outlet } from "react-router-dom";

function Layout({ cart }) {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Addis Eats
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>

        <div className="cart-badge">🛒 {cart.length}</div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
        <p>Fresh Ethiopian Food · Addis Ababa</p>
      </footer>
    </div>
  );
}

export default Layout;
