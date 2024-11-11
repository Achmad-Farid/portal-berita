import { createSlice } from "@reduxjs/toolkit";
import { fetchBerita } from "../actions/articleAction";

const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    articles: [],
    currentPage: 1,
    totalPages: 0,
    status: "idle", // Status loading, succeeded, failed
    error: null, // Menyimpan pesan error jika ada
  },
  reducers: {
    setCurrentPage: (state, action) => {
      // Update halaman saat ini
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBerita.pending, (state) => {
        state.status = "loading"; // Menandakan sedang mengambil data
      })
      .addCase(fetchBerita.fulfilled, (state, action) => {
        state.status = "succeeded"; // Menandakan berhasil mengambil data
        state.articles = action.payload.articles; // Menyimpan data artikel yang diterima
        state.currentPage = action.payload.currentPage; // Menyimpan halaman saat ini
        state.totalPages = action.payload.totalPages; // Menyimpan total halaman
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.status = "failed"; // Menandakan gagal mengambil data
        state.error = action.payload; // Menyimpan pesan error jika gagal
      });
  },
});

export const { setCurrentPage } = beritaSlice.actions;
export default beritaSlice.reducer;
