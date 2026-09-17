import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h2>Your Cart 🛒</h2>

        <p>Your cart is empty.</p>

        <Link to="/products">Browse Food</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart 🛒</h2>

      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div>
              <h3>{item.title}</h3>

              <p>{item.price} ETB each</p>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>−</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <p>Subtotal: {item.price * item.quantity} ETB</p>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: {total.toFixed(2)} ETB</h3>

        <button onClick={clear}>Clear Cart</button>

        <Link to="/checkout">Checkout</Link>
      </div>
    </section>
  );
}
