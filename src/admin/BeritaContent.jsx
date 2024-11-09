import React from "react";

const BeritaContent = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Berita</h2>
      {/* Search and Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded w-full max-w-xs" />
        <select className="border p-2 rounded">
          <option value="published">Published</option>
          <option value="underReview">Under Review</option>
        </select>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border p-4 rounded shadow bg-white">
            <h3 className="font-bold">Berita {i + 1}</h3>
            <p className="text-gray-600">Ini adalah ringkasan berita.</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 mx-1 bg-secondary text-white rounded">1</button>
        <button className="px-4 py-2 mx-1">2</button>
        <button className="px-4 py-2 mx-1">3</button>
      </div>
    </div>
  );
};

export default BeritaContent;
