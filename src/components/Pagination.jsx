import React from "react";

function Pagination({ articlesPerPage, totalArticles, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="inline-flex items-center justify-center w-full space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 ${
                currentPage === number ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
