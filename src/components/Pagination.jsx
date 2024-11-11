import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Misalkan kita memiliki 10 artikel per halaman, kita hitung rentang artikel yang ditampilkan
  const articlesPerPage = 10;
  const totalArticles = totalPages * articlesPerPage;
  const startArticleIndex = (currentPage - 1) * articlesPerPage + 1;
  const endArticleIndex = Math.min(currentPage * articlesPerPage, totalArticles);

  return (
    <nav className="mt-4">
      {/* Tampilkan rentang artikel */}
      <p className="text-center text-gray-600 mb-4">
        Showing articles {startArticleIndex} - {endArticleIndex} of {totalArticles}
      </p>
      <ul className="inline-flex items-center justify-center w-full space-x-2">
        {/* Tombol Previous */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-white text-primary hover:bg-primary hover:text-white"
            }`}
          >
            Previous
          </button>
        </li>

        {/* Nomor halaman */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 ${
                currentPage === number ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Tombol Next */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-white text-primary hover:bg-primary hover:text-white"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
