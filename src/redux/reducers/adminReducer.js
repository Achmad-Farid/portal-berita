import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBerita, fetchUnderBerita, fetchAllUsers, fetchUsersByRole, updateUserRole, deleteUser, publishArticle, unpublishArticle, deleteArticle, fetchSearchArticles } from "../actions/adminAction";
import { fetchBerita } from "../actions/articleAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    users: [],
    articles: [],
    currentPage: 1,
    totalPages: 0,
    status: "idle",
    statusFetchBerita: "idle",
    statusFetchAllBerita: "idle",
    statusFetchUnderBerita: "idle",
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetchBerita status
      .addCase(fetchBerita.pending, (state) => {
        state.statusFetchBerita = "loading";
      })
      .addCase(fetchBerita.fulfilled, (state, action) => {
        state.statusFetchBerita = "succeeded";
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.statusFetchBerita = "failed";
        state.error = action.payload;
      })

      // handle fetchAllBerita status
      .addCase(fetchAllBerita.pending, (state) => {
        state.statusFetchAllBerita = "loading";
      })
      .addCase(fetchAllBerita.fulfilled, (state, action) => {
        state.statusFetchAllBerita = "succeeded";
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllBerita.rejected, (state, action) => {
        state.statusFetchAllBerita = "failed";
        state.error = action.payload;
      })

      // handle fetchUnderBerita status
      .addCase(fetchUnderBerita.pending, (state) => {
        state.statusFetchUnderBerita = "loading";
      })
      .addCase(fetchUnderBerita.fulfilled, (state, action) => {
        state.statusFetchUnderBerita = "succeeded";
        state.articles = action.payload.articles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUnderBerita.rejected, (state, action) => {
        state.statusFetchUnderBerita = "failed";
        state.error = action.payload;
      })
      // all user
      .addCase(fetchAllUsers.pending, (state) => {
        state.statusFetchUsers = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.statusFetchUsers = "succeeded";
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.statusFetchUsers = "failed";
        state.error = action.payload;
      })
      // Handle fetchUsersByRole status
      .addCase(fetchUsersByRole.pending, (state) => {
        state.statusFetchUsersByRole = "loading";
      })
      .addCase(fetchUsersByRole.fulfilled, (state, action) => {
        state.statusFetchUsersByRole = "succeeded";
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        state.statusFetchUsersByRole = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user._id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload.updatedUser;
        state.users = state.users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(publishArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex((article) => article._id === action.payload._id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(unpublishArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex((article) => article._id === action.payload._id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((article) => article._id !== action.payload);
      })
      .addCase(publishArticle.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(unpublishArticle.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchSearchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
