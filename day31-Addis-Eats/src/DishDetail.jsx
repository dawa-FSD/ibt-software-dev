import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/menu.json")
      .then((response) => response.json())
      .then((data) => {
        const foundDish = data.find((item) => String(item.id) === String(id));

        setDish(foundDish);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("addisEatsCart") || "[]");

    cart.push(dish);

    localStorage.setItem("addisEatsCart", JSON.stringify(cart));

    alert(`${dish.name} added to cart`);
  };

  if (loading) {
    return <div className="state">Loading...</div>;
  }

  if (!dish) {
    return (
      <div className="state">
        <h2>Dish not found</h2>
        <Link to="/menu" className="primary-btn">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <section className="detail-page">
      <div className="detail-image">{dish.emoji || "🍽️"}</div>

      <div className="detail-content">
        <span className="dish-category">{dish.category}</span>

        <h1>{dish.name}</h1>

        <p className="detail-description">{dish.description}</p>

        <h2>ETB {dish.price}</h2>

        <button className="primary-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <Link to="/menu" className="back-link">
          ← Back to Menu
        </Link>
      </div>
    </section>
  );
}

export default DishDetail;
