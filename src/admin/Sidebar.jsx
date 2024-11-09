import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-primary p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col">
        <button onClick={() => setActiveTab("berita")} className={`p-2 text-left ${activeTab === "berita" ? "bg-secondary" : ""}`}>
          Berita
        </button>
        <button onClick={() => setActiveTab("user")} className={`p-2 text-left ${activeTab === "user" ? "bg-secondary" : ""}`}>
          User
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
