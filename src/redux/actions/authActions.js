import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Signup action
export const signup = createAsyncThunk("auth/signup", async ({ email, username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/signup`, { email, username, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Login action
export const login = createAsyncThunk("auth/login", async ({ identifier, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { identifier, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginWithGoogle = () => {
  window.location.href = `${apiUrl}/auth/google`;
};

// Async thunk untuk memeriksa sesi
export const checkSession = createAsyncThunk("auth/checkSession", async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/session-status`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: "Network error" };
  }
});

// Logout action
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to logout");
  }
});
