
// vite.config.js
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  base: "/chutaxdalp/", // 保持這個設置
  // base: "/-Hsinchu/", // 與 GitHub Pages 倉庫名稱一致

  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
