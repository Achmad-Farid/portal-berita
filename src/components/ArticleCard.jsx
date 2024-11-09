import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  // Ensure article.content is an array
  const contentArray = Array.isArray(article.content) ? article.content : [];

  // Find the first image in the content array
  const firstImage = contentArray.find((item) => item.type === "image");
  const imageUrl = firstImage ? firstImage.value : null;
  console.log(imageUrl);

  return (
    <Link to={`/detail/${article._id}`} key={article._id}>
      <div className="rounded-lg shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* Wrapper for the image with fixed height */}
        <div className="bg-accent h-40 flex items-center justify-center text-white rounded-t-lg overflow-hidden">{imageUrl && <img src={imageUrl} alt={article.title} className="object-cover w-full h-full rounded-t-lg" />}</div>
        <div className="p-2">
          <h2 className="text-xl font-semibold">{article.title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
