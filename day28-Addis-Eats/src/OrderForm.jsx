import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isValidTeleBirr = /^09\d{8}$/.test(form.phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidTeleBirr) {
      return;
    }

    alert(`Order placed successfully for ${form.name}`);
  };

  return (
    <section className="order-form">
      {" "}
      <h2>Delivery Information</h2>
      ```
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="TeleBirr Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {!form.phone ? null : (
          <p>
            {isValidTeleBirr
              ? "✓ Valid TeleBirr number"
              : "Enter a valid TeleBirr number"}
          </p>
        )}

        <input
          type="text"
          name="area"
          placeholder="Delivery Area"
          value={form.area}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={!isValidTeleBirr || !form.name || !form.area}
        >
          Place Order
        </button>
      </form>
    </section>
  );
}

export default OrderForm;
