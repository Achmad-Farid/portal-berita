import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async Thunk: Menambahkan Bookmark
export const addBookmark = createAsyncThunk("bookmarks/addBookmark", async (articleId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/user/${articleId}/bookmark`);
    return response.data.article;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunk: Menghapus Bookmark
export const removeBookmark = createAsyncThunk("bookmarks/removeBookmark", async (articleId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${apiUrl}/user/${articleId}/bookmark`);
    return { articleId, article: response.data.article };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk untuk mengambil data artikel
export const fetchBookmarkedArticles = createAsyncThunk("bookmarks/fetchBookmarkedArticles", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/user/article`, {
      params: { page, limit: 10 },
    });

    return {
      articles: response.data.articles,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch articles");
  }
});
