import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchBerita = createAsyncThunk("berita/fetchBerita", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("No token found");
  }

  try {
    const response = await axios.get(`${apiUrl}/journalist/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.articles;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch articles");
  }
});

export const submitArticle = createAsyncThunk("article/submitArticle", async ({ title, content, tags }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${apiUrl}/journalist/articles`, { title, content, tags }, config);

    return response.message;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
