import React from "react";
import Sidelist from "./Sidelist";

function Sidebar({ editorPicks = [], popularArticles = [] }) {
  return (
    <aside className="w-full md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md dark:bg-neutral-dark dark:text-gray-300">
      {/* Berita Terkini */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-secondary mb-4 dark:text-secondary">Berita Terkini</h2>
        <ul className="space-y-4">
          {editorPicks.map((article) => (
            <Sidelist key={article._id} article={article}></Sidelist>
          ))}
        </ul>
      </section>

      {/* Berita Terpopuler */}
      <section>
        <h2 className="text-xl font-bold text-secondary mb-4 dark:text-secondary">Berita Terpopuler</h2>
        <ul className="space-y-4">
          {popularArticles.map((article) => (
            <Sidelist key={article._id} article={article}></Sidelist>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
