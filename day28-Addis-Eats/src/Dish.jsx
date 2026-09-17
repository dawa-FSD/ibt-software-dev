import { useState } from "react";

function Dish({ dish, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    onAdd(dish.price);
  };

  return (
    <div className="dish">
      {" "}
      <h3>{dish.name}</h3> <p>{dish.price} ETB</p>
      {dish.spicy && <span>🌶️ Spicy</span>}{" "}
      <button onClick={handleAdd}>Add</button> <p>Quantity: {count}</p>{" "}
    </div>
  );
}

export default Dish;
