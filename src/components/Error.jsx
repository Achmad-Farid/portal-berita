import React from "react";

const Error = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-neutral-light text-neutral-dark rounded-md p-6 shadow-md">
      <h2 className="text-xl font-heading text-gray mt-4 mb-2">{message}</h2>
      {onRetry && (
        <button className="mt-4 px-6 py-2 bg-secondary text-white font-sans rounded hover:bg-secondary/80 transition duration-200" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
