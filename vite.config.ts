import { resolve } from 'path';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import packageInfo from './package.json';

const tsPlugin: PluginOption = typescript({
  include: ['src/worker/domains/**/*'],
}) as any;

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: './',
    plugins: [
      svelte(),
      tsPlugin,
      eslint(),
      VitePWA({
        manifest: {
          name: packageInfo.title,
          short_name: packageInfo.title,
          theme_color: '#f26522',
          background_color: '#181818',
          description: '一个金融数据查询终端，它简单、高效、灵活。',
          icons: [
            {
              src: './public/logo120.png',
              sizes: '120*120',
              type: 'image/png',
            },
          ],
          screenshots: [
            {
              src: './public/效果图.jpg',
              sizes: '1250*775',
            },
          ],
        },
        /*devOptions: {
          enabled: true,
        },*/
      }),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          if (env.VITE_SITE_BAIDU_ANALYSIS !== 'true') return html;
          const index = html.indexOf('</head>');
          const baidu = `<script>
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?dfec2bfb0d9f6e4c9e142271e4c34a1e";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          </script>
          `;
          return html.substring(0, index) + baidu + html.substring(index);
        },
      },
    ],
    worker: {
      format: 'es',
      plugins: () => [tsPlugin],
    },
    resolve: {
      alias: {
        '@root': __dirname,
        '@': resolve(__dirname, 'src'),
        '@domains': resolve(__dirname, 'src/worker/domains'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PROXY ?? 'https://istock.red',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
    build: {
      // minify: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/@antv/')) {
              return 'antv';
            }
            if (id.includes('/node_modules/')) {
              return 'lib';
            }
          },
        },
      },
    },
  });
};
