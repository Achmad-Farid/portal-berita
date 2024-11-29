import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import defaultProfileImage from "../assets/default-profile.png";
import { fetchArticlesByCategory } from "../redux/actions/articleAction";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const tema = ["Nasional", "Internasional", "Ekonomi", "Teknologi", "Olahraga", "Hiburan", "Gaya Hidup", "Otomotif"];

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { tagArticles, tagLoading, tagError } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tagArticles) {
      const firstKey = Object.keys(tagArticles)[0];
      setActiveCategory(firstKey);
    }
  }, [tagArticles]);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search/${searchValue.trim()}`);
    }
  };

  // Function to handle category hover
  const handleCategoryHover = (tema) => {
    const lowerCaseTema = tema.toLowerCase();
    dispatch(fetchArticlesByCategory(lowerCaseTema));
  };
  return (
    <nav className="flex gap-2 bg-white justify-between container mx-auto p-4 text-base" onMouseLeave={() => setActiveDropdown(null)}>
      <div className="flex gap-2">
        <h1 className="self-center cursor-pointer hover:scale-105 transition-transform duration-200">Logo</h1>
        <div className="flex ml-5 gap-3 self-center">
          <Link to="/" className="relative group">
            <h2 className="cursor-pointer hover:text-primary transition-colors duration-200">Home</h2>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></div>
          </Link>
          {tema.map((title) => (
            <div
              key={title}
              className="cursor-pointer"
              onMouseEnter={() => handleCategoryHover(title)} // Call handleCategoryHover on hover
            >
              <DropdownMenu setActiveDropdown={setActiveDropdown} activeDropdown={activeDropdown} title={title} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
          ))}
        </div>
        <div className="flex ml-5 items-center">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-4 py-1 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 w-full rounded-r-none focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-1 bg-secondary-blue text-neutral-dark rounded-r-md border border-secondary-blue shadow-md hover:bg-accent hover:text-white transition-colors duration-300 rounded-l-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {user ? (
          <Link to="/profile">
            <img crossOrigin="anonymous" src={user.profilePicture || defaultProfileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer" />
          </Link>
        ) : (
          <>
            <Link to="/register">
              <button className="px-3 py-1 bg-primary text-white rounded-md font-body text-base hover:scale-105 hover:bg-[#FF99E0] focus:outline-none focus:ring-2 focus:ring-[#FF99E0] shadow-md hover:shadow-lg">Daftar</button>
            </Link>
            <Link to="/login">
              <button className="px-3 py-1 bg-secondary text-white rounded-md font-body text-base hover:scale-105 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg">Masuk</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
