import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk untuk mengambil data berita
export const fetchAllBerita = createAsyncThunk("berita/fetchAllBerita", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/articles`, {
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

// Async thunk untuk mengambil data berita under review
export const fetchUnderBerita = createAsyncThunk("berita/fetchUnderBerita", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/articles/under`, {
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

// Async thunk untuk mengambil semua pengguna dengan pagination
export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/users`, {
      params: { page, limit },
    });

    return {
      users: response.data.users,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

// Async thunk untuk mengambil pengguna berdasarkan role dengan pagination
export const fetchUsersByRole = createAsyncThunk("users/fetchUsersByRole", async ({ role, page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    console.log(`${apiUrl}/admin/users/role/${role}`);
    const response = await axios.get(`${apiUrl}/admin/users/role/${role}`, {
      params: { page, limit },
    });

    return {
      users: response.data.users,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users by role");
  }
});

// Thunk untuk menghapus pengguna
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${apiUrl}/admin/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error deleting user");
  }
});

// Thunk untuk memperbarui role pengguna
export const updateUserRole = createAsyncThunk("admin/updateUserRole", async ({ userId, role }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${apiUrl}/admin/users/role/${userId}`, { role });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error updating user role");
  }
});

// Async Thunks
export const publishArticle = createAsyncThunk("articles/publish", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${apiUrl}/admin/articles/${id}/publish`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal mem-publish artikel.");
  }
});

export const unpublishArticle = createAsyncThunk("articles/unpublish", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${apiUrl}/admin/articles/${id}/unpublish`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal unpublish artikel.");
  }
});

export const deleteArticle = createAsyncThunk("articles/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${apiUrl}/admin/articles/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal menghapus artikel.");
  }
});

// Thunk untuk pencarian artikel
export const fetchSearchArticles = createAsyncThunk("admin/fetchSearchArticles", async ({ query, currentPage }, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/articles/search`, {
      params: {
        query: query,
        page: currentPage,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: "Something went wrong" });
  }
});
