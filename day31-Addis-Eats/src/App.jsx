import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./components/Menu";
import DishDetail from "./DishDetail";
import Checkout from "./Checkout";
import SignIn from "./SignIn";
import NotFound from "./NotFound";
import RequireAuth from "./auth/RequireAuth";

function App() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("addisEatsCart") || "[]"),
  );

  const addToCart = (dish) => {
    const updatedCart = [...cart, dish];

    setCart(updatedCart);

    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cart={cart} />}>
          <Route index element={<Home />} />

          <Route
            path="menu"
            element={<Menu cart={cart} addToCart={addToCart} />}
          />

          <Route path="menu/:id" element={<DishDetail />} />

          <Route path="signin" element={<SignIn />} />

          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
