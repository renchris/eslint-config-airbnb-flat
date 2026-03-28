import type { Linter } from 'eslint'
import confusingBrowserGlobals from 'confusing-browser-globals'

/**
 * Airbnb base JavaScript rules — 97 rules from airbnb/javascript.
 *
 * Sources: best-practices.js, errors.js, es6.js, variables.js, style.js
 * These are rules that Airbnb sets ON TOP of eslint:recommended.
 * Rules identical to eslint:recommended or tseslint:recommended are excluded.
 */
export const baseRules: Linter.RulesRecord = {
  // ==========================================================================
  // Errors (errors.js)
  // ==========================================================================

  // Disallow use of console
  'no-console': 'warn',

  // Disallow assignment in conditional expressions
  // eslint:recommended: 'error' (default: 'except-return'). Airbnb: 'always' (stricter)
  'no-cond-assign': ['error', 'always'],

  // Enforces that a return statement is present in property getters
  // eslint:recommended: 'error' (no options). Airbnb: allowImplicit (more permissive)
  'getter-return': ['error', { allowImplicit: true }],

  // Disallow use of optional chaining where undefined is not allowed
  // eslint:recommended: 'error' (no options). Airbnb: disallowArithmeticOperators (stricter)
  'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

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
    {
      name: 'isFinite',
      message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
    ...confusingBrowserGlobals.map((g) => ({
      name: g,
      message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
    })),
  ],

  // Enforces return statements in callbacks of array methods
  'array-callback-return': ['error', { allowImplicit: true }],

  // Treat var statements as if they were block scoped
  'block-scoped-var': 'error',

  // Enforce that class methods use "this"
  'class-methods-use-this': ['error', {
    exceptMethods: [],
  }],

  // Require return statements to either always or never specify values
  'consistent-return': 'error',

  // Specify curly brace conventions for all control statements
  curly: ['error', 'multi-line'],

  // Require default case in switch statements
  'default-case': ['error', { commentPattern: '^no default$' }],

  // Enforce default clauses in switch statements to be last
  'default-case-last': 'error',

  // Enforce default parameters to be last
  'default-param-last': 'error',

  // Use dot notation whenever possible
  'dot-notation': ['error', { allowKeywords: true }],

  // Require the use of === and !==
  eqeqeq: ['error', 'always', { null: 'ignore' }],

  // Require grouped accessor pairs in object literals and classes
  'grouped-accessor-pairs': 'error',

  // Make sure for-in loops have an if statement
  'guard-for-in': 'error',

  // Enforce a maximum number of classes per file
  'max-classes-per-file': ['error', 1],

  // Disallow the use of alert, confirm, and prompt
  'no-alert': 'warn',

  // Disallow use of arguments.caller or arguments.callee
  'no-caller': 'error',

  // Disallow returning value in constructor
  'no-constructor-return': 'error',

  // Disallow else after a return in an if
  'no-else-return': ['error', { allowElseIf: false }],

  // Disallow empty functions, except for standalone funcs/arrows
  'no-empty-function': ['error', {
    allow: [
      'arrowFunctions',
      'functions',
      'methods',
    ],
  }],

  // Disallow use of eval()
  'no-eval': 'error',

  // Disallow adding to native types
  'no-extend-native': 'error',

  // Disallow unnecessary function binding
  'no-extra-bind': 'error',

  // Disallow unnecessary labels
  'no-extra-label': 'error',

  // Disallow use of eval()-like methods
  'no-implied-eval': 'error',

  // Disallow usage of __iterator__ property
  'no-iterator': 'error',

  // Disallow use of labels for anything other than loops and switches
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

  // Disallow unnecessary nested blocks
  'no-lone-blocks': 'error',

  // Disallow creation of functions within loops
  'no-loop-func': 'error',

  // Disallow use of multiline strings
  'no-multi-str': 'error',

  // Disallow use of new operator when not part of assignment or comparison
  'no-new': 'error',

  // Disallow use of new operator for Function object
  'no-new-func': 'error',

  // Disallows creating new instances of String, Number, and Boolean
  'no-new-wrappers': 'error',

  // Disallow use of octal escape sequences in string literals
  'no-octal-escape': 'error',

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

  // Disallow redundant return await
  'no-return-await': 'error',

  // Disallow use of `javascript:` URLs
  'no-script-url': 'error',

  // Disallow comparisons where both sides are exactly the same
  'no-self-compare': 'error',

  // Disallow use of comma operator
  'no-sequences': 'error',

  // Restrict what can be thrown as an exception
  'no-throw-literal': 'error',

  // Disallow unused expressions
  'no-unused-expressions': ['error', {
    allowShortCircuit: false,
    allowTernary: false,
    allowTaggedTemplates: false,
  }],

  // Disallow useless string concatenation
  'no-useless-concat': 'error',

  // Disallow redundant return statements
  'no-useless-return': 'error',

  // Disallow use of void operator
  'no-void': 'error',

  // Require using Error objects as Promise rejection reasons
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

  // Prefer regex literals over the RegExp constructor
  'prefer-regex-literals': ['error', {
    disallowRedundantWrapping: true,
  }],

  // Require use of the second argument for parseInt()
  radix: 'error',

  // Require all vars on top of their containing scope
  'vars-on-top': 'error',

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

  // Disallow specified names in exports
  'no-restricted-exports': ['error', {
    restrictedNamedExports: [
      'default', // use `export default` to provide a default export
      'then', // this will cause tons of confusion when your module is dynamically `import()`ed
    ],
  }],

  // ==========================================================================
  // Variables (variables.js)
  // ==========================================================================

  // Disallow labels that share a name with a variable
  'no-label-var': 'error',

  // Disallow declaration of variables already declared in the outer scope
  'no-shadow': 'error',

  // Disallow use of undefined when initializing variables
  'no-undef-init': 'error',

  // Disallow use of variables before they are defined
  'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],

  // ==========================================================================
  // Style — non-formatting rules (style.js)
  // ==========================================================================

  // Require camel case names
  camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],

  // Disallow use of bitwise operators
  'no-bitwise': 'error',

  // Disallow use of the continue statement
  'no-continue': 'error',

  // Disallow if as the only statement in an else block
  'no-lonely-if': 'error',

  // Disallow un-paren'd mixes of different operators
  'no-mixed-operators': ['error', {
    // the list of arithmetic groups disallows mixing `%` and `**`
    // with other arithmetic operators.
    groups: [
      ['%', '**'],
      ['%', '+'],
      ['%', '-'],
      ['%', '*'],
      ['%', '/'],
      ['/', '*'],
      ['&', '|', '<<', '>>', '>>>'],
      ['==', '!=', '===', '!=='],
      ['&&', '||'],
    ],
    allowSamePrecedence: false,
  }],

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
    allow: [],
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

  // Prefer the exponentiation operator over Math.pow
  'prefer-exponentiation-operator': 'error',

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
