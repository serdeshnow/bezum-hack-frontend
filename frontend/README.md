# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.mjs
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
<table>
    <thead>
        <tr>
            <th>📂 Где храним?</th>
            <th>🛠 Как подключаем?</th>
            <th>📌 Когда использовать?</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>/public/images/</code></td>
            <td><pre><code>&lt;img src="/images/logo.png" /&gt;</code></pre></td>
            <td>Обычные картинки (JPG, PNG, статические SVG)</td>
        </tr>
        <tr>
            <td><code>/src/shared/assets/icons/</code></td>
            <td><pre><code>import Icon from '@/shared/assets/icons/menu.svg'
</code></pre></td>
            <td>Когда нужен SVG как React-компонент</td>
        </tr>
        <tr>
            <td><code>/public/icons/</code></td>
            <td><pre><code>&lt;img src="/icons/icon.svg" /&gt;</code></pre></td>
            <td>Когда SVG не нужно стилизовать в коде</td>
        </tr>
    </tbody>
</table>
