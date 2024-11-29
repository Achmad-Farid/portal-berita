import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, fetchBookmarkedArticles, removeBookmark } from "../redux/actions/userAction";

const BookmarkButton = ({ id }) => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.user);
  console.log(articles);
  const isBookmarked = articles?.some((item) => item._id === id);

  useEffect(() => {
    dispatch(fetchBookmarkedArticles());
  }, [dispatch]);

  const handleBookmark = () => {
    dispatch(fetchBookmarkedArticles());
    if (isBookmarked) {
      dispatch(removeBookmark(id));
      dispatch(fetchBookmarkedArticles());
    } else {
      dispatch(addBookmark(id));
      dispatch(fetchBookmarkedArticles());
    }
  };
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2" onClick={handleBookmark}>
      {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    </button>
  );
};

export default BookmarkButton;
