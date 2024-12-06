import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-primary p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Journalist Panel</h2>
      <nav className="flex flex-col">
        <button onClick={() => setActiveTab("myberita")} className={`p-2 text-left ${activeTab === "myberita" ? "bg-secondary" : ""}`}>
          Berita
        </button>
        <button onClick={() => setActiveTab("create")} className={`p-2 text-left ${activeTab === "create" ? "bg-secondary" : ""}`}>
          Create
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
