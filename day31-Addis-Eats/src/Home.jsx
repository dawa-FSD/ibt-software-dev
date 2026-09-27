import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">Welcome to Addis Eats</span>

        <h1>
          Delicious Food
          <br />
          From Addis to You
        </h1>

        <p>
          Discover delicious Ethiopian dishes, pizzas, burgers and drinks
          delivered to your door.
        </p>

        <Link to="/menu" className="primary-btn">
          Explore Menu
        </Link>
      </div>

      <div className="hero-card">
        <div className="hero-food">🍛</div>
        <h3>Authentic Ethiopian Taste</h3>
        <p>Freshly prepared with love.</p>
      </div>
    </section>
  );
}

export default Home;
