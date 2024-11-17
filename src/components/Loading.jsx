import React from "react";

const Loading = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-neutral-light text-neutral-dark rounded-md p-6 shadow-md">
      <div className="loader h-12 w-12 border-4 border-t-primary border-gray rounded-full animate-spin"></div>
      <p className="text-lg font-sans text-gray mt-4">{message}</p>
    </div>
  );
};

export default Loading;
