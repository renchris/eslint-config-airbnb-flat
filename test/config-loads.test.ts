import { describe, it, expect } from 'vitest'
import airbnb from '../src/index.js'

describe('config loads', () => {
  it('returns an array of config objects', () => {
    const configs = airbnb()
    expect(Array.isArray(configs)).toBe(true)
    expect(configs.length).toBeGreaterThan(0)
  })

  it('base config has no fatal errors in structure', () => {
    const configs = airbnb()
    for (const config of configs) {
      expect(config).toBeDefined()
      if (config.rules) {
        expect(typeof config.rules).toBe('object')
      }
    }
  })

  it('loads with typescript enabled', () => {
    const configs = airbnb({ typescript: true })
    const tsConfig = configs.find((c) => c.name === 'airbnb-flat/typescript')
    expect(tsConfig).toBeDefined()
    expect(tsConfig?.rules?.['@typescript-eslint/naming-convention']).toBeDefined()
  })

  it('loads with react enabled', () => {
    const configs = airbnb({ react: true })
    const reactConfig = configs.find((c) => c.name === 'airbnb-flat/react')
    expect(reactConfig).toBeDefined()
    expect(reactConfig?.rules?.['react/self-closing-comp']).toBeDefined()
  })

  it('loads with both typescript and react enabled', () => {
    const configs = airbnb({ typescript: true, react: true })
    const names = configs.map((c) => c.name).filter(Boolean)
    expect(names).toContain('airbnb-flat/base')
    expect(names).toContain('airbnb-flat/typescript')
    expect(names).toContain('airbnb-flat/react')
    expect(names).toContain('airbnb-flat/react-hooks')
    expect(names).toContain('airbnb-flat/jsx-a11y-recommended')
  })

  it('does not include react configs when disabled', () => {
    const configs = airbnb()
    const names = configs.map((c) => c.name).filter(Boolean)
    expect(names).not.toContain('airbnb-flat/react')
    expect(names).not.toContain('airbnb-flat/react-hooks')
    expect(names).not.toContain('airbnb-flat/jsx-a11y-recommended')
  })

  it('does not include typescript config when disabled', () => {
    const configs = airbnb()
    const names = configs.map((c) => c.name).filter(Boolean)
    expect(names).not.toContain('airbnb-flat/typescript')
  })

  it('applies user overrides', () => {
    const configs = airbnb({ overrides: { 'no-console': 'off' } })
    const overrideConfig = configs.find((c) => c.name === 'airbnb-flat/user-overrides')
    expect(overrideConfig).toBeDefined()
    expect(overrideConfig?.rules?.['no-console']).toBe('off')
  })

  it('appends additional user configs', () => {
    const custom = { name: 'my-custom', rules: { 'no-debugger': 'off' } }
    const configs = airbnb({}, custom)
    expect(configs[configs.length - 1]).toBe(custom)
  })

  it('applies react overrides', () => {
    const configs = airbnb({
      react: { overrides: { 'react/no-danger': 'off' } },
    })
    const reactConfig = configs.find((c) => c.name === 'airbnb-flat/react')
    expect(reactConfig?.rules?.['react/no-danger']).toBe('off')
  })

  it('applies typescript overrides', () => {
    const configs = airbnb({
      typescript: { overrides: { '@typescript-eslint/no-shadow': 'warn' } },
    })
    const tsConfig = configs.find((c) => c.name === 'airbnb-flat/typescript')
    expect(tsConfig?.rules?.['@typescript-eslint/no-shadow']).toBe('warn')
  })
})
