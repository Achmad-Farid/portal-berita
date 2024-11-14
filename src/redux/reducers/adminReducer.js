import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBerita, fetchUnderBerita, fetchAllUsers, fetchUsersByRole } from "../actions/adminAction";
import { fetchBerita } from "../actions/articleAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    users: [],
    articles: [],
    currentPage: 1,
    totalPages: 0,
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
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
