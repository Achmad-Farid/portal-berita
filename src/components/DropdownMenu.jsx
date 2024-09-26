import { Link } from "react-router-dom";

// Sample article data for each category
const categoryArticles = [
  { id: 1, title: "Article 1", content: "Content of article 1" },
  { id: 2, title: "Article 2", content: "Content of article 2" },
  { id: 3, title: "Article 3", content: "Content of article 3" },
  { id: 4, title: "Article 4", content: "Content of article 4" },
  { id: 5, title: "Article 5", content: "Content of article 5" },
  { id: 6, title: "Article 6", content: "Content of article 6" },
  { id: 7, title: "Article 7", content: "Content of article 7" },
  { id: 8, title: "Article 8", content: "Content of article 8" },
  { id: 9, title: "Article 9", content: "Content of article 9" },
];

function DropdownMenu({ title, on }) {
  const isActive = title && on;

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(dropdownKey)} // Set active dropdown when mouse enters
      onMouseLeave={() => setActiveDropdown(null)} // Reset to default when mouse leaves
    >
      <Link to="/" className="relative group">
        {/* h2 will maintain hover effect when the dropdown is active */}
        <h2 className={`cursor-pointer transition-colors duration-200 ${isActive ? "text-primary" : "hover:text-primary"}`}>{title}</h2>
        <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></div>
      </Link>

      {/* Dropdown */}
      <div className={`mt-4 w-screen fixed left-1/2 transform -translate-x-1/2 bg-transparent shadow-lg rounded z-10 overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen slide-down" : "max-h-0 slide-up"}`}>
        <div className="mx-auto px-96 flex justify-around bg-neutral-light">
          {["kategori1", "kategori2", "kategori3"].map((cat, index) => (
            <Link key={index} to={`/${cat}`} className={`p-2 rounded transition-colors duration-200 ${isActive === cat ? "bg-primary text-white" : "hover:bg-neutral-dark hover:text-white"}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
