import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BeritaContent from "./MyBerita";
import CreateArticle from "./CreateArticel";

const JournalistPage = () => {
  const [activeTab, setActiveTab] = useState("myberita");

  return (
    <div className="flex min-h-screen bg-neutral-light">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === "myberita" && <BeritaContent />}
        {activeTab === "create" && <CreateArticle />}
      </main>
    </div>
  );
};

export default JournalistPage;
