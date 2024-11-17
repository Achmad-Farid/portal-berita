import React from "react";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Error from "./Error";

function ArticleList({ articles = [], currentPage, totalPages, handlePageChange, status, error, retry }) {
  if (status === "loading") {
    return <Loading></Loading>;
  }

  if (error) {
    return <Error onRetry={retry}></Error>;
  }

  return (
    <div className="container mx-auto p-4">
      {articles.length === 0 ? (
        <div className="text-center text-neutral-dark">
          <p className="text-2xl font-semibold text-accent mb-4">Oops! No articles available.</p>
          <p className="text-lg text-gray-500">Try again later or check out other sections of the website.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleList;
