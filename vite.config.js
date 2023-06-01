// vite.config.ts
import glob from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const files = glob.sync(`${__dirname}/src/*.js`);

const entries = files.reduce((acc, act) => {
  const [fileName] = act.match(/([^/]+)(?=\.\w+$)/g);
  const name = fileName === 'index' ? 'data-transformations' : fileName;
  acc[name] = act;

  return acc;
}, {});

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      entry: { ...entries },
      formats: ['es', 'cjs'],
    },
  },
  resolve: {
    alias: {
      '#utils': resolve(__dirname, './src'),
    },
  },
  // define: {
  //   'process.env.NODE_ENV': '"production"',
  // },
});
