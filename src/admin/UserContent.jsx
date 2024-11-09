import React from "react";

const UserContent = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User</h2>
      {/* Search and Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" />
        <select className="border p-2 rounded">
          <option value="user">User</option>
          <option value="journalist">Journalist</option>
        </select>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border p-4 rounded shadow bg-white flex justify-between items-center">
            <div>
              <h3 className="font-bold">User {i + 1}</h3>
              <p className="text-gray-600">Role: Journalist</p>
            </div>
            <div className="space-x-2">
              <button className="px-2 py-1 bg-secondary text-white rounded">Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserContent;
