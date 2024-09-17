import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="flex gap-2 bg-white justify-between container mx-auto p-4 text-base ">
        <div className="flex gap-2">
          <h1 className="self-center cursor-pointer">Logo</h1>
          <div className="flex ml-5 gap-3 self-center">
            <Link to="/">
              <h2 className="cursor-pointer">home</h2>
            </Link>
            <Link to="/detail">
              <h2 className="cursor-pointer">kategori</h2>
            </Link>
            <h2 className="cursor-pointer">kategori</h2>
          </div>
          <div className="flex ml-5">
            <input type="text" placeholder="Search..." className="px-2 rounded-s-md border" />
            <button className="bg-secondary-blue p-1 rounded-r-md border">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-dark" />
            </button>
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
    </>
  );
}

export default Navbar;
