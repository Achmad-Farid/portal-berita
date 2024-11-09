import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

// Sample article data for each category
const categoryArticles = {
  kategori1: [
    { id: 1, title: "Article 1", content: "Content of article 1" },
    { id: 2, title: "Article 2", content: "Content of article 2" },
  ],
  kategori2: [
    { id: 3, title: "Article 3", content: "Content of article 3" },
    { id: 4, title: "Article 4", content: "Content of article 4" },
  ],
  kategori3: [
    { id: 5, title: "Article 5", content: "Content of article 5" },
    { id: 6, title: "Article 6", content: "Content of article 6" },
  ],
};

function DropdownMenu({ title, setActiveDropdown, activeDropdown, activeCategory, setActiveCategory }) {
  const isActive = activeDropdown === title;
  const articles = categoryArticles[activeCategory] || [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(title)} // Aktifkan dropdown saat mouse masuk
    >
      <Link to="/" className="relative group">
        <h2 className={`cursor-pointer transition-colors duration-200 ${isActive ? "text-primary" : "hover:text-primary"}`}>{title}</h2>
        <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></div>
      </Link>

      {/* Kategori */}
      <div className={`mt-4 w-screen fixed left-1/2 transform -translate-x-1/2 bg-transparent shadow-lg rounded z-10 overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen slide-down" : "max-h-0 slide-up"}`}>
        <div className="mx-auto px-96 flex justify-around bg-neutral-light">
          {["kategori1", "kategori2", "kategori3"].map((cat, index) => (
            <div
              key={index}
              className={`p-2 rounded transition-colors duration-200 ${activeCategory === cat ? "bg-primary text-white" : "hover:bg-neutral-dark hover:text-white"}`}
              onMouseEnter={() => setActiveCategory(cat)} // Set kategori aktif
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-neutral-light mx-auto">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} /> // Gunakan ArticleCard
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
