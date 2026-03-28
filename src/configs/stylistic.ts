import type { Linter } from 'eslint'

/**
 * Airbnb formatting rules mapped to @stylistic/eslint-plugin equivalents.
 *
 * Sources: style.js, es6.js, best-practices.js (base), react.js (JSX)
 *
 * Every option is copied verbatim from the Airbnb source files.
 * `func-call-spacing` is renamed to `function-call-spacing` per @stylistic.
 */

// =============================================================================
// 1. Base JS formatting (~55 rules)
// =============================================================================
export const stylisticRules: Linter.RulesRecord = {
  // ---------------------------------------------------------------------------
  // Turn off deprecated core rules that now live in @stylistic
  // (these are enabled in base.ts and must be disabled here)
  // ---------------------------------------------------------------------------
  'max-len': 'off',
  'no-confusing-arrow': 'off',
  'spaced-comment': 'off',
  'wrap-iife': 'off',
  'no-mixed-operators': 'off',

  // ---------------------------------------------------------------------------
  // @stylistic equivalents of the 5 deprecated rules above
  // ---------------------------------------------------------------------------

  // Specify the maximum length of a line (style.js)
  '@stylistic/max-len': ['error', 100, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],

  // Disallow arrow functions where they could be confused with comparisons (es6.js)
  '@stylistic/no-confusing-arrow': ['error', {
    allowParens: true,
  }],

  // Require a space immediately following the // or /* in a comment (style.js)
  '@stylistic/spaced-comment': ['error', 'always', {
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

  // Require immediate function invocation to be wrapped in parentheses (best-practices.js)
  '@stylistic/wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],

  // Disallow un-paren'd mixes of different operators (style.js)
  '@stylistic/no-mixed-operators': ['error', {
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

  // ---------------------------------------------------------------------------
  // Indentation & structure (style.js)
  // ---------------------------------------------------------------------------

  // Tab width for code (style.js)
  '@stylistic/indent': ['error', 2, {
    SwitchCase: 1,
    VariableDeclarator: 1,
    outerIIFEBody: 1,
    FunctionDeclaration: {
      parameters: 1,
      body: 1,
    },
    FunctionExpression: {
      parameters: 1,
      body: 1,
    },
    CallExpression: {
      arguments: 1,
    },
    ArrayExpression: 1,
    ObjectExpression: 1,
    ImportDeclaration: 1,
    flatTernaryExpressions: false,
    ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
    ignoreComments: false,
  }],

  // ---------------------------------------------------------------------------
  // Semicolons (style.js)
  // ---------------------------------------------------------------------------

  // Require or disallow use of semicolons instead of ASI
  '@stylistic/semi': ['error', 'always'],

  // Enforce spacing before and after semicolons
  '@stylistic/semi-spacing': ['error', { before: false, after: true }],

  // Enforce location of semicolons
  '@stylistic/semi-style': ['error', 'last'],

  // ---------------------------------------------------------------------------
  // Quotes (style.js)
  // ---------------------------------------------------------------------------

  // Specify whether double or single quotes should be used
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

  // Require quotes around object literal property names
  '@stylistic/quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

  // ---------------------------------------------------------------------------
  // Commas (style.js)
  // ---------------------------------------------------------------------------

  // Require trailing commas in multiline object literals
  '@stylistic/comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'always-multiline',
  }],

  // Enforce spacing before and after comma
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],

  // Enforce one true comma style
  '@stylistic/comma-style': ['error', 'last', {
    exceptions: {
      ArrayExpression: false,
      ArrayPattern: false,
      ArrowFunctionExpression: false,
      CallExpression: false,
      FunctionDeclaration: false,
      FunctionExpression: false,
      ImportDeclaration: false,
      ObjectExpression: false,
      ObjectPattern: false,
      VariableDeclaration: false,
      NewExpression: false,
    },
  }],

  // ---------------------------------------------------------------------------
  // Braces & blocks (style.js)
  // ---------------------------------------------------------------------------

  // Enforce one true brace style
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

  // ---------------------------------------------------------------------------
  // Arrows (es6.js)
  // ---------------------------------------------------------------------------

  // Require parens in arrow function arguments
  '@stylistic/arrow-parens': ['error', 'always'],

  // Require space before/after arrow function's arrow
  '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

  // ---------------------------------------------------------------------------
  // Spacing rules (style.js unless noted)
  // ---------------------------------------------------------------------------

  // Enforce spacing inside array brackets
  '@stylistic/array-bracket-spacing': ['error', 'never'],

  // Enforce spacing inside single-line blocks
  '@stylistic/block-spacing': ['error', 'always'],

  // Disallow padding inside computed properties
  '@stylistic/computed-property-spacing': ['error', 'never'],

  // Enforce spacing between functions and their invocations
  // NOTE: renamed from func-call-spacing to function-call-spacing in @stylistic
  '@stylistic/function-call-spacing': ['error', 'never'],

  // Enforce spacing between keys and values in object literal properties
  '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],

  // Require a space before & after certain keywords
  '@stylistic/keyword-spacing': ['error', {
    before: true,
    after: true,
    overrides: {
      return: { after: true },
      throw: { after: true },
      case: { after: true },
    },
  }],

  // Require padding inside curly braces
  '@stylistic/object-curly-spacing': ['error', 'always'],

  // Require or disallow space before blocks
  '@stylistic/space-before-blocks': 'error',

  // Require or disallow space before function opening parenthesis
  '@stylistic/space-before-function-paren': ['error', {
    anonymous: 'always',
    named: 'never',
    asyncArrow: 'always',
  }],

  // Require or disallow spaces inside parentheses
  '@stylistic/space-in-parens': ['error', 'never'],

  // Require spaces around operators
  '@stylistic/space-infix-ops': 'error',

  // Require or disallow spaces before/after unary operators
  '@stylistic/space-unary-ops': ['error', {
    words: true,
    nonwords: false,
    overrides: {},
  }],

  // Enforce spacing around colons of switch statements
  '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],

  // Enforce usage of spacing in template strings
  '@stylistic/template-curly-spacing': 'error',

  // Require or disallow spacing between template tags and their literals
  '@stylistic/template-tag-spacing': ['error', 'never'],

  // ---------------------------------------------------------------------------
  // Line-break & whitespace rules (style.js unless noted)
  // ---------------------------------------------------------------------------

  // Enforce newline at the end of file, with no multiple empty lines
  '@stylistic/eol-last': ['error', 'always'],

  // Disallow mixed 'LF' and 'CRLF' as linebreaks
  '@stylistic/linebreak-style': ['error', 'unix'],

  // Require or disallow an empty line between class members
  '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],

  // Disallow the omission of parentheses when invoking a constructor with no arguments
  '@stylistic/new-parens': 'error',

  // Enforce new line after each method call in the chain
  '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

  // Disallow unnecessary semicolons
  '@stylistic/no-extra-semi': 'error',

  // Disallow the use of leading or trailing decimal points in numeric literals (best-practices.js)
  '@stylistic/no-floating-decimal': 'error',

  // Disallow mixed spaces and tabs for indentation
  '@stylistic/no-mixed-spaces-and-tabs': 'error',

  // Disallow use of multiple spaces (best-practices.js)
  '@stylistic/no-multi-spaces': ['error', {
    ignoreEOLComments: false,
  }],

  // Disallow multiple empty lines
  '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

  // Disallow tab characters entirely
  '@stylistic/no-tabs': 'error',

  // Disallow trailing whitespace at the end of lines
  '@stylistic/no-trailing-spaces': ['error', {
    skipBlankLines: false,
    ignoreComments: false,
  }],

  // Disallow whitespace before properties
  '@stylistic/no-whitespace-before-property': 'error',

  // Enforce the location of single-line statements
  '@stylistic/nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],

  // Enforce line breaks between braces
  '@stylistic/object-curly-newline': ['error', {
    ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
  }],

  // Enforce "same line" or "multiple line" on object properties
  '@stylistic/object-property-newline': ['error', {
    allowAllPropertiesOnSameLine: true,
  }],

  // Require a newline around variable declaration
  '@stylistic/one-var-declaration-per-line': ['error', 'always'],

  // Require operator at the beginning of the line in multiline statements
  '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],

  // Disallow padding within blocks
  '@stylistic/padded-blocks': ['error', {
    blocks: 'never',
    classes: 'never',
    switches: 'never',
  }, {
    allowSingleLineBlocks: true,
  }],

  // Require line breaks inside function parentheses if there are line breaks between parameters
  '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],

  // Enforce line breaks between arguments of a function call
  '@stylistic/function-call-argument-newline': ['error', 'consistent'],

  // Enforce the location of arrow function bodies with implicit returns
  '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

  // ---------------------------------------------------------------------------
  // ES6 formatting (es6.js)
  // ---------------------------------------------------------------------------

  // Enforce the spacing around the * in generator functions
  '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],

  // Enforce spacing between object rest-spread
  '@stylistic/rest-spread-spacing': ['error', 'never'],

  // Enforce spacing around the * in yield* expressions
  '@stylistic/yield-star-spacing': ['error', 'after'],

  // ---------------------------------------------------------------------------
  // From best-practices.js
  // ---------------------------------------------------------------------------

  // Enforce consistent newlines before or after dots
  '@stylistic/dot-location': ['error', 'property'],
}

// =============================================================================
// 2. JSX formatting (~13 rules from react.js)
// =============================================================================
export const stylisticJsxRules: Linter.RulesRecord = {
  // Specify whether double or single quotes should be used in JSX attributes (react.js)
  '@stylistic/jsx-quotes': ['error', 'prefer-double'],

  // Enforce JSX indentation (react.js)
  '@stylistic/jsx-indent': ['error', 2],

  // Validate props indentation in JSX (react.js)
  '@stylistic/jsx-indent-props': ['error', 2],

  // Validate closing bracket location in JSX (react.js)
  '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

  // Validate closing tag location in JSX (react.js)
  '@stylistic/jsx-closing-tag-location': 'error',

  // Enforce or disallow spaces inside of curly braces in JSX attributes (react.js)
  '@stylistic/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

  // Enforce linebreaks in curly braces in JSX attributes and expressions (react.js)
  '@stylistic/jsx-curly-newline': ['error', {
    multiline: 'consistent',
    singleline: 'consistent',
  }],

  // Enforce spacing around jsx equals signs (react.js)
  '@stylistic/jsx-equals-spacing': ['error', 'never'],

  // Require that the first prop in a JSX element be on a new line when the element is multiline (react.js)
  '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

  // Limit maximum of props on a single line in JSX (react.js)
  '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

  // One JSX Element Per Line (react.js)
  '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],

  // Disallow multiple spaces between inline JSX props (react.js)
  '@stylistic/jsx-props-no-multi-spaces': 'error',

  // Validate whitespace in and around the JSX opening and closing brackets (react.js)
  '@stylistic/jsx-tag-spacing': ['error', {
    closingSlash: 'never',
    beforeSelfClosing: 'always',
    afterOpening: 'never',
    beforeClosing: 'never',
  }],

  // Prevent missing parentheses around multiline JSX (react.js)
  '@stylistic/jsx-wrap-multilines': ['error', {
    declaration: 'parens-new-line',
    assignment: 'parens-new-line',
    return: 'parens-new-line',
    arrow: 'parens-new-line',
    condition: 'parens-new-line',
    logical: 'parens-new-line',
    prop: 'parens-new-line',
  }],
}

// =============================================================================
// 3. TypeScript override (1 rule)
// =============================================================================
export const stylisticTsRules: Linter.RulesRecord = {
  // Override lines-between-class-members for TypeScript overloads
  '@stylistic/lines-between-class-members': ['error', 'always', {
    exceptAfterSingleLine: false,
    exceptAfterOverload: true,
  }],
}
