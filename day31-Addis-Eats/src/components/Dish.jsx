import { Link } from "react-router-dom";

function Dish({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <div className="dish-image">{dish.emoji || "🍽️"}</div>

      <div className="dish-content">
        <span className="dish-category">{dish.category}</span>

        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <div className="dish-bottom">
          <strong>ETB {dish.price}</strong>

          <div className="dish-actions">
            <Link to={`/menu/${dish.id}`} className="details-btn">
              Details
            </Link>

            <button className="add-btn" onClick={() => onAdd(dish)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Dish;
