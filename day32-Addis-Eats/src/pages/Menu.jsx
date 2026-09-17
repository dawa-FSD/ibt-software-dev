import ProductCard from "../components/ProductCard";

const dishes = [
  {
    id: 1,
    title: "Doro Wat",
    price: 240,
    category: "Ethiopian",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    description: "Traditional Ethiopian spicy chicken stew.",
  },

  {
    id: 2,
    title: "Shiro Wat",
    price: 120,
    category: "Vegetarian",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    description: "Delicious Ethiopian chickpea stew.",
  },

  {
    id: 3,
    title: "Tibs",
    price: 280,
    category: "Ethiopian",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
    description: "Fried Ethiopian beef with vegetables.",
  },

  {
    id: 4,
    title: "Misir Wat",
    price: 110,
    category: "Vegetarian",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    description: "Spicy Ethiopian red lentil stew.",
  },
];

export default function Menu() {
  return (
    <section className="menu">
      <h2>Our Ethiopian Food 🍽️</h2>

      <div className="food-grid">
        {dishes.map((dish) => (
          <ProductCard key={dish.id} product={dish} />
        ))}
      </div>
    </section>
  );
}
