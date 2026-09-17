import Dish from "./Dish";

function DishList({ dishes, onAdd }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} />
      ))}{" "}
    </div>
  );
}

export default DishList;
