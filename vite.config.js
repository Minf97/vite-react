import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(env.VITE_API_URL);
  return {
    plugins: [react()],
    define: {
      VITE_API_URL: JSON.stringify(env.VITE_API_URL),
    },
  };
});
