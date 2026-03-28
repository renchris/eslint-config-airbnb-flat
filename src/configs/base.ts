import type { Linter } from 'eslint'

/**
 * Airbnb base JavaScript rules — 69 rules from airbnb/javascript.
 *
 * Sources: best-practices.js, es6.js, variables.js, style.js
 * These are rules that Airbnb sets ON TOP of eslint:recommended.
 * Rules identical to eslint:recommended or tseslint:recommended are excluded.
 */
export const baseRules: Linter.RulesRecord = {
  // ==========================================================================
  // Best Practices (best-practices.js)
  // ==========================================================================

  // Disallow await inside of loops
  'no-await-in-loop': 'error',

  // Disallow returning values from Promise executor
  'no-promise-executor-return': 'error',

  // Disallow template literal placeholder syntax in regular strings
  'no-template-curly-in-string': 'error',

  // Disallow loops with a body that allows only one iteration
  'no-unreachable-loop': ['error', { ignore: [] }],

  // Disallow specified global variables
  'no-restricted-globals': [
    'error',
    { name: 'isFinite', message: 'Use Number.isFinite instead' },
    { name: 'isNaN', message: 'Use Number.isNaN instead' },
  ],

  // Enforces return statements in callbacks of array methods
  'array-callback-return': ['error', { allowImplicit: true }],

  // Treat var statements as if they were block scoped
  'block-scoped-var': 'error',

  // Require return statements to either always or never specify values
  'consistent-return': 'error',

  // Specify curly brace conventions for all control statements
  curly: ['error', 'multi-line'],

  // Require default case in switch statements
  'default-case': ['error', { commentPattern: '^no default$' }],

  // Enforce default clauses in switch statements to be last
  'default-case-last': 'error',

  // Require the use of === and !==
  eqeqeq: ['error', 'always', { null: 'ignore' }],

  // Disallow the use of alert, confirm, and prompt
  'no-alert': 'warn',

  // Disallow use of arguments.caller or arguments.callee
  'no-caller': 'error',

  // Disallow returning value in constructor
  'no-constructor-return': 'error',

  // Disallow else after a return in an if
  'no-else-return': ['error', { allowElseIf: false }],

  // Disallow use of eval()
  'no-eval': 'error',

  // Disallow adding to native types
  'no-extend-native': 'error',

  // Disallow unnecessary function binding
  'no-extra-bind': 'error',

  // Disallow unnecessary labels
  'no-extra-label': 'error',

  // Disallow usage of __iterator__ property
  'no-iterator': 'error',

  // Disallow use of labels for anything other than loops and switches
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

  // Disallow unnecessary nested blocks
  'no-lone-blocks': 'error',

  // Disallow use of multiline strings
  'no-multi-str': 'error',

  // Disallow use of new operator when not part of assignment or comparison
  'no-new': 'error',

  // Disallows creating new instances of String, Number, and Boolean
  'no-new-wrappers': 'error',

  // Disallow reassignment of function parameters
  'no-param-reassign': ['error', {
    props: true,
    ignorePropertyModificationsFor: [
      'acc',
      'accumulator',
      'e',
      'ctx',
      'context',
      'req',
      'request',
      'res',
      'response',
      '$scope',
      'staticContext',
    ],
  }],

  // Disallow usage of __proto__ property
  'no-proto': 'error',

  // Disallow certain object properties
  'no-restricted-properties': ['error',
    { object: 'arguments', property: 'callee', message: 'arguments.callee is deprecated' },
    { object: 'global', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'self', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'window', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'global', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { object: 'self', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { object: 'window', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { property: '__defineGetter__', message: 'Please use Object.defineProperty instead.' },
    { property: '__defineSetter__', message: 'Please use Object.defineProperty instead.' },
    { object: 'Math', property: 'pow', message: 'Use the exponentiation operator (**) instead.' },
  ],

  // Disallow use of assignment in return statement
  'no-return-assign': ['error', 'always'],

  // Disallow use of `javascript:` URLs
  'no-script-url': 'error',

  // Disallow comparisons where both sides are exactly the same
  'no-self-compare': 'error',

  // Disallow use of comma operator
  'no-sequences': 'error',

  // Disallow useless string concatenation
  'no-useless-concat': 'error',

  // Disallow redundant return statements
  'no-useless-return': 'error',

  // Disallow use of void operator
  'no-void': 'error',

  // Require using Error objects as Promise rejection reasons
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

  // Require use of the second argument for parseInt()
  radix: 'error',

  // Require or disallow Yoda conditions
  yoda: 'error',

  // ==========================================================================
  // ES6 (es6.js)
  // ==========================================================================

  // Enforces no braces where they can be omitted
  'arrow-body-style': ['error', 'as-needed', {
    requireReturnForObjectLiteral: false,
  }],

  // Disallow arrow functions where they could be confused with comparisons
  'no-confusing-arrow': ['error', { allowParens: true }],

  // Disallow useless computed property keys
  'no-useless-computed-key': 'error',

  // Disallow renaming import, export, and destructured assignments to the same name
  'no-useless-rename': ['error', {
    ignoreDestructuring: false,
    ignoreImport: false,
    ignoreExport: false,
  }],

  // Require let or const instead of var
  'no-var': 'error',

  // Require method and property shorthand syntax for object literals
  'object-shorthand': ['error', 'always', {
    ignoreConstructors: false,
    avoidQuotes: true,
  }],

  // Suggest using arrow functions as callbacks
  'prefer-arrow-callback': ['error', {
    allowNamedFunctions: false,
    allowUnboundThis: true,
  }],

  // Suggest using const for variables that are never modified
  'prefer-const': ['error', {
    destructuring: 'any',
    ignoreReadBeforeAssign: true,
  }],

  // Prefer destructuring from arrays and objects
  'prefer-destructuring': ['error', {
    VariableDeclarator: { array: false, object: true },
    AssignmentExpression: { array: true, object: false },
  }, {
    enforceForRenamedProperties: false,
  }],

  // Disallow parseInt() in favor of binary, octal, and hexadecimal literals
  'prefer-numeric-literals': 'error',

  // Use rest parameters instead of arguments
  'prefer-rest-params': 'error',

  // Suggest using the spread syntax instead of .apply()
  'prefer-spread': 'error',

  // Suggest using template literals instead of string concatenation
  'prefer-template': 'error',

  // Require a Symbol description
  'symbol-description': 'error',

  // ==========================================================================
  // Variables (variables.js)
  // ==========================================================================

  // Disallow labels that share a name with a variable
  'no-label-var': 'error',

  // Disallow use of undefined when initializing variables
  'no-undef-init': 'error',

  // ==========================================================================
  // Style — non-formatting rules (style.js)
  // ==========================================================================

  // Disallow use of bitwise operators
  'no-bitwise': 'error',

  // Disallow use of the continue statement
  'no-continue': 'error',

  // Disallow if as the only statement in an else block
  'no-lonely-if': 'error',

  // Disallow use of chained assignment expressions
  'no-multi-assign': ['error'],

  // Disallow nested ternary expressions
  'no-nested-ternary': 'error',

  // Disallow use of unary operators, ++ and --
  'no-plusplus': 'error',

  // Disallow certain syntax forms
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ForInStatement',
      message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'ForOfStatement',
      message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    },
    {
      selector: 'LabeledStatement',
      message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],

  // Disallow dangling underscores in identifiers
  'no-underscore-dangle': ['error', {
    allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
    allowAfterThis: false,
    allowAfterSuper: false,
    enforceInMethodNames: true,
  }],

  // Disallow the use of Boolean literals in conditional expressions
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],

  // Allow just one var statement per function
  'one-var': ['error', 'never'],

  // Require assignment operator shorthand where possible
  'operator-assignment': ['error', 'always'],

  // Prefer use of an object spread over Object.assign
  'prefer-object-spread': 'error',

  // Require a space immediately following the // or /* in a comment
  'spaced-comment': ['error', 'always', {
    line: {
      exceptions: ['-', '+'],
      markers: ['=', '!', '/'],
    },
    block: {
      exceptions: ['-', '+'],
      markers: ['=', '!', ':', '::'],
      balanced: true,
    },
  }],

  // Require a capital letter for constructors
  'new-cap': ['error', {
    newIsCap: true,
    newIsCapExceptions: [],
    capIsNew: false,
    capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
  }],

  // Require function expressions to have a name
  'func-names': 'warn',

  // Specify the maximum length of a line
  'max-len': ['error', 100, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],
}
