export default defineConfig({
    // Other config options...
    build: {
      rollupOptions: {
        external: ['firebase-admin/firestore'],
      },
    },
  });
  