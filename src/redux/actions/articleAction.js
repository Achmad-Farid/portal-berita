import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchBerita = createAsyncThunk("berita/fetchBerita", async (page = 1, { rejectWithValue }) => {
  try {
    // Mengambil data artikel dengan pagination
    const response = await axios.get(`${apiUrl}/articles/all`, {
      params: { page, limit: 10 }, // Sesuaikan limit dengan nilai yang diinginkan
    });

    // Mengembalikan data dari server yang mencakup artikel, halaman saat ini, dan total halaman
    return {
      articles: response.data.articles,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    // Menangani error jika terjadi kegagalan pada request
    return rejectWithValue(error.response?.data?.message || "Failed to fetch articles");
  }
});
