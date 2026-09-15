import Dish from "./Dish";
import dishes from "./data";

function Menu({ category }) {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (filteredDishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <div>
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </div>
  );
}

export default Menu;
