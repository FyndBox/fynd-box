import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Use Heroku's dynamic port, fallback to 5173 locally
    proxy: {
      "/api": {
        target: process.env.NODE_ENV === 'production' 
          ? "https://fyndbox-cddc55cc8183.herokuapp.com" // Backend URL in production
          : "http://localhost:3000", // Backend server URL in development
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
