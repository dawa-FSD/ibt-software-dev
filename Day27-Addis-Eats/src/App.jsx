import { useState } from "react";
import Menu from "./Menu";

function App() {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <header>
        <h1>Addis Eats</h1>
        <p>Delicious Ethiopian Food</p>
      </header>

      <main>
        <h2>Our Menu</h2>

        <div className="categories">
          <button onClick={() => setCategory("All")}>All</button>

          <button onClick={() => setCategory("Ethiopian")}>Ethiopian</button>

          <button onClick={() => setCategory("Pizza")}>Pizza</button>

          <button onClick={() => setCategory("Burger")}>Burger</button>
        </div>

        <Menu category={category} />
      </main>
    </div>
  );
}

export default App;
