import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,                // exposes server to Windows + network
    port: 5173,                
    allowedHosts: [
      'compiler-errors-project-3.onrender.com',
      // Optional: Add other hosts or your local IP if necessary
      // '10.18.0.22' 
    ]
  },
  // other configurations...
});

