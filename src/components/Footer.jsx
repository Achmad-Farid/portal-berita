import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">MyWebsite</h1>
          <p className="text-sm">© 2024 All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Services
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <a href="https://twitter.com" className="hover:text-gray-400 mx-2">
            Twitter
          </a>
          <a href="https://facebook.com" className="hover:text-gray-400 mx-2">
            Facebook
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400 mx-2">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
