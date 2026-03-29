import { describe, it, expect } from 'vitest'
import { ESLint } from 'eslint'
import airbnb from '../src/index.js'

describe('integration: ESLint lints with this config', () => {
  it('base config catches no-var and eqeqeq', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb(),
    })
    const results = await eslint.lintText('var x = 1;\nif (x == 2) {}\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).toContain('no-var')
    expect(ruleIds).toContain('eqeqeq')
  })

  it('react config loads without errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb({ react: true }),
    })
    const results = await eslint.lintText('const x = 1\n', { filePath: 'test.jsx' })
    expect(results[0].fatalErrorCount).toBe(0)
  })

  it('base config catches no-console', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb(),
    })
    const results = await eslint.lintText('console.log("hello");\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).toContain('no-console')
  })

  it('user overrides take effect', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb({ overrides: { 'no-console': 'off' } }),
    })
    const results = await eslint.lintText('console.log("hello");\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).not.toContain('no-console')
  })

  it('stylistic catches wrong quotes', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb({ stylistic: true }),
    })
    const results = await eslint.lintText('const x = "hello";\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).toContain('@stylistic/quotes')
  })

  it('stylistic catches indent errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb({ stylistic: true }),
    })
    const results = await eslint.lintText('if (true) {\n    const x = 1;\n}\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).toContain('@stylistic/indent')
  })

  it('stylistic does not fire when disabled', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb(),
    })
    const results = await eslint.lintText('const x = "hello";\n', { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).not.toContain('@stylistic/quotes')
  })

  it('imports catches duplicate imports', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb({ imports: true }),
    })
    const code = 'import { foo } from \'bar\';\nimport { baz } from \'bar\';\n'
    const results = await eslint.lintText(code, { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).toContain('import-x/no-duplicates')
  })

  it('imports does not fire when disabled', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: airbnb(),
    })
    const code = 'import { foo } from \'bar\';\nimport { baz } from \'bar\';\n'
    const results = await eslint.lintText(code, { filePath: 'test.js' })
    const ruleIds = results[0].messages.map((m) => m.ruleId)
    expect(ruleIds).not.toContain('import-x/no-duplicates')
  })
})
