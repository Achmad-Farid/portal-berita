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
    const response = await axios.delete(`${apiUrl}/admin/users/delete${userId}`);
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
