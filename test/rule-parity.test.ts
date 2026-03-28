import { describe, it, expect } from 'vitest'
import airbnb from '../src/index.js'
import { baseRules } from '../src/configs/base.js'
import { reactRules } from '../src/configs/react.js'
import { typescriptRules } from '../src/configs/typescript.js'

describe('rule parity with Airbnb', () => {
  describe('base rules (97)', () => {
    const ruleNames = Object.keys(baseRules)

    it('has exactly 97 base rules', () => {
      expect(ruleNames).toHaveLength(97)
    })

    it('includes all Airbnb best-practices rules', () => {
      const required = [
        'no-await-in-loop',
        'no-promise-executor-return',
        'array-callback-return',
        'consistent-return',
        'eqeqeq',
        'no-eval',
        'no-param-reassign',
        'no-return-assign',
        'prefer-promise-reject-errors',
        'radix',
        'yoda',
      ]
      for (const rule of required) {
        expect(ruleNames, `missing rule: ${rule}`).toContain(rule)
      }
    })

    it('includes all Airbnb es6 rules', () => {
      const required = [
        'arrow-body-style',
        'no-var',
        'object-shorthand',
        'prefer-arrow-callback',
        'prefer-const',
        'prefer-destructuring',
        'prefer-rest-params',
        'prefer-spread',
        'prefer-template',
      ]
      for (const rule of required) {
        expect(ruleNames, `missing rule: ${rule}`).toContain(rule)
      }
    })

    it('includes all Airbnb style rules', () => {
      const required = [
        'no-bitwise',
        'no-continue',
        'no-nested-ternary',
        'no-plusplus',
        'no-restricted-syntax',
        'no-underscore-dangle',
        'new-cap',
        'one-var',
        'spaced-comment',
        'max-len',
      ]
      for (const rule of required) {
        expect(ruleNames, `missing rule: ${rule}`).toContain(rule)
      }
    })

    it('has correct eqeqeq options (Airbnb: always, null: ignore)', () => {
      expect(baseRules.eqeqeq).toEqual(['error', 'always', { null: 'ignore' }])
    })

    it('has correct no-param-reassign options (Airbnb: props true)', () => {
      const rule = baseRules['no-param-reassign'] as [string, Record<string, unknown>]
      expect(rule[0]).toBe('error')
      expect(rule[1].props).toBe(true)
      expect(rule[1].ignorePropertyModificationsFor).toContain('acc')
      expect(rule[1].ignorePropertyModificationsFor).toContain('req')
      expect(rule[1].ignorePropertyModificationsFor).toContain('res')
    })

    it('has correct prefer-const options (Airbnb: destructuring any)', () => {
      expect(baseRules['prefer-const']).toEqual(['error', {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      }])
    })

    it('has ForInStatement and ForOfStatement in no-restricted-syntax', () => {
      const rule = baseRules['no-restricted-syntax'] as [string, ...Array<{ selector: string }>]
      const selectors = rule.slice(1).map((r) => (r as { selector: string }).selector)
      expect(selectors).toContain('ForInStatement')
      expect(selectors).toContain('ForOfStatement')
      expect(selectors).toContain('LabeledStatement')
      expect(selectors).toContain('WithStatement')
    })

    it('has all 10 no-restricted-properties entries', () => {
      const rule = baseRules['no-restricted-properties'] as [string, ...Array<Record<string, unknown>>]
      const entries = rule.slice(1)
      expect(entries).toHaveLength(10)
      const descriptions = entries.map((e) =>
        [e.object, e.property].filter(Boolean).join('.'),
      )
      expect(descriptions).toContain('arguments.callee')
      expect(descriptions).toContain('global.isFinite')
      expect(descriptions).toContain('self.isFinite')
      expect(descriptions).toContain('window.isFinite')
      expect(descriptions).toContain('global.isNaN')
      expect(descriptions).toContain('self.isNaN')
      expect(descriptions).toContain('window.isNaN')
      expect(descriptions).toContain('Math.pow')
      // Property-only entries (no object specified)
      const propertyOnly = entries.filter((e) => !e.object).map((e) => e.property)
      expect(propertyOnly).toContain('__defineGetter__')
      expect(propertyOnly).toContain('__defineSetter__')
    })

    it('has all 11 no-param-reassign ignorePropertyModificationsFor entries', () => {
      const rule = baseRules['no-param-reassign'] as [string, Record<string, unknown>]
      const allowList = rule[1].ignorePropertyModificationsFor as string[]
      expect(allowList).toHaveLength(11)
      const expected = [
        'acc', 'accumulator', 'e', 'ctx', 'context',
        'req', 'request', 'res', 'response', '$scope', 'staticContext',
      ]
      for (const name of expected) {
        expect(allowList, `missing: ${name}`).toContain(name)
      }
    })

    it('has correct max-len options (100 chars, tab width 2)', () => {
      const rule = baseRules['max-len'] as [string, number, number, Record<string, unknown>]
      expect(rule[0]).toBe('error')
      expect(rule[1]).toBe(100)
      expect(rule[2]).toBe(2)
      expect(rule[3].ignoreUrls).toBe(true)
      expect(rule[3].ignoreComments).toBe(false)
      expect(rule[3].ignoreRegExpLiterals).toBe(true)
      expect(rule[3].ignoreStrings).toBe(true)
      expect(rule[3].ignoreTemplateLiterals).toBe(true)
    })
  })

  describe('react rules (26)', () => {
    const ruleNames = Object.keys(reactRules)

    it('has exactly 26 react rules', () => {
      expect(ruleNames).toHaveLength(26)
    })

    it('includes critical Airbnb React rules', () => {
      const required = [
        'react/self-closing-comp',
        'react/jsx-boolean-value',
        'react/jsx-no-useless-fragment',
        'react/jsx-pascal-case',
        'react/no-array-index-key',
        'react/no-unstable-nested-components',
        'react/destructuring-assignment',
        'react/button-has-type',
      ]
      for (const rule of required) {
        expect(ruleNames, `missing rule: ${rule}`).toContain(rule)
      }
    })

    it('includes jsx-a11y/no-autofocus with ignoreNonDOM', () => {
      expect(reactRules['jsx-a11y/no-autofocus']).toEqual(
        ['error', { ignoreNonDOM: true }],
      )
    })

    it('excludes rules already in react recommended', () => {
      // These are in eslint-plugin-react recommended — we don't re-declare them
      expect(ruleNames).not.toContain('react/no-danger-with-children')
      expect(ruleNames).not.toContain('react/no-unescaped-entities')
      expect(ruleNames).not.toContain('react/no-children-prop')
    })
  })

  describe('typescript rules (9 pairs)', () => {
    const ruleNames = Object.keys(typescriptRules)

    it('has exactly 18 entries (9 base-off + 9 TS-on)', () => {
      expect(ruleNames).toHaveLength(18)
    })

    it('turns off base rules before enabling TS equivalents', () => {
      const pairs = [
        ['camelcase', '@typescript-eslint/naming-convention'],
        ['dot-notation', '@typescript-eslint/dot-notation'],
        ['no-shadow', '@typescript-eslint/no-shadow'],
        ['no-use-before-define', '@typescript-eslint/no-use-before-define'],
        ['no-loop-func', '@typescript-eslint/no-loop-func'],
        ['no-implied-eval', '@typescript-eslint/no-implied-eval'],
        ['no-throw-literal', '@typescript-eslint/only-throw-error'],
        ['no-unused-expressions', '@typescript-eslint/no-unused-expressions'],
        ['no-return-await', '@typescript-eslint/return-await'],
      ]
      for (const [base, ts] of pairs) {
        expect(typescriptRules[base], `${base} should be 'off'`).toBe('off')
        expect(typescriptRules[ts], `${ts} should be defined`).toBeDefined()
      }
    })

    it('has correct naming-convention format options', () => {
      const rule = typescriptRules['@typescript-eslint/naming-convention'] as unknown[]
      expect(rule[0]).toBe('error')
      const variableRule = rule.find(
        (r) => typeof r === 'object' && r !== null && 'selector' in r && (r as Record<string, unknown>).selector === 'variable',
      ) as Record<string, unknown> | undefined
      expect(variableRule?.format).toEqual(['camelCase', 'PascalCase', 'UPPER_CASE'])
    })

    it('has @typescript-eslint/return-await set to in-try-catch mode', () => {
      expect(typescriptRules['@typescript-eslint/return-await']).toEqual(['error', 'in-try-catch'])
    })
  })

  describe('full config composition', () => {
    it('all configs have a name field', () => {
      const configs = airbnb({ typescript: true, react: true })
      for (const config of configs) {
        if (config.rules || config.plugins) {
          expect(config.name, `config missing name: ${JSON.stringify(Object.keys(config))}`).toBeDefined()
        }
      }
    })

    it('eslint-recommended comes first', () => {
      const configs = airbnb()
      const firstNamed = configs.find((c) => c.name?.startsWith('airbnb-flat/'))
      expect(firstNamed?.name).toBe('airbnb-flat/eslint-recommended')
    })

    it('base rules come after recommended configs', () => {
      const configs = airbnb({ typescript: true, react: true })
      const names = configs.map((c) => c.name).filter(Boolean)
      const baseIdx = names.indexOf('airbnb-flat/base')
      const eslintIdx = names.indexOf('airbnb-flat/eslint-recommended')
      expect(baseIdx).toBeGreaterThan(eslintIdx)
    })

    it('composition order: recommended < base < react < typescript < user-overrides < user-configs', () => {
      const customConfig = { name: 'my-app/custom', rules: { 'no-debugger': 'off' as const } }
      const configs = airbnb(
        {
          typescript: true,
          react: true,
          overrides: { 'no-console': 'off' },
        },
        customConfig,
      )
      const names = configs.map((c) => c.name).filter(Boolean) as string[]

      const eslintIdx = names.indexOf('airbnb-flat/eslint-recommended')
      const baseIdx = names.indexOf('airbnb-flat/base')
      const reactIdx = names.indexOf('airbnb-flat/react')
      const tsIdx = names.indexOf('airbnb-flat/typescript')
      const overridesIdx = names.indexOf('airbnb-flat/user-overrides')
      const customIdx = names.indexOf('my-app/custom')

      expect(eslintIdx).toBeGreaterThanOrEqual(0)
      expect(baseIdx).toBeGreaterThan(eslintIdx)
      expect(reactIdx).toBeGreaterThan(baseIdx)
      expect(tsIdx).toBeGreaterThan(reactIdx)
      expect(overridesIdx).toBeGreaterThan(tsIdx)
      expect(customIdx).toBeGreaterThan(overridesIdx)
    })

    it('every airbnb-flat/ name is present in the full config', () => {
      const configs = airbnb({ typescript: true, react: true })
      const names = configs.map((c) => c.name).filter(Boolean) as string[]
      const required = [
        'airbnb-flat/eslint-recommended',
        'airbnb-flat/language-options',
        'airbnb-flat/typescript-parser',
        'airbnb-flat/react-recommended',
        'airbnb-flat/react-jsx-runtime',
        'airbnb-flat/react-hooks',
        'airbnb-flat/jsx-a11y-recommended',
        'airbnb-flat/react-settings',
        'airbnb-flat/base',
        'airbnb-flat/react',
        'airbnb-flat/typescript',
      ]
      for (const name of required) {
        expect(names, `missing config: ${name}`).toContain(name)
      }
    })

    it('every config object with rules or plugins has a name', () => {
      const configs = airbnb({ typescript: true, react: true })
      const unnamed = configs.filter(
        (c) => !c.name && (c.rules || c.plugins),
      )
      expect(unnamed).toHaveLength(0)
    })
  })
})
