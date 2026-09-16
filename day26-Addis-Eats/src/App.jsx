import Header from "./Header";
import Dish from "./Dish";

function App() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wat",
      price: 350,
    },
    {
      id: 2,
      name: "Shiro",
      price: 200,
    },
    {
      id: 3,
      name: "Tibs",
      price: 450,
    },
    {
      id: 4,
      name: "Kitfo",
      price: 500,
    },
  ];

  return (
    <div>
      <Header />

      <main>
        <h2>Our Menu</h2>

        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;
