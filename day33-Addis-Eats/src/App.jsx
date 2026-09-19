import { BrowserRouter, Routes, Route } from "react-router-dom";

import Checkout from "./checkout/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <main className="home">
              <h1>🍽️ Addis Eats</h1>

              <p>Welcome to Addis Eats!</p>

              <a href="/checkout">Go to Checkout</a>
            </main>
          }
        />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <main className="not-found">
              <h2>404 - Page Not Found</h2>

              <a href="/checkout">Go to Checkout</a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
