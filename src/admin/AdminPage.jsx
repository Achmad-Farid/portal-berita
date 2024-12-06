import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BeritaContent from "./BeritaContent";
import UserContent from "./UserContent";
import { useDispatch } from "react-redux";
import { checkSession } from "../redux/actions/authActions";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("berita");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-neutral-light dark:bg-neutral-dark">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <main className="flex-1 p-6 bg-neutral-light dark:bg-neutral-800">
        {activeTab === "berita" && <BeritaContent />}
        {activeTab === "user" && <UserContent />}
      </main>
    </div>
  );
};

export default AdminPage;
