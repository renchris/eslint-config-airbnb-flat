import type { Linter } from 'eslint'

export interface TypeScriptOptions {
  /**
   * Override specific TypeScript rules.
   */
  overrides?: Linter.RulesRecord

  /**
   * Root directory for resolving tsconfig.json.
   * Passed to typescript-eslint's `parserOptions.tsconfigRootDir`.
   * @default process.cwd()
   */
  tsconfigRootDir?: string
}

export interface ReactOptions {
  /**
   * Override specific React rules.
   */
  overrides?: Linter.RulesRecord
}

export interface StylisticOptions {
  /**
   * Override specific stylistic rules.
   */
  overrides?: Linter.RulesRecord
}

export interface ImportsOptions {
  /**
   * Override specific import rules.
   */
  overrides?: Linter.RulesRecord

  /**
   * Enable circular dependency detection via import-x/no-cycle.
   * Disabled by default due to significant performance cost.
   * When enabled, uses maxDepth: 2 and ignoreExternal: true.
   * @default false
   */
  cycle?: boolean
}

export interface AirbnbOptions {
  /**
   * Enable TypeScript support.
   * - `true`: Enable with defaults (9 rules: naming-convention, dot-notation, no-shadow, etc.)
   * - `false` or omitted: Disable
   * - `object`: Enable with custom overrides
   */
  typescript?: boolean | TypeScriptOptions

  /**
   * Enable React + JSX-a11y support.
   * - `true`: Enable with defaults (26 rules: self-closing-comp, jsx-boolean-value, etc.)
   * - `false` or omitted: Disable
   * - `object`: Enable with custom overrides
   */
  react?: boolean | ReactOptions

  /**
   * Enable formatting/stylistic rules via @stylistic/eslint-plugin.
   * - `true`: Enable with Airbnb defaults (~69 formatting rules)
   * - `false` or omitted: Disable (formatting left to Prettier/Biome/etc.)
   * - `object`: Enable with custom overrides
   */
  stylistic?: boolean | StylisticOptions

  /**
   * Enable import rules via eslint-plugin-import-x.
   * - `true`: Enable with Airbnb defaults (14 import rules)
   * - `false` or omitted: Disable
   * - `object`: Enable with custom overrides and cycle detection
   */
  imports?: boolean | ImportsOptions

  /**
   * Override specific base rules.
   */
  overrides?: Linter.RulesRecord
}
