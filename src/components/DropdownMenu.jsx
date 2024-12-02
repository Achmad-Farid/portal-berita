import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function DropdownMenu({ title, setActiveDropdown, activeDropdown, activeCategory, setActiveCategory }) {
  const [itemsPerRow, setItemsPerRow] = useState(4); // Default jumlah artikel
  const isActive = activeDropdown === title;
  const { tagArticles, tagLoading, tagError } = useSelector((state) => state.articles);
  const articles = tagArticles[activeCategory] || [];
  const tags = tagArticles ? Object.keys(tagArticles).map((key) => key.toLocaleLowerCase()) : [];
  const navigate = useNavigate();

  // Perbarui jumlah artikel berdasarkan lebar layar
  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerRow(4); // Untuk layar besar
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(3); // Untuk layar sedang
      } else if (window.innerWidth >= 640) {
        setItemsPerRow(2); // Untuk layar kecil
      } else {
        setItemsPerRow(1); // Untuk layar sangat kecil
      }
    };

    updateItemsPerRow(); // Panggil saat komponen dimuat
    window.addEventListener("resize", updateItemsPerRow); // Dengarkan perubahan ukuran layar

    return () => window.removeEventListener("resize", updateItemsPerRow); // Bersihkan event listener
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(title)} // Aktifkan dropdown saat mouse masuk
    >
      <div onClick={() => navigate(`/tema/${title}`)} className="relative group">
        <h2 className={`cursor-pointer transition-colors duration-200 ${isActive ? "text-primary" : "hover:text-primary"}`}>{title}</h2>
        <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></div>
      </div>

      <div className={`fixed left-1/2 transform -translate-x-1/2 w-screen z-10 bg-transparent shadow-lg rounded overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen slide-down" : "max-h-0 slide-up"} mt-4`}>
        <div className="flex justify-around px-96 mx-auto bg-neutral-light">
          {tags.map((cat, index) => (
            <div
              onClick={() => navigate(`/tema/${cat}`)}
              key={index}
              className={`p-2 rounded transition-colors duration-200 ${activeCategory === cat ? "bg-primary text-white" : "hover:bg-neutral-dark hover:text-white"}`}
              onMouseEnter={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>

        {/* Bagian artikel */}
        <div className="grid gap-4 p-4 mx-auto bg-neutral-light grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.slice(0, itemsPerRow).map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
