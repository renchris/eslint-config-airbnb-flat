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
