import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import defaultProfileImage from "../assets/default-profile.png";
import logo from "../assets/logo.png";
import { fetchArticlesByCategory } from "../redux/actions/articleAction";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tema = ["Nasional", "Internasional", "Ekonomi", "Teknologi", "Olahraga", "Hiburan", "Gaya Hidup", "Otomotif"];

  const { user } = useSelector((state) => state.auth);
  const { tagArticles } = useSelector((state) => state.articles);
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

  const handleCategoryHover = (tema) => {
    const lowerCaseTema = tema.toLowerCase();
    dispatch(fetchArticlesByCategory(lowerCaseTema));
  };

  return (
    <nav onMouseLeave={() => setActiveDropdown(null)} className="bg-white shadow-sm  w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
        </Link>
        {/* searhh mobile */}
        <div className="md:hidden flex">
          <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="px-4 py-1 rounded-l-md border shadow-sm focus:ring-2 focus:ring-accent w-full" />
          <button onClick={handleSearch} className="px-4 py-1 bg-secondary-blue text-neutral-dark border rounded-r-md shadow-md hover:bg-accent">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/" className="hover:text-primary transition-colors duration-200">
            Home
          </Link>
          {tema.map((title) => (
            <div key={title} onMouseEnter={() => handleCategoryHover(title)}>
              <DropdownMenu setActiveDropdown={setActiveDropdown} activeDropdown={activeDropdown} title={title} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
          ))}
          <div className="flex items-center">
            <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="px-4 py-1 rounded-l-md border shadow-sm focus:ring-2 focus:ring-accent w-full" />
            <button onClick={handleSearch} className="px-4 py-1 bg-secondary-blue text-neutral-dark border rounded-r-md shadow-md hover:bg-accent">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
          {user ? (
            <Link to="/profile" className="flex items-center gap-2">
              <img src={user.profilePicture || defaultProfileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              <span>{user.username}</span>
            </Link>
          ) : (
            <>
              <Link to="/register" className="text-center px-3 py-2 bg-primary text-white rounded-md">
                Daftar
              </Link>
              <Link to="/login" className="text-center px-3 py-2 bg-secondary text-white rounded-md">
                Masuk
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <Link to="/" className="block mb-2 hover:text-primary">
            Home
          </Link>
          {tema.map((title) => (
            <div key={title} onClick={() => setIsMenuOpen(false)}>
              <DropdownMenu setActiveDropdown={setActiveDropdown} activeDropdown={activeDropdown} title={title} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2">
                <img src={user.profilePicture || defaultProfileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                <span>{user.username}</span>
              </Link>
            ) : (
              <>
                <Link to="/register" className="text-center px-3 py-2 bg-primary text-white rounded-md">
                  Daftar
                </Link>
                <Link to="/login" className="text-center px-3 py-2 bg-secondary text-white rounded-md">
                  Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
