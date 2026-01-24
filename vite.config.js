import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base : '/Extract-Website/',

   // ⬇️ أضيفي build configuration
  build: {
    rollupOptions: {
      output: {
        // إضافة hash للأسماء علشان نتجنب caching
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`
      }
    }
  }
});
