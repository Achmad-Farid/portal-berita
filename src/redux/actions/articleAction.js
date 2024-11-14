import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchBerita = createAsyncThunk("berita/fetchBerita", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/all`, {
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
