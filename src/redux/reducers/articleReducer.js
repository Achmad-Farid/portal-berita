import { createSlice } from "@reduxjs/toolkit";
import { fetchBerita } from "../actions/articleAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    articles: [],
    currentPage: 1,
    totalPages: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBerita.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBerita.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
