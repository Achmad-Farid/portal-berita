import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BeritaContent from "./MyBerita";
import CreateArticle from "./CreateArticel";
import { useDispatch } from "react-redux";
import { checkSession } from "../redux/actions/authActions";

const JournalistPage = () => {
  const [activeTab, setActiveTab] = useState("myberita");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  return (
    <div className="flex min-h-screen bg-neutral-light dark:bg-background-dark text-neutral-dark dark:text-text-dark">
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
