import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // PWA akan otomatis update
      manifest: {
        name: "Winnicode Portal Berita",
        short_name: "Berita",
        description: "berita terbaru",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo-VPYK9pp3.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-VPYK9pp3.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
