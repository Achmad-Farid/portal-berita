import React, { useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const articles = [
  { id: 1, title: "Article 1", content: "Content of article 1" },
  { id: 2, title: "Article 2", content: "Content of article 2" },
  { id: 3, title: "Article 3", content: "Content of article 3" },
  { id: 4, title: "Article 4", content: "Content of article 4" },
  { id: 5, title: "Article 5", content: "Content of article 5" },
  { id: 6, title: "Article 6", content: "Content of article 6" },
  { id: 7, title: "Article 7", content: "Content of article 7" },
  { id: 8, title: "Article 8", content: "Content of article 8" },
  { id: 9, title: "Article 9", content: "Content of article 9" },
  { id: 10, title: "Article 10", content: "Content of article 10" },
  { id: 11, title: "Article 11", content: "Content of article 11" },
  { id: 12, title: "Article 12", content: "Content of article 12" },
];

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold mb-6 text-secondary text-center">Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentArticles.map((article) => (
          <Link to="/detail" key={article.id}>
            <div className="rounded-lg shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="bg-accent h-40 flex items-center justify-center text-white rounded-t-lg">
                <h2 className="text-xl font-semibold">Item {article.id}</h2>
              </div>
              <div className="p-2">
                <h2 className="text-xl font-heading font-semibold">{article.title}</h2>
                <p className="mt-2 text-neutral-dark">{article.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination articlesPerPage={articlesPerPage} totalArticles={articles.length} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default ArticleList;
