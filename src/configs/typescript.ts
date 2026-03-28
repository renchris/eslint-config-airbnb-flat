import type { Linter } from 'eslint'

/**
 * Airbnb TypeScript overrides — 9 rule pairs from @kesills/eslint-config-airbnb-typescript.
 *
 * Pattern: Turn off the base ESLint rule, enable the @typescript-eslint equivalent.
 * This prevents false positives from base rules that don't understand TypeScript syntax.
 */
export const typescriptRules: Linter.RulesRecord = {
  // Naming convention (replaces camelcase)
  camelcase: 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
    { selector: 'function', format: ['camelCase', 'PascalCase'] },
    { selector: 'typeLike', format: ['PascalCase'] },
  ],

  // Use dot notation whenever possible (type-aware)
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

  // Disallow variable shadowing (type-aware)
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',

  // Disallow use of variables before they are defined (type-aware)
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error', {
    functions: true,
    classes: true,
    variables: true,
  }],

  // Disallow creation of functions within loops (type-aware)
  'no-loop-func': 'off',
  '@typescript-eslint/no-loop-func': 'error',

  // Disallow use of eval()-like methods (type-aware)
  'no-implied-eval': 'off',
  '@typescript-eslint/no-implied-eval': 'error',

  // Restrict what can be thrown as an exception (type-aware)
  'no-throw-literal': 'off',
  '@typescript-eslint/only-throw-error': 'error',

  // Disallow unused expressions (type-aware)
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': ['error', {
    allowShortCircuit: false,
    allowTernary: false,
    allowTaggedTemplates: false,
  }],

  // Disallow redundant return await (type-aware)
  'no-return-await': 'off',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],
}
