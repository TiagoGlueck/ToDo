import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Repassa as chamadas /tarefas para o back-end, evitando problemas de CORS
    proxy: {
      '/tarefas': 'http://localhost:3000',
    },
  },
});
