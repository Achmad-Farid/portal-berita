import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 bg-primary text-white py-1 px-3 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
