import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to Addis Eats 🍽️</h1>

      <p>Taste the best Ethiopian food delivered to your door.</p>

      <Link to="/products">Order Now</Link>
    </main>
  );
}
