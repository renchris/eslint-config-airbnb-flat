# eslint-config-airbnb-flat

Airbnb's ESLint style guide for **ESLint 9+ flat config** with TypeScript and React support.

**1:1 rule parity** with `eslint-config-airbnb` -- 350 rules audited against the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) source, 207 kept with exact option parity, 104 dropped with documented rationale.

140 rules on top of recommended configs: 101 base JavaScript, 27 React + JSX-a11y, 12 TypeScript.

## Why This Package?

- `eslint-config-airbnb` hasn't been updated since 2021 and doesn't support ESLint 9 flat config
- `eslint-config-airbnb-typescript` is archived
- ESLint 8 is end-of-life (Oct 2024), ESLint 10 dropped `.eslintrc` entirely
- **3.5 million weekly downloads** with no upgrade path -- until now

## Install

```bash
pnpm add -D eslint-config-airbnb-flat eslint
```

## Usage

### Full Stack (React + TypeScript)

```js
// eslint.config.mjs
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb({ typescript: true, react: true })
```

### Base Only (JavaScript)

```js
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb()
```

### TypeScript Only (No React)

```js
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb({ typescript: true })
```

### With Custom Overrides

```js
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb(
  {
    typescript: true,
    react: true,
    overrides: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // Additional flat config objects as rest params
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'react/jsx-props-no-spreading': 'off',
    },
  },
)
```

### With Feature Overrides

```js
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb({
  typescript: {
    overrides: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  react: {
    overrides: {
      'react/destructuring-assignment': 'off',
    },
  },
})
```

### With Ignores

```js
import airbnb from 'eslint-config-airbnb-flat'

export default airbnb(
  { typescript: true, react: true },
  { ignores: ['dist/', 'node_modules/', '.next/', '*.config.js'] },
)
```

### With Next.js

```js
import airbnb from 'eslint-config-airbnb-flat'
import nextPlugin from '@next/eslint-plugin-next'

export default airbnb(
  { typescript: true, react: true },
  nextPlugin.flatConfig.recommended,
)
```

### With ESLint 10 `defineConfig()`

```js
import { defineConfig } from 'eslint/config'
import airbnb from 'eslint-config-airbnb-flat'

export default defineConfig(...airbnb({ typescript: true, react: true }))
```

## What's Included

### Base (always enabled)

- `eslint:recommended` (42 core rules)
- **101 Airbnb rules**: best practices, ES6+, variables, style

> Note: `typescript-eslint:recommended` and the TypeScript parser are only loaded when `typescript: true` is passed.

### React (opt-in: `react: true`)

- `eslint-plugin-react` recommended + jsx-runtime
- `eslint-plugin-react-hooks` (rules-of-hooks, exhaustive-deps)
- `eslint-plugin-jsx-a11y` recommended
- **27 Airbnb React rules**: self-closing-comp, jsx-boolean-value, no-array-index-key, jsx-props-no-spreading, etc.

### TypeScript (opt-in: `typescript: true`)

- **12 Airbnb TypeScript rule pairs**: turns off base rule, enables `@typescript-eslint` equivalent
- naming-convention, dot-notation, no-shadow, no-use-before-define, no-loop-func, no-implied-eval, only-throw-error, no-unused-expressions, return-await, no-unused-vars, no-useless-constructor, no-array-constructor

## Rule Audit

Every rule decision is documented in [`docs/rules.md`](./docs/rules.md) with:
- Source file in the Airbnb repo (best-practices.js, es6.js, etc.)
- Exact options with parity verification
- Rationale for dropped rules (PropTypes, class components, formatting, TS-redundant, import plugin)

## Dropped Rule Categories

| Category | Count | Reason |
|----------|-------|--------|
| Formatting / stylistic | ~60 | Handled by Prettier or `@stylistic/eslint-plugin` |
| PropTypes | ~8 | TypeScript replaces runtime type checking |
| Class components | ~10 | Modern React uses function components |
| `eslint-plugin-import` | ~25 | Plugin has chronic ESLint 9 issues; TypeScript handles imports |
| TS-redundant | ~5 | Already enforced by `typescript-eslint:recommended` |

## Migrating from `eslint-config-airbnb`

1. Remove old packages:
   ```bash
   pnpm remove eslint-config-airbnb eslint-config-airbnb-base eslint-config-airbnb-typescript \
     @typescript-eslint/eslint-plugin @typescript-eslint/parser \
     eslint-plugin-import
   ```

2. Install this package:
   ```bash
   pnpm add -D eslint-config-airbnb-flat eslint
   ```

3. Replace your `.eslintrc.js` with `eslint.config.mjs`:
   ```js
   import airbnb from 'eslint-config-airbnb-flat'
   export default airbnb({ typescript: true, react: true })
   ```

4. Delete `.eslintrc.js` and `.eslintignore` (use `ignores` in flat config instead)

5. Update your lint script:
   ```json
   { "lint": "eslint src/" }
   ```

## Exports

| Export | Description |
|--------|-------------|
| `default` | Factory function `airbnb(options, ...configs)` |
| `baseRules` | Raw base rules object (101 rules) |
| `reactRules` | Raw React rules object (27 rules) |
| `ReactOptions` | TypeScript type for React options |
| `TypeScriptOptions` | TypeScript type for TypeScript options |
| `typescriptRules` | Raw TypeScript rules object (9 pairs) |
| `AirbnbOptions` | TypeScript type for options |

## Peer Dependencies

- `eslint` ^9.0.0 (required)
- `typescript` >=4.8.4 (optional)

All plugins are bundled as dependencies -- you don't need to install them separately.

## License

MIT. Based on [eslint-config-airbnb](https://github.com/airbnb/javascript), Copyright (c) 2012 Airbnb.
