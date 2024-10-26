import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

// Signup action
export const signup = createAsyncThunk("auth/signup", async ({ email, username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/users/signup`, { email, username, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Login action
export const login = createAsyncThunk("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, { username, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
