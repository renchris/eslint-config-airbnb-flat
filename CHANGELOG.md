# eslint-config-flat-airbnb

## 0.3.0

### Minor Changes

- [`dcee4f4`](https://github.com/renchris/eslint-config-airbnb-flat/commit/dcee4f4932ceceb92e6730eb84bf34ec99376539) Thanks [@renchris](https://github.com/renchris)! - Add comprehensive stylistic test coverage (14 new tests) and complete documentation for the `stylistic` option. README now includes usage examples for `stylistic: true` and `stylistic: { overrides: {...} }`. docs/rules.md documents all 76 stylistic rules with full audit trail matching Airbnb source.

## 0.2.0

### Minor Changes

- [`2ec23a7`](https://github.com/renchris/eslint-config-airbnb-flat/commit/2ec23a7ee93c58941a591967dbac1825ba55bc2d) Thanks [@renchris](https://github.com/renchris)! - Initial release — Airbnb ESLint 9 flat config with 1:1 rule parity. 140 rules (101 base, 27 React, 12 TypeScript) audited against Airbnb source.

- [`a7a61bf`](https://github.com/renchris/eslint-config-airbnb-flat/commit/a7a61bf591ba4e63e95a2e18da482fe3d2d8f995) Thanks [@renchris](https://github.com/renchris)! - Add `stylistic` option — 76 Airbnb formatting rules via @stylistic/eslint-plugin. Opt-in with `stylistic: true`. Includes base formatting (indent, quotes, semi, commas, spacing), JSX formatting, and TypeScript overrides. Removed deprecated `jsx-indent` and `jsx-props-no-multi-spaces` in favor of unified equivalents.
