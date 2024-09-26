import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  return (
    <nav
      className="flex gap-2 bg-white justify-between container mx-auto p-4 text-base"
      onMouseLeave={() => setActiveDropdown(null)} // Close dropdown when mouse leaves the navbar area
    >
      <div className="flex gap-2">
        <h1 className="self-center cursor-pointer hover:scale-105 transition-transform duration-200">Logo</h1>
        <div className="flex ml-5 gap-3 self-center">
          <Link to="/" className="relative group">
            <h2 className="cursor-pointer hover:text-primary transition-colors duration-200">Home</h2>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <DropdownMenu title="Nasional" />
          <DropdownMenu title="Internasional" />
          <DropdownMenu title="Ekonomi" />
          <DropdownMenu title="Teknologi" />
          <DropdownMenu title="Olahraga" />
          <DropdownMenu title="Hiburan" />
          <DropdownMenu title="Gaya Hidup" />
          <DropdownMenu title="Otomotif" />
        </div>
        <div className="flex ml-5 items-center">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 w-full rounded-r-none focus:border-transparent"
            />
            <Link to={"/search"}>
              <button className="px-4 py-1 bg-secondary-blue text-neutral-dark rounded-r-md border border-secondary-blue shadow-md hover:bg-accent hover:text-white transition-colors duration-300 rounded-l-none focus:ring-2 focus:ring-accent focus:border-transparent">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Link to="/register">
          <button className="px-3 py-1 bg-primary text-white rounded-md font-body text-base hover:scale-105 hover:bg-[#FF99E0] focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg">Daftar</button>
        </Link>
        <Link to="/login">
          <button className="px-3 py-1 bg-secondary text-white rounded-md font-body text-base hover:scale-105 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg">Masuk</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
