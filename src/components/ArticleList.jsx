import React from "react";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Error from "./Error";

function ArticleList({ articles = [], currentPage, totalPages, handlePageChange, status, error, retry }) {
  if (status === "loading") {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={retry} />;
  }

  return (
    <div className="container mx-auto p-4">
      {articles.length === 0 ? (
        <div className="text-center text-neutral-dark dark:text-neutral-light">
          <p className="text-2xl font-semibold text-accent mb-4 dark:text-accent">Oops! No articles available.</p>
          <p className="text-lg text-gray-500 dark:text-gray-400">Try again later or check out other sections of the website.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {articles.map((article) => (
              <ArticleCard article={article} key={article._id} />
            ))}
          </ul>

          <div className="mt-6 flex justify-center">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleList;
