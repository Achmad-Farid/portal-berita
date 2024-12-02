import { createSlice } from "@reduxjs/toolkit";
import { fetchBerita, fetchArticlesByCategory, searchArticles, fetchPopularArticles, fetchArticlesByTheme } from "../actions/articleAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    tagArticles: {},
    tagLoading: false,
    tagError: null,
    tagStatus: "idle",
    articles: [],
    currentPage: 1,
    totalPages: 0,
    status: "idle",
    error: null,
    loading: false,
    popularArticles: [],
    isLoading: false,
    popularError: null,
    terkini: [],
    articlesTheme: [],
    popularTheme: [],
    category: "",
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
        if (state.terkini.length === 0 && action.payload.articles.length > 0) {
          state.terkini = action.payload.articles;
        }
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchArticlesByCategory.pending, (state, action) => {
        state.tagLoading = true;
        state.tagError = null;
        state.tagStatus = "loading";
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.tagLoading = false;
        state.tagArticles = action.payload.articles;
        state.tagStatus = "succeeded";
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.tagLoading = false;
        state.tagError = action.payload || "Failed to fetch articles";
        state.tagStatus = "failed";
      })
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPopularArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularArticles = action.payload;
      })
      .addCase(fetchPopularArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticlesByTheme.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchArticlesByTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articlesTheme = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.category = action.meta.arg.category;
        state.popularTheme = action.payload.popularArticles;
      })
      .addCase(fetchArticlesByTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch articles";
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
