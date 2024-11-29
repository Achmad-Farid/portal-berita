import { createSlice } from "@reduxjs/toolkit";
import { fetchBookmarkedArticles } from "../actions/userAction";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    articles: [],
    totalPages: 0,
    currentPage: 1,
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
      .addCase(fetchBookmarkedArticles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookmarkedArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBookmarkedArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
