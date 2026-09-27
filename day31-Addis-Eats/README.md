# Addis Eats — Day 31

A React food-ordering application built as part of the CodeOps Full Stack Software Development program at IBT College Canada.

## Project Overview

Addis Eats is a food-ordering application featuring Ethiopian food, pizza, burgers, and drinks.

This version focuses on client-side routing and navigation using React Router.

## Features

- React Router navigation
- Shared Layout component
- Nested routes
- Home landing page
- Menu page
- Individual dish detail pages
- Dynamic `menu/:id` routes
- Category filtering with URL query strings
- Persistent cart using localStorage
- Sign-in page
- Protected checkout route
- Authentication guard with `RequireAuth`
- Redirect back to checkout after sign-in
- 404 Not Found page
- Responsive CSS design
- ETB pricing

## Routes

| Route                      | Description             |
| -------------------------- | ----------------------- |
| `/`                        | Home page               |
| `/menu`                    | Full menu               |
| `/menu?category=Ethiopian` | Filter Ethiopian dishes |
| `/menu?category=Pizza`     | Filter pizza            |
| `/menu/:id`                | Individual dish         |
| `/signin`                  | Sign-in page            |
| `/checkout`                | Protected checkout      |
| `*`                        | Not Found               |

## React Router Concepts

This project demonstrates:

- `BrowserRouter`
- `Routes`
- `Route`
- Nested routes
- `Outlet`
- `Link`
- `Navigate`
- `useParams`
- `useSearchParams`
- `useLocation`
- `useNavigate`

## Authentication

The checkout page is protected with `RequireAuth`.

When a user tries to access:

```text
/checkout
```

without being signed in, the application redirects them to:

```text
/signin
```

After signing in, the user is returned to the checkout page.

The demo authentication state is stored in:

```text
localStorage
```

using:

```text
isLoggedIn
```

## Cart

The shopping cart is stored in browser localStorage using:

```text
addisEatsCart
```

This allows the cart to survive navigation between different routes.

## Technologies

- React
- React Router DOM
- JavaScript
- HTML
- CSS
- Vite
- localStorage
- JSON

## Installation

Clone or download the project and open the project folder.

Install dependencies:

```bash
npm install
```

Install React Router:

```bash
npm install react-router-dom
```

## Run the Project

```bash
npm run dev
```

Open the local development URL shown in the terminal.

## Project Structure

```text
src/
├── auth/
│   └── RequireAuth.jsx
├── components/
│   ├── CategoryBar.jsx
│   ├── Dish.jsx
│   └── Menu.jsx
├── App.jsx
├── Layout.jsx
├── Home.jsx
├── DishDetail.jsx
├── Checkout.jsx
├── SignIn.jsx
├── NotFound.jsx
├── main.jsx
└── index.css
```

## Learning Objectives

The main objective of Day 28 is to route the Addis Eats application across real screens.

The project demonstrates how to:

1. Create a shared application layout.
2. Build nested routes.
3. Create dynamic routes with URL parameters.
4. Read route parameters with `useParams`.
5. Store filters in the URL query string.
6. Read and update query parameters with `useSearchParams`.
7. Preserve cart data while navigating.
8. Protect a route using an authentication guard.
9. Redirect unauthenticated users to sign in.
10. Return users to their original destination after authentication.

## Author

Dawa

## Course

CodeOps · Full Stack Software Development

IBT College Canada

## License

This project is created for educational purposes.
