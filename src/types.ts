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
   * - `true`: Enable with defaults (18 rules: self-closing-comp, jsx-boolean-value, etc.)
   * - `false` or omitted: Disable
   * - `object`: Enable with custom overrides
   */
  react?: boolean | ReactOptions

  /**
   * Override specific base rules.
   */
  overrides?: Linter.RulesRecord
}
