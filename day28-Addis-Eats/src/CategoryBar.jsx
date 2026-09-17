function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}{" "}
        </button>
      ))}{" "}
    </div>
  );
}

export default CategoryBar;
