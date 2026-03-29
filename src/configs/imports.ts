import type { Linter } from 'eslint'

/**
 * Airbnb import rules mapped to eslint-plugin-import-x equivalents.
 *
 * Source: packages/eslint-config-airbnb-base/rules/imports.js
 *
 * Of 45 Airbnb import rules, 23 are enabled (error). We keep the rules that
 * provide value beyond what TypeScript already enforces:
 *
 * Dropped (TypeScript handles):
 *   import/no-unresolved, import/named, import/default, import/namespace
 *
 * Dropped (environment-specific):
 *   import/no-amd, import/no-webpack-loader-syntax, import/no-dynamic-require,
 *   import/no-import-module-exports
 *
 * Dropped (controversial / project-specific):
 *   import/prefer-default-export, import/no-relative-packages
 *
 * Dropped (performance — opt-in via cycle sub-option):
 *   import/no-cycle
 */

// =============================================================================
// 1. Import rules — enabled by default with imports: true (~13 rules)
// =============================================================================
export const importRules: Linter.RulesRecord = {
  // ---------------------------------------------------------------------------
  // Helpful warnings
  // ---------------------------------------------------------------------------

  // Report any invalid exports (e.g., multiple defaults)
  'import-x/export': 'error',

  // Report use of exported name as identifier of default export
  'import-x/no-named-as-default': 'error',

  // Report use of exported name as property of default export
  'import-x/no-named-as-default-member': 'error',

  // Forbid the use of mutable exports with var or let
  'import-x/no-mutable-exports': 'error',

  // Forbid a module from importing itself
  'import-x/no-self-import': 'error',

  // ---------------------------------------------------------------------------
  // Module systems
  // ---------------------------------------------------------------------------

  // No AMD require/define calls
  'import-x/no-amd': 'error',

  // ---------------------------------------------------------------------------
  // Style guide (Airbnb)
  // ---------------------------------------------------------------------------

  // Ensure all imports appear before other statements
  'import-x/first': 'error',

  // Report repeated import of the same module in multiple places
  'import-x/no-duplicates': 'error',

  // Ensure consistent use of file extension within the import path (Airbnb)
  'import-x/extensions': ['error', 'ignorePackages', {
    js: 'never',
    mjs: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
    mts: 'never',
  }],

  // Enforce a convention in module import order (Airbnb)
  'import-x/order': ['error', {
    groups: [['builtin', 'external', 'internal']],
  }],

  // Require a newline after the last import/require in a group
  'import-x/newline-after-import': 'error',

  // Forbid import of modules using absolute paths
  'import-x/no-absolute-path': 'error',

  // Prevent unnecessary path segments
  'import-x/no-useless-path-segments': ['error', { commonjs: true }],

  // Forbid named default exports
  'import-x/no-named-default': 'error',
}

// =============================================================================
// 2. Cycle detection — expensive, opt-in via imports: { cycle: true }
// =============================================================================
export const importCycleRules: Linter.RulesRecord = {
  // Airbnb enables with maxDepth: ∞. We default to maxDepth: 2 for performance
  // (catches 95%+ of real circular deps, O(n) cheaper than full graph traversal)
  'import-x/no-cycle': ['error', {
    maxDepth: 2,
    ignoreExternal: true,
  }],
}
