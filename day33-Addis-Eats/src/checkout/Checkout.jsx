import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validate } from "./validate";
import Field from "./Field";
import { placeOrder } from "../api/orders";

export default function Checkout() {
  const navigate = useNavigate();

  // One state object for the whole form
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Touched fields
  const [touched, setTouched] = useState({});

  // Submitting state
  const [submitting, setSubmitting] = useState(false);

  // Server error
  const [serverError, setServerError] = useState("");

  // Derive validation errors
  const errors = validate(form);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setServerError("");
  }

  // Handle blur
  function handleBlur(e) {
    const { name } = e.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent double submission
    if (submitting) return;

    // Make all fields touched
    const allTouched = {
      name: true,
      phone: true,
      area: true,
      notes: true,
    };

    setTouched(allTouched);

    // Validate
    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];

      document.getElementById(firstError)?.focus();

      return;
    }

    // Start submitting
    setSubmitting(true);
    setServerError("");

    try {
      const order = await placeOrder(form);

      console.log("Order created:", order);

      alert("Order placed successfully! 🎉");

      navigate("/");
    } catch (error) {
      console.error(error);

      setServerError(
        error.message || "Something went wrong. Please try again.",
      );

      const firstError = Object.keys(errors)[0];

      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      {/* Server Error */}
      {serverError && (
        <div role="alert" className="server-error">
          ⚠ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* NAME */}
        <Field
          label="Your Name"
          id="name"
          error={touched.name ? errors.name : ""}
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />
        </Field>

        {/* PHONE */}
        <Field
          label="TeleBirr Phone Number"
          id="phone"
          error={touched.phone ? errors.phone : ""}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0911223344"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={
              touched.phone && errors.phone ? "phone-error" : undefined
            }
          />
        </Field>

        {/* DELIVERY AREA */}
        <Field
          label="Delivery Area"
          id="area"
          error={touched.area ? errors.area : ""}
        >
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && !!errors.area}
            aria-describedby={
              touched.area && errors.area ? "area-error" : undefined
            }
          >
            <option value="Bole">Bole</option>

            <option value="Kazanchis">Kazanchis</option>

            <option value="Megenagna">Megenagna</option>

            <option value="Piassa">Piassa</option>
          </select>
        </Field>

        {/* NOTES */}
        <Field
          label="Notes (Optional)"
          id="notes"
          error={touched.notes ? errors.notes : ""}
        >
          <textarea
            id="notes"
            name="notes"
            rows="4"
            maxLength={200}
            placeholder="Any delivery instructions?"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.notes && !!errors.notes}
            aria-describedby={
              touched.notes && errors.notes ? "notes-error" : undefined
            }
          />

          <small>{form.notes.length}/200</small>
        </Field>

        {/* SUBMIT BUTTON */}
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending your order..." : "Order — 640 ETB"}
        </button>
      </form>
    </section>
  );
}
