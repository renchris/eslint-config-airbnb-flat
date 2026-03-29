declare module 'confusing-browser-globals' {
  const globals: string[]
  export default globals
}

declare module 'eslint-plugin-jsx-a11y' {
  import type { Linter, ESLint } from 'eslint'

  const plugin: ESLint.Plugin & {
    flatConfigs: {
      recommended: Linter.Config
      strict: Linter.Config
    }
  }
  export default plugin
}

declare module 'eslint-plugin-react-hooks' {
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}

declare module '@stylistic/eslint-plugin' {
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}

declare module 'eslint-plugin-import-x' {
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}
