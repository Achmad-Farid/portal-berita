import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchBerita = createAsyncThunk("berita/fetchBerita", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${apiUrl}/journalist/articles`, config);
  const data = await response.json();
  return data.articles;
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
