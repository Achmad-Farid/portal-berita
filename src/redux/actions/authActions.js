import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

// Setup default header for axios
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

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
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Google login action (redirects to Google login URL)
export const loginWithGoogle = () => {
  window.location.href = `${apiUrl}/auth/google`;
};

// Async thunk untuk memeriksa status sesi dengan JWT token
export const checkSession = createAsyncThunk("auth/checkSession", async (_, { rejectWithValue }) => {
  try {
    // Cek apakah token ada di localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Jika token ada, decode untuk mendapatkan data pengguna
      const user = jwtDecode(token);
      setAuthToken(token);
      return { success: true, user };
    } else {
      // Jika tidak ada token
      return rejectWithValue({ success: false, message: "No session available" });
    }
  } catch (error) {
    return rejectWithValue({ success: false, message: "Invalid token" });
  }
});

// Logout action tanpa backend
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Set token di header ke null (jika menggunakan setAuthToken)
    setAuthToken(null);

    return { success: true, message: "Logout successful" };
  } catch (error) {
    return rejectWithValue("Failed to logout");
  }
});
