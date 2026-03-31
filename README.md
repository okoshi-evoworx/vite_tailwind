# Vite-Tailwind
- [Vite](https://ja.vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [Custom media queries(Lightning CSS)](https://lightningcss.dev/transpilation.html#custom-media-queries)
- [Biome](https://biomejs.dev/ja/)
- [MarkupLint](https://markuplint.dev/ja/)
- [Vite Image Optimzer](https://github.com/FatehAK/vite-plugin-image-optimizer)
- [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md)

## Command
### 各ツールのバージョン確認
```
npx npm-check-updates
```
※`package.json`への適用は `npx npm-check-updates -u`

### init：初期設定
```
npm i
```

### development：開発
```
npm run dev
```

### build：納品データ作成
```
npm run build
```

### check：コードチェック
```
npm run check
```

| npm script | command | |
| :-- | :-- | :-- |
| `npm run check:js` | `biome check src/**/*.js` | jsチェック |
| `npm run check:css` | `biome check src/css/**/*.css` | cssチェック |
| `npm run check:html` | `markuplint **/*.html` | htmlチェック |

### fix：コード修正
```
npm run fix
```

| npm script | command | |
| :-- | :-- | :-- |
| `npm run fix:js` | `biome check --write src/js/**/*.js` | JS修正 |
| `npm run fix:css` | `biome check --write src/css/**/*.css` | css修正 |

### test：@axe-core/playwrightによるアクセシビリティチェック
`npm run build`実行後に
```
npm run test
```
※実行時に`npx playwright install`が必要になる場合があります。  
※前回の実行結果は `npx playwright show-report` で確認できます。  

#### 参考
- [Accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [@axe-core/playwright によるアクセシビリティテストの自動化](https://azukiazusa.dev/blog/axe-core-playwright/)

## CSSについて

`src/css/styles.css` をエントリーポイントとしています。  
Tailwindで設定されている`@layer theme, base, components, utilities;`に加え、[FLOCSS](https://github.com/hiloki/flocss)で言うところの `foundation` `layout` `projects` を追加しています。  
[@layer](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/At-rules/@layer)については状況に応じて変更してください。  

`@theme` については[Theme variables](https://tailwindcss.com/docs/theme)を参照してください。

`@import-glob`で読み込んでいるCSSでも[@apply](https://tailwindcss.com/docs/functions-and-directives#apply-directive)の利用が可能です。

[daisyUI](https://daisyui.com/)を読み込んでいますが、不要な場合は`@plugin "daisyui";`を削除してください。


```css
@layer theme, base, foundation, layout, components, projects, utilities;
@import "./import-glob.css";
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@plugin "daisyui";

@theme {
〜
}
```

`src/css/import-glob.css` は `postcss-import-ext-glob` の誤動作を防ぐために別ファイルにしています。  
※custom-mediaにlayerを指定するとエラーになります。

```css
@import-glob "./custom-media/**/*.css";
@import-glob "./foundation/**/*.css" layer(foundation);
@import-glob "./layout/**/*.css" layer(layout);
@import-glob "./object/components/**/*.css" layer(components);
@import-glob "./object/projects/**/*.css" layer(projects);
@import-glob "./object/utilities/**/*.css" layer(utilities);
```


## Directory

```text
├─ dist/
│   ├─ css/
│   │   └─ styles.css
│   ├─ js/
│   │   └─ main.js
│   ├─ img/
│   └─ index.html
├─ public/：静的ファイル
├─ src/
│   ├─ css/
│   │   ├─ custom-media/
│   │   │  ├─ _breakpoint.css：ブレークポイントの@custom-media
│   │   │  └─ _other.css：その他@custom-media
│   │   ├─ foundation/: Tailwind以外のCSS変数やbodyに指定するCSS等
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ object/
│   │   │  ├─ component/：UIコンポーネント（再利用可能な最小単位）
│   │   │  ├─ projects/：コンポーネントの組み合わせ（ページ単位のパーツ）
│   │   │  └─ utility/：ユーティリティ（Skip to Content等）
│   │   ├─ import-glob.css: glob用。
│   │   └─ styles.css
│   ├─ js/
│   │   ├─ modules/
│   │   └─ main.js
│   └─ img/
├─ tests/
│   └─ axe.spec.js：@axe-core/playwright設定ファイル
├─ .editorconfig
├─ .gitignore
├─ .markuplintrc
├─ .node-version
├─ biome.json
├─ index.html
├─ mise.toml
├─ package-lock.json
├─ package.json
├─ playwright.config.js
├─ postcss.config.mjs
├─ README.md
└─ vite.config.js
```

## Breakpoint / Media queries

| tailwind | @custom-media | css |
| :--- | :---   | :--- |
|     | @media (--under-xs) {} |  @media (width <360px) {} |
| xs: | @media (--xs) {} |  @media (width >= 360px) {} |
|     | @media (--under-sm) {} |  @media (width < 400px) {} |
| sm: | @media (--sm) {} |  @media (width >= 400px) {} |
|     | @media (--under-md) {} |  @media (width < 800px) {} |
| md: | @media (--md) {} |  @media (width >= 800px) {} |
|     | @media (--under-lg) {} |  @media (width < 1280px) {} |
| lg: | @media (--lg) {} |  @media (width >= 1280px) {} |
|     | @media (--under-xl) {} |  @media (width < 1440px) {} |
| xl: | @media (--xl) {} |  @media (width >= 1440px) {} |
|     | @media (--under-2xl) {} |  @media (width < 1600px) {} |
| 2xl: | @media (--2xl) {} |  @media (width >= 1600px) {} |
|     | @media (--xs-sm) {} |  @media (360px <= width < 400px) {} |
|     | @media (--xs-md) {} |  @media (360px <= width < 800px) {} |
|     | @media (--xs-lg) {} |  @media (360px <= width < 1280px) {} |
|     | @media (--xs-xl) {} |  @media (360px <= width < 1440px) {} |
|     | @media (--xs-2xl) {} |  @media (360px <= width < 1600px) {} |
|     | @media (--sm-md) {} |  @media (400px <= width < 800px) {} |
|     | @media (--sm-lg) {} |  @media (400px <= width < 1280px) {} |
|     | @media (--sm-xl) {} |  @media (400px <= width < 1440px) {} |
|     | @media (--sm-2xl) {} |  @media (400px <= width < 1600px) {} |
|     | @media (--md-lg) {} |  @media (800px <= width < 1280px) {} |
|     | @media (--md-xl) {} |  @media (800px <= width < 1440px) {} |
|     | @media (--md-2xl) {} |  @media (800px <= width < 1600px) {} |
|     | @media (--lg-xl) {} |  @media (1280px <= width < 1440px) {} |
|     | @media (--lg-2xl) {} |  @media (1280px <= width < 1600px) {} |
|     | @media (--xl-2xl) {} |  @media (1440px <= width < 1600px) {} |
| landscape: | @media (--landscape) {} |  @media (orientation: landscape) {} |
| portrait: | @media (--portrait) {} |  @media (orientation: portrait) {} |
| motion-reduce: | @media (--reduce) {} |  @media (prefers-reduced-motion: reduce) {} |
|                | @media (--not-reduce) {} |  @media (prefers-reduced-motion: no-preferene) {} |
| dark: | @media (--dark) {} |  @media (prefers-color-scheme: dark) {} |
|       | @media (--light) {} |  @media (prefers-color-scheme: light) {} |


## Editor setup(VSCode)
- [Tailwind CSS IntelliSence](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [MarkupLint](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint)