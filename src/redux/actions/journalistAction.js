import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchBerita = createAsyncThunk("berita/fetchAllBerita", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/journalist/articles`, {
      params: { page, limit: 9 },
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

export const submitArticle = createAsyncThunk("article/submitArticle", async ({ title, content, tags }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/journalist/articles`, { title, content, tags });

    return response.message;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
