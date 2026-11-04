# Sveriges monarker

En svenskspråkig, responsiv regentlängd med monarker sorterade nyast först, sökning, ättfilter, faktarutor och en släktvy som visar kända förälder–barn-relationer.

## Kör lokalt

```sh
npm install
npm run dev
```

## Publicering

GitHub Actions bygger sidan och publicerar `dist/` till GitHub Pages vid varje push till `main`. I repots inställningar ska Pages vara konfigurerat med **GitHub Actions** som källa.

## Historisk noggrannhet

Regeringsår och släktband bland de tidiga monarkerna är ibland omdiskuterade. Datan markerar ungefärliga år och osäkerhet där det är relevant. Släktvyn kopplar bara ihop personer där förälder–barn-relationen uttryckligen finns i datan.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
