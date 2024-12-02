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

// Thunk untuk mengambil artikel berdasarkan kategori
export const fetchArticlesByCategory = createAsyncThunk("tagArticle/fetchArticlesByCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/tag?category=${category}`);
    return { articles: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Async thunk untuk mencari artikel
export const searchArticles = createAsyncThunk("articles/searchArticles", async ({ page = 1, limit = 10, query }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/search`, {
      params: { page, limit, query },
    });
    return {
      articles: response.data.articles,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data || "Terjadi kesalahan");
  }
});

// Thunk untuk mengambil artikel populer
export const fetchPopularArticles = createAsyncThunk("articles/fetchPopularArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/popular`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Failed to fetch popular articles");
  }
});

// Thunk untuk mengambil artikel berdasarkan kategori
export const fetchArticlesByTheme = createAsyncThunk("articles/fetchByTheme", async ({ categoryOrTag, page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/articles/category/${categoryOrTag}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await response.json();
    return data; // Berisi { articles, totalPages, currentPage }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
