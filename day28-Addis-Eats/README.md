# Addis Eats – Day 28

An interactive Addis Eats food-ordering menu built with React.

## Project Description

Addis Eats is a React application that allows users to browse food by category, add dishes to an order, view the running total in ETB, and provide delivery information using a validated TeleBirr phone number.

This project demonstrates React state, props, controlled forms, event handling, conditional rendering, filtering, and reusable components.

## Requirements Completed

- Added count state to each Dish
- Added an Add button to increase dish quantity
- Lifted category state into Menu
- Created category filter chips
- Highlighted the selected category
- Filtered dishes by category
- Added a running order total in ETB
- Created a controlled delivery form
- Managed form fields using one state object
- Added live TeleBirr phone validation
- Disabled the Place Order button until the form is valid
- Used reusable React components
- Used stable keys when rendering lists

## Features

- Interactive food menu
- Category filtering
- Food quantity counter
- Running order total
- Ethiopian food categories
- Spicy food indicator
- TeleBirr phone validation
- Delivery information form
- Responsive layout

## Technologies

- React
- Vite
- JavaScript
- HTML
- CSS

## Components

| Component         | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `App.jsx`         | Main application layout                    |
| `Menu.jsx`        | Category state, filtering, and order total |
| `CategoryBar.jsx` | Category filter buttons                    |
| `DishList.jsx`    | Renders the filtered dishes                |
| `Dish.jsx`        | Displays a dish and manages quantity       |
| `OrderForm.jsx`   | Controlled delivery form and validation    |
| `data.js`         | Addis Eats menu data                       |

## Menu Categories

- Ethiopian
- Pizza
- Burgers
- Drinks

## Project Structure

```text
day32-Addis-Eats/
├── src/
│   ├── App.jsx
│   ├── Menu.jsx
│   ├── Dish.jsx
│   ├── DishList.jsx
│   ├── CategoryBar.jsx
│   ├── OrderForm.jsx
│   ├── data.js
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## TeleBirr Validation

The delivery form validates the phone number using the following format:

```text
09XXXXXXXX
```

The Place Order button remains disabled until:

- Full name is provided
- Valid TeleBirr number is entered
- Delivery area is provided

## Learning Goals

This exercise demonstrates how to:

- Use `useState`
- Lift state between components
- Pass data using props
- Handle click events
- Filter arrays
- Render lists with `map()`
- Use controlled form inputs
- Validate user input
- Use conditional rendering
- Calculate a running total

## Author

Dawa

## GitHub

Repository: `ibt-software-dev`

Project: `day32-Addis-Eats`
