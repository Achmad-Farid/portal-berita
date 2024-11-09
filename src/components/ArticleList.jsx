import React from "react";
import ArticleCard from "./ArticleCard"; // Impor komponen ArticleCard
import Pagination from "./Pagination"; // Impor komponen Pagination

function ArticleList({ articles = [], currentPage, articlesPerPage, paginate }) {
  // Menghitung artikel yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="container mx-auto p-4">
      {/* Menampilkan pesan jika tidak ada artikel */}
      {articles.length === 0 ? (
        <div className="text-center text-neutral-dark">
          <p className="text-2xl font-semibold text-accent mb-4">Oops! No articles available.</p>
          <p className="text-lg text-gray-500">Try again later or check out other sections of the website.</p>
        </div>
      ) : (
        <>
          {/* Daftar artikel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination articlesPerPage={articlesPerPage} totalArticles={articles.length} paginate={paginate} currentPage={currentPage} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleList;
