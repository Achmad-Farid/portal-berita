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
            <button className="bg-secondary-blue p-1 rounded-r-md">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        <div className="flex">
          <h1 className="self-center cursor-pointer">Profile</h1>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
