import React from "react";
import { useNavigate } from "react-router-dom";

function Sidelist({ article }) {
  const contentArray = Array.isArray(article.content) ? article.content : [];
  const navigate = useNavigate();

  const firstImage = contentArray.find((item) => item.type === "image");
  const imageUrl = firstImage ? firstImage.value : null;
  return (
    <li onClick={() => navigate(`/detail/${article._id}`)} className="flex items-start space-x-3 cursor-pointer">
      <img src={imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
      <a className="text-sm font-semibold text-gray-800 hover:text-accent">{article.title}</a>
    </li>
  );
}

export default Sidelist;
