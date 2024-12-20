import { createSlice } from "@reduxjs/toolkit";
import { fetchBerita, fetchArticles, searchArticles } from "../actions/journalistAction";

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
        state.error = null;
      })
      .addCase(fetchBerita.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
