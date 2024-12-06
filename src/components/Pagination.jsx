import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-4">
      <ul className="inline-flex items-center justify-center w-full space-x-2">
        {/* Tombol Previous */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 dark:border-gray-600 dark:bg-neutral-dark dark:text-gray-300 ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-white text-primary hover:bg-primary hover:text-white dark:bg-neutral-dark dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white"
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
              className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 dark:border-gray-600 dark:bg-neutral-dark dark:text-gray-300 ${
                currentPage === number ? "bg-primary text-white dark:bg-primary dark:text-white" : "bg-white text-primary hover:bg-primary hover:text-white dark:bg-neutral-dark dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white"
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
            className={`px-4 py-2 text-base font-body leading-tight rounded-md border border-gray-300 transition-colors duration-200 dark:border-gray-600 dark:bg-neutral-dark dark:text-gray-300 ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-white text-primary hover:bg-primary hover:text-white dark:bg-neutral-dark dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white"
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
