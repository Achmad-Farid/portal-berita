import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-neutral-dark p-4 rounded shadow-lg">
        <p className="text-gray-800 dark:text-gray-200">{message}</p>
        <button onClick={onClose} className="mt-4 bg-primary text-white py-1 px-3 rounded hover:bg-secondary dark:hover:bg-secondary">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
