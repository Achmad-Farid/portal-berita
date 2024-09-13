import React from "react";

function Pagination({ articlesPerPage, totalArticles, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="inline-flex items-center justify-center w-full">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 ml-0 leading-tight ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white`}
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
