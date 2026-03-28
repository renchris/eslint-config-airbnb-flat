import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import globals from 'globals'
import type { Linter } from 'eslint'
import type { AirbnbOptions, ReactOptions, TypeScriptOptions } from './types.js'
import { baseRules } from './configs/base.js'
import { reactRules } from './configs/react.js'
import { typescriptRules } from './configs/typescript.js'

export type { AirbnbOptions, ReactOptions, TypeScriptOptions }
export { baseRules, reactRules, typescriptRules }

/**
 * Airbnb ESLint config for ESLint 9+ flat config.
 *
 * 1:1 rule parity with eslint-config-airbnb, audited against the Airbnb source.
 * 140 rules on top of recommended configs (101 base, 27 React, 12 TypeScript).
 *
 * With no options, produces a pure JavaScript config — typescript-eslint configs
 * and parser options are only included in the output when `typescript: true` is passed.
 * Note: All plugin packages are bundled as dependencies and statically imported.
 *
 * @example
 * ```ts
 * // eslint.config.mjs — Full stack
 * import airbnb from 'eslint-config-airbnb-flat'
 * export default airbnb({ typescript: true, react: true })
 *
 * // Base only (no React, no TypeScript — works without tsconfig.json)
 * export default airbnb()
 *
 * // With additional configs
 * export default airbnb(
 *   { typescript: true, react: true },
 *   { rules: { 'no-console': 'warn' } },
 * )
 * ```
 */
export default function airbnb(
  options: AirbnbOptions = {},
  ...userConfigs: Linter.Config[]
): Linter.Config[] {
  const {
    typescript = false,
    react = false,
    overrides,
  } = options

  const configs: Linter.Config[] = []
  const tsFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

  // -------------------------------------------------------------------------
  // 1. ESLint recommended (42 core JS rules)
  // -------------------------------------------------------------------------
  configs.push({
    ...js.configs.recommended,
    name: 'airbnb-flat/eslint-recommended',
  })

  // -------------------------------------------------------------------------
  // 2. typescript-eslint recommended (disables TS-redundant base rules)
  // -------------------------------------------------------------------------
  if (typescript) {
    for (const config of tseslint.configs.recommended) {
      configs.push({
        ...config,
        files: (config as Record<string, unknown>).files as string[] ?? tsFiles,
        name: config.name ?? 'airbnb-flat/typescript-eslint-recommended',
      })
    }
  }

  // -------------------------------------------------------------------------
  // 3. Global language options
  // -------------------------------------------------------------------------
  configs.push({
    name: 'airbnb-flat/language-options',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  })

  // -------------------------------------------------------------------------
  // 3b. TypeScript parser options (only when typescript is enabled)
  // -------------------------------------------------------------------------
  if (typescript) {
    const tsOpts = typeof typescript === 'object' ? typescript : {} as TypeScriptOptions
    configs.push({
      name: 'airbnb-flat/typescript-parser',
      files: tsFiles,
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsOpts.tsconfigRootDir ?? process.cwd(),
        },
      },
    })
  }

  // -------------------------------------------------------------------------
  // 4. React + JSX-a11y (if enabled)
  // -------------------------------------------------------------------------
  if (react) {
    configs.push({
      ...reactPlugin.configs.flat.recommended,
      name: 'airbnb-flat/react-recommended',
    })
    configs.push({
      ...reactPlugin.configs.flat['jsx-runtime'],
      name: 'airbnb-flat/react-jsx-runtime',
    })
    configs.push({
      name: 'airbnb-flat/react-hooks',
      plugins: { 'react-hooks': reactHooksPlugin },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    })
    configs.push({
      ...jsxA11yPlugin.flatConfigs.recommended,
      name: 'airbnb-flat/jsx-a11y-recommended',
    })
    configs.push({
      name: 'airbnb-flat/react-settings',
      settings: { react: { version: 'detect' } },
    })
  }

  // -------------------------------------------------------------------------
  // 5. Airbnb base rules (101 rules)
  // -------------------------------------------------------------------------
  configs.push({
    name: 'airbnb-flat/base',
    rules: { ...baseRules },
  })

  // -------------------------------------------------------------------------
  // 6. Airbnb React rules (27 rules, if enabled)
  // -------------------------------------------------------------------------
  if (react) {
    const reactOpts = typeof react === 'object' ? react : {} as ReactOptions
    configs.push({
      name: 'airbnb-flat/react',
      rules: {
        ...reactRules,
        ...reactOpts.overrides,
      },
    })
  }

  // -------------------------------------------------------------------------
  // 7. Airbnb TypeScript overrides (9 rule pairs, if enabled)
  // -------------------------------------------------------------------------
  if (typescript) {
    const tsOpts = typeof typescript === 'object' ? typescript : {} as TypeScriptOptions
    configs.push({
      name: 'airbnb-flat/typescript',
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      rules: {
        ...typescriptRules,
        ...tsOpts.overrides,
      },
    })
  }

  // -------------------------------------------------------------------------
  // 8. User base overrides
  // -------------------------------------------------------------------------
  if (overrides) {
    configs.push({
      name: 'airbnb-flat/user-overrides',
      rules: overrides,
    })
  }

  // -------------------------------------------------------------------------
  // 9. Additional user configs (rest params)
  // -------------------------------------------------------------------------
  for (const config of userConfigs) {
    configs.push(config)
  }

  return configs
}
