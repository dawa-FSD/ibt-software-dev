import { useSearchParams } from "react-router-dom";

function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "All";

  const categories = ["All", "Ethiopian", "Pizza", "Burgers", "Drinks"];

  const handleCategory = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category ? "category active" : "category"
          }
          onClick={() => handleCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
