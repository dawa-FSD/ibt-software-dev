import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import Dish from "./Dish";

function Menu({ addToCart }) {
  const [dishes, setDishes] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

  useEffect(() => {
    fetch("/data/menu.json")
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.error("Menu loading failed:", error));
  }, []);

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section className="menu-page">
      <div className="page-heading">
        <span>Our Menu</span>

        <h1>Choose Your Favorite</h1>

        <p>Explore our selection of fresh and delicious meals.</p>
      </div>

      <CategoryBar />

      <div className="menu-grid">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} onAdd={addToCart} />
          ))
        ) : (
          <div className="empty-state">
            <h2>No dishes found</h2>
            <p>Try another category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
