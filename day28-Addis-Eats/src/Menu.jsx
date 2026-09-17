import { useState } from "react";
import dishes from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const handleAdd = (price) => {
    setTotal(total + price);
  };

  return (
    <section>
      {" "}
      <h2>Our Menu</h2>
      ```
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <DishList dishes={filteredDishes} onAdd={handleAdd} />
      <h2>Order Total: {total} ETB</h2>
    </section>
  );
}

export default Menu;
