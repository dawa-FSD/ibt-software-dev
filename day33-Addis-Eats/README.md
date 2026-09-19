# 🍽️ Addis Eats

Addis Eats is a React-based food ordering application that allows users to browse Ethiopian dishes, manage their cart, and complete an order through a checkout form.

This project was built as part of the **IBT College CodeOps Full Stack Software Development Program**.

## 🚀 Features

- Browse Ethiopian food items
- View food details
- Search and filter menu items
- Add items to the cart
- Increase and decrease item quantities
- Remove items from the cart
- View cart total
- Checkout form
- TeleBirr phone number validation
- Delivery area selection
- Optional delivery notes
- Form validation and error messages
- Accessible form fields
- Prevent duplicate order submission
- Loading/submitting feedback
- Order confirmation
- Local storage for persistent cart data

## 🛒 Checkout Form

The checkout form contains four fields:

1. **Name** — required
2. **TeleBirr Phone Number** — required and validated
3. **Delivery Area** — Bole, Kazanchis, Megenagna, or Piassa
4. **Notes** — optional, maximum 200 characters

All form fields are managed using one React state object.

## ✅ Form Validation

Validation is implemented using a pure `validate(form)` function.

The validation checks:

- Name is not empty
- TeleBirr phone number follows the expected format
- Delivery area is valid
- Notes do not exceed 200 characters

Validation errors are derived from the current form values instead of being stored separately in state.

## 👆 Touched Fields & Error Timing

The application tracks touched fields using `onBlur`.

Errors are displayed after the user interacts with and leaves a field.

After an error appears, the user receives a clear message explaining how to correct it.

## ♿ Accessibility

The checkout form uses accessible form feedback:

- Proper `<label>` elements
- `htmlFor` and `id`
- `aria-invalid`
- `aria-describedby`
- `role="alert"`
- Focus management for the first invalid field

Errors are communicated using text and are not dependent only on color.

## 📤 Form Submission

The form uses the form's `onSubmit` handler.

During submission:

- The page does not reload
- The submit button becomes disabled
- A sending message is displayed
- Duplicate submissions are prevented
- The order total is displayed in the button

Normal button:

`Order — 640 ETB`

While submitting:

`Sending your order…`

## ❌ Failed Requests

If an order request fails:

- An error message is displayed
- User-entered values are preserved
- The user can correct the problem
- The user can try submitting again
- The first invalid field can receive focus

The form does not clear the user's information after a failed request.

## 🧠 Technologies Used

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| React           | User interface                  |
| JavaScript      | Application logic               |
| React Router    | Navigation                      |
| CSS             | Styling                         |
| Local Storage   | Cart persistence                |
| React Hook Form | Form management                 |
| Zod             | Schema validation when required |

## 📁 Checkout Structure

```text
src/
├── checkout/
│   ├── Checkout.jsx
│   ├── Field.jsx
│   └── validate.js
│
├── api/
│   └── orders.js
│
├── components/
├── pages/
├── App.jsx
└── main.jsx
```

## 📋 Day 33 Learning Goals

This project demonstrates the main concepts from **Day 33 — Forms & Controlled Components**:

- Controlled form inputs
- One source of truth
- Form submission
- Preventing double submission
- Pure validation functions
- Derived errors
- Touched fields
- Accessible error messages
- Focus management
- Submission states
- React Hook Form
- Schema validation

## 🔐 Validation Principle

Client-side validation provides fast feedback to users.

Server-side validation is still required because browser-side validation cannot be trusted as the final security rule.

## 🎯 Project Goal

The goal of this exercise is to build a reliable and accessible Addis Eats checkout experience where users can:

- Enter their information
- Receive clear validation feedback
- Submit an order safely
- Avoid duplicate submissions
- Keep their information if the request fails

## 📚 Course

**IBT College Toronto, Canada**

**CodeOps — Full Stack Software Development**

**Module 3 — Frontend: React & Next.js**

**Day 33 — Forms & Controlled Components**

## 👨‍💻 Author

**Dawa Asfaw**
