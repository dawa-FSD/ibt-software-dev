import { useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

export default function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);

  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleOrder(event) {
    event.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(`Order placed successfully! 🎉\nTotal: ${total.toFixed(2)} ETB`);

    // Clear cart after successful order
    clear();

    // Go home
    navigate("/");
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleOrder}>
        <label>
          Full Name
          <input type="text" placeholder="Enter your name" required />
        </label>

        <label>
          Phone
          <input type="tel" placeholder="09XXXXXXXX" required />
        </label>

        <label>
          Address
          <textarea placeholder="Enter your address" required />
        </label>

        <label>
          Payment Method
          <select defaultValue="telebirr">
            <option value="telebirr">TeleBirr</option>

            <option value="cash">Cash on Delivery</option>
          </select>
        </label>

        <h3>Total: {total.toFixed(2)} ETB</h3>

        <button type="submit">Place Order 🎉</button>
      </form>
    </section>
  );
}
