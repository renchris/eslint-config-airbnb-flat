import type { Linter } from 'eslint'

/**
 * Airbnb React + JSX-a11y rules — 18 rules from airbnb/javascript.
 *
 * Sources: react.js, react-a11y.js
 * These are rules that Airbnb sets ON TOP of eslint-plugin-react recommended
 * and eslint-plugin-jsx-a11y recommended.
 *
 * Excluded (already in react recommended): no-danger-with-children, no-unescaped-entities, no-children-prop
 */
export const reactRules: Linter.RulesRecord = {
  // ==========================================================================
  // React (react.js)
  // ==========================================================================

  // Warn on dangerouslySetInnerHTML usage
  'react/no-danger': 'warn',

  // Prevent extra closing tags for components without children
  'react/self-closing-comp': 'error',

  // Enforce boolean attributes notation in JSX
  'react/jsx-boolean-value': ['error', 'never', { always: [] }],

  // Enforce curly braces or disallow unnecessary curly braces in JSX
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

  // Enforce shorthand or standard form for React fragments
  'react/jsx-fragments': ['error', 'syntax'],

  // Disallow unnecessary fragments
  'react/jsx-no-useless-fragment': 'error',

  // Enforce PascalCase for user-defined JSX components
  'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],

  // Prevent usage of Array index in keys
  'react/no-array-index-key': 'error',

  // Prevent creating unstable components inside components
  'react/no-unstable-nested-components': 'error',

  // Enforce consistent usage of destructuring assignment
  'react/destructuring-assignment': ['error', 'always'],

  // Prevent react contexts from taking non-stable values
  'react/jsx-no-constructed-context-values': 'error',

  // Enforce that namespaces are not used in React elements
  'react/no-namespace': 'error',

  // Enforce usage of button type attribute
  'react/button-has-type': ['error', {
    button: true,
    submit: true,
    reset: false,
  }],

  // Prevent this from being used in stateless functional components
  'react/no-this-in-sfc': 'error',

  // Prevent usage of `javascript:` URLs in JSX
  'react/jsx-no-script-url': ['error', [
    { name: 'Link', props: ['to'] },
  ]],

  // Prevent void DOM elements from receiving children
  'react/void-dom-elements-no-children': 'error',

  // Require style prop value be an object or var
  'react/style-prop-object': 'error',

  // ==========================================================================
  // JSX-a11y overrides (react-a11y.js)
  // ==========================================================================

  // Airbnb sets ignoreNonDOM: true (jsx-a11y recommended does not)
  'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
}
