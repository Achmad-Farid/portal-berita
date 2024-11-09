import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BeritaContent from "./BeritaContent";
import UserContent from "./UserContent";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("berita");

  return (
    <div className="flex min-h-screen bg-neutral-light">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === "berita" && <BeritaContent />}
        {activeTab === "user" && <UserContent />}
      </main>
    </div>
  );
};

export default AdminPage;
