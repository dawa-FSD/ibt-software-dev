import { useState } from "react";

function Checkout() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("addisEatsCart") || "[]"),
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !phone || !area) {
      alert("Please complete all fields.");
      return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("addisEatsCart");
    setCart([]);
  };

  return (
    <section className="checkout-page">
      <div className="checkout-info">
        <span>Checkout</span>

        <h1>Complete Your Order</h1>

        <div className="order-list">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="order-item" key={`${item.id}-${index}`}>
                <span>{item.name}</span>
                <strong>ETB {item.price}</strong>
              </div>
            ))
          )}
        </div>

        <div className="total">
          <span>Total</span>
          <strong>ETB {total}</strong>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Delivery Information</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09XXXXXXXX"
        />

        <label>Area</label>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Addis Ababa area"
        />

        <button type="submit" className="primary-btn full">
          Order with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default Checkout;
