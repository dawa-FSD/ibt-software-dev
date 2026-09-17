import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    addItem(product);
    alert(`${product.title} added to cart! 🛒`);
  }

  return (
    <article className="food-card">
      <img src={product.image} alt={product.title} />

      <div className="food-card-content">
        <span className="category">{product.category}</span>

        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <p>⭐ {product.rating}</p>

        <h4>{product.price} ETB</h4>

        <div className="card-actions">
          <Link to={`/products/${product.id}`}>View Details</Link>

          <button onClick={handleAddToCart}>Add to Cart 🛒</button>
        </div>
      </div>
    </article>
  );
}
