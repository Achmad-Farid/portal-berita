import React from "react";
import { useNavigate } from "react-router-dom";

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const contentArray = Array.isArray(article.content) ? article.content : [];

  const firstImage = contentArray.find((item) => item.type === "image");
  const imageUrl = firstImage ? firstImage.value : null;

  return (
    <li onClick={() => navigate(`/detail/${article._id}`)} key={article._id} className="flex items-start space-x-4 border-b pb-4 cursor-pointer">
      <img src={imageUrl} alt={article.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
      <div className="flex-1">
        <h2 className="text-lg font-bold text-secondary mb-2">{article.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-3">{article.summary}</p>
      </div>
    </li>
  );
}

export default ArticleCard;
