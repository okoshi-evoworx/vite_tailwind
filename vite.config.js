import {defineConfig} from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
<!-- [buildonly]  [/buildonly] -->
で囲まれたコメントをビルド時に展開

【例】
<!-- [buildonly] <script>
GoogleTagManagerのコード
</script> [/buildonly] -->

↓

<script>
GoogleTagManagerのコード
</script>

 */
const buildOnlyComment = () => {
  let isBuild = false
  return {
    name: 'dev-comment-replace',
    config(config, { command }) {
      // command が 'build' なら isBuild フラグを true に設定
      isBuild = command === 'build'
    },
    transformIndexHtml(html) {
      if (isBuild) {
        return html
          .replace(/<!--\s\[buildonly\]\s/g, '')
          .replace(/\s\[\/buildonly\]\s-->/g, '')
      }
      return html
    },
  }
}
/*
<!-- [devonly]  [/devonly] -->
で囲まれたコメントをビルド時に削除

【例】
<!-- [devonly]
devに残しておきたいコメント
[/devonly] -->

 */
const devOnlyComment = () => {
  let isBuild = false
  return {
    name: 'devonly-comment-replace',
    config(config, { command }) {
      isBuild = command === 'build'
    },
    transformIndexHtml(html) {
      if (isBuild) {
        return html.replace(/<!--\s\[devonly\][\s\S]*?\[\/devonly\]\s-->/g, '')
      }
      return html
    },
  }
}

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        buildOnlyComment(),
        devOnlyComment(),
        ViteImageOptimizer({
          includePublic: true,
          svg: {
            multipass: true,
          },
          png: {
            quality: 100,
          },
          jpeg: {
            quality: 100,
          },
          jpg: {
            quality: 100,
          },
          tiff: {
            quality: 100,
          },
          gif: {},
          webp: {
            lossless: true,
          },
          avif: {
            lossless: true,
          },
      }),
    ],
    css: {
        transformer: 'postcss',
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsInlineLimit: 0,
        cssMinify: false,
        cssCodeSplit: true,
        rollupOptions: {
          input: {
            main: 'index.html',
            styles: 'src/css/styles.css',
          },
          output: {
                entryFileNames: `js/main.js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: (assetInfo) => {
                  // https://rollupjs.org/configuration-options/#output-assetfilenames
                  const { name } = assetInfo;
                  // nameが存在しない場合のフォールバック
                  if (!name) {
                    return "assets/[name][extname]";
                  }

                  // 拡張子抽出
                  const extType = name.split('.').pop();

                  // CSS
                  if (extType === 'css') {
                    return `css/[name][extname]`;
                  }

                  // 画像
                  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'];
                  if (imageExtensions.includes(extType)) {
                    return `img/[name][extname]`;
                  }

                  // フォント
                  const fontExtensions = ['eot', 'otf', 'ttf', 'woff', 'woff2'];
                  if (fontExtensions.includes(extType)) {
                    return `font/[name][extname]`;
                  }

                  // その他のアセット
                  return "assets/[name][extname]";
                },
            },
        },
    },
})