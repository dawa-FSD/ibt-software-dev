import { useCartStore } from "../cart/cartStore";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);

  const count = items.reduce((total, item) => total + item.quantity, 0);

  return <span className="cart-badge">🛒 Cart ({count})</span>;
}
