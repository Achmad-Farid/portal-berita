import { createSlice } from "@reduxjs/toolkit";
import { fetchBerita } from "../actions/journalistAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    articles: [],
    currentPage: 1,
    articlesPerPage: 10,
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
        state.articles = action.payload;
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
