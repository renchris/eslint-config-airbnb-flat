# Rule-by-Rule Audit Trail

Every Airbnb ESLint rule decision, documented. This is the complete audit trail for
`eslint-config-airbnb-flat` -- which rules shipped, which were dropped, and why.

No other Airbnb flat config alternative documents their decisions at this level.

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| **Airbnb upstream rules audited** | ~350 | Across 6 source files + react + react-a11y + import + typescript |
| **Shipped in this package** | 140 | 101 base + 27 React + 12 TypeScript pairs |
| **Inherited from recommended** | ~80 | eslint:recommended (42), tseslint:recommended (~25), react:recommended (~12) |
| **Stylistic (opt-in)** | 76 | 63 base + 12 JSX + 1 TS override (+ 5 deprecated migrations) |
| **Dropped** | ~170 | Formatting, PropTypes, class components, import plugin, redundant |

### Where rules live

This package ships rules **on top of** recommended configs. The full Airbnb experience
comes from layering:

1. `eslint:recommended` (42 rules) -- core JS safety
2. `typescript-eslint:recommended` (~25 rules) -- TS-specific safety
3. `eslint-plugin-react:recommended` (~12 rules) -- React safety
4. `eslint-plugin-jsx-a11y:recommended` (~30 rules) -- accessibility
5. **`airbnb-flat/base`** (101 rules) -- Airbnb opinions beyond recommended
6. **`airbnb-flat/react`** (27 rules) -- Airbnb React opinions beyond recommended
7. **`airbnb-flat/typescript`** (12 rule pairs) -- type-aware replacements

---

## Kept Rules -- Base (101 rules)

### Errors (4 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/errors.js`

These rules override `eslint:recommended` with stricter Airbnb options.

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-console` | warn | -- | Warns on `console.log()`. Intentional logging should use a logger utility. |
| `no-cond-assign` | error | `'always'` | eslint:recommended uses `'except-return'`. Airbnb is stricter: bans assignment in all conditionals. |
| `getter-return` | error | `{ allowImplicit: true }` | eslint:recommended requires explicit return. Airbnb allows implicit return (bare `return`). |
| `no-unsafe-optional-chaining` | error | `{ disallowArithmeticOperators: true }` | eslint:recommended has no options. Airbnb is stricter: bans `obj?.x + 1` (arithmetic on potentially undefined). |

### Best Practices (57 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/best-practices.js`

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-await-in-loop` | error | -- | Catches accidental sequential fetches. Use `eslint-disable` for intentional sequential mutations (Replicache). |
| `no-promise-executor-return` | error | -- | Catches subtle Promise bugs where executor returns a value (ignored by Promise). |
| `no-template-curly-in-string` | error | -- | Catches `'Hello ${name}'` (regular string, not template literal). |
| `no-unreachable-loop` | error | `{ ignore: [] }` | Catches loops that always break/return on first iteration. |
| `no-restricted-globals` | error | `isFinite`, `isNaN` | Forces `Number.isFinite()` and `Number.isNaN()` (type-coercing globals are dangerous). |
| `array-callback-return` | error | `{ allowImplicit: true }` | Requires return in `.map()`, `.filter()`, etc. `allowImplicit` permits bare `return`. |
| `block-scoped-var` | error | -- | Treats `var` as block-scoped (catches hoisting bugs before `no-var` catches the declaration). |
| `consistent-return` | error | -- | Functions must always return a value or never return a value. |
| `curly` | error | `'multi-line'` | Requires braces for multi-line blocks, allows single-line without braces. |
| `default-case` | error | `{ commentPattern: '^no default$' }` | Switch must have `default` case (or `// no default` comment to opt out). |
| `default-case-last` | error | -- | If `default` exists, it must be the last case. |
| `eqeqeq` | error | `'always', { null: 'ignore' }` | Always use `===`/`!==`, except `== null` (idiomatic null/undefined check). |
| `no-alert` | warn | -- | Warns on `alert()`, `confirm()`, `prompt()`. Warn (not error) since useful in dev. |
| `no-caller` | error | -- | Bans `arguments.caller` and `arguments.callee` (deprecated, breaks optimization). |
| `no-constructor-return` | error | -- | Constructors should not return values. |
| `no-else-return` | error | `{ allowElseIf: false }` | No `else` after `return`. Stricter: also disallows `else if` after `return`. |
| `no-eval` | error | -- | Bans `eval()`. Security and performance hazard. |
| `no-extend-native` | error | -- | Bans modifying native prototypes (`Array.prototype.custom = ...`). |
| `no-extra-bind` | error | -- | Catches `.bind()` on functions that don't use `this`. |
| `no-extra-label` | error | -- | Catches labels on loops/switches that don't need them. |
| `no-iterator` | error | -- | Bans `__iterator__` property (non-standard, use `Symbol.iterator`). |
| `no-labels` | error | `{ allowLoop: false, allowSwitch: false }` | Bans all labels. Combined with `no-restricted-syntax` LabeledStatement ban. |
| `no-lone-blocks` | error | -- | Catches unnecessary `{}` blocks (no lexical scoping benefit). |
| `no-multi-str` | error | -- | Bans multiline strings with `\` continuation. Use template literals. |
| `no-new` | error | -- | Bans `new Constructor()` without assignment (side-effect constructors). |
| `no-new-wrappers` | error | -- | Bans `new String()`, `new Number()`, `new Boolean()` (creates objects, not primitives). |
| `no-param-reassign` | error | `{ props: true, ignorePropertyModificationsFor: [...] }` | Bans reassigning function parameters and their properties. Allows mutation of `acc`, `req`, `res`, `ctx`, `e`, `$scope`, `staticContext`. |
| `no-proto` | error | -- | Bans `__proto__`. Use `Object.getPrototypeOf()`. |
| `no-restricted-properties` | error | 10 entries | Bans `arguments.callee`, `global/self/window.isFinite`, `global/self/window.isNaN`, `__defineGetter__`, `__defineSetter__`, `Math.pow`. |
| `no-return-assign` | error | `'always'` | Bans assignment in `return` statements (even with parentheses). |
| `no-script-url` | error | -- | Bans `javascript:` URLs. |
| `no-self-compare` | error | -- | Bans `x === x` (usually a bug; use `Number.isNaN()` for NaN checks). |
| `no-sequences` | error | -- | Bans comma operator (except in `for` loops). |
| `no-useless-concat` | error | -- | Catches `'a' + 'b'` (use a single string). |
| `no-useless-return` | error | -- | Catches redundant `return` at end of function. |
| `no-void` | error | -- | Bans `void` operator. |
| `prefer-promise-reject-errors` | error | `{ allowEmptyReject: true }` | Reject with `Error` objects, not literals. Allows `reject()` with no argument. |
| `radix` | error | -- | `parseInt()` must have radix argument: `parseInt(str, 10)`. |
| `class-methods-use-this` | error | `{ exceptMethods: [] }` | Enforces that class methods use `this`. Methods that don't need `this` should be static or standalone functions. |
| `default-param-last` | error | -- | Default parameters must be last. Prevents confusing `function(a = 1, b) {}`. |
| `dot-notation` | error | `{ allowKeywords: true }` | Use `obj.prop` not `obj['prop']` when property is a valid identifier. |
| `grouped-accessor-pairs` | error | -- | Getters and setters for the same property must be adjacent. |
| `guard-for-in` | error | -- | `for...in` loops must filter with `hasOwnProperty` (prototype chain safety). Combined with `no-restricted-syntax` for defense-in-depth. |
| `max-classes-per-file` | error | `1` | One class per file. Enforces single-responsibility at the file level. |
| `no-empty-function` | error | `{ allow: ['arrowFunctions', 'functions', 'methods'] }` | Bans empty function bodies. Allows intentional empty arrows, functions, and methods (common in interfaces/defaults). |
| `no-implied-eval` | error | -- | Bans `setTimeout('code')` and `setInterval('code')` (string arguments = implicit eval). |
| `no-loop-func` | error | -- | Bans creating functions inside loops (closure over loop variable bugs). |
| `no-new-func` | error | -- | Bans `new Function('a', 'return a')` (string-to-code like eval). |
| `no-octal-escape` | error | -- | Bans octal escape sequences in strings (`'\251'`). Use Unicode escapes. |
| `no-return-await` | error | -- | Bans `return await` (unnecessary microtask except in try/catch, where TS rule handles it). |
| `no-throw-literal` | error | -- | Only `Error` objects (or subclasses) may be thrown. |
| `no-unused-expressions` | error | `{ allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false }` | Bans expressions with no side effect. Strict: no `condition && action()` or ternary side effects. |
| `no-useless-constructor` | error | -- | Bans constructors that only call `super()` with the same arguments. |
| `prefer-regex-literals` | error | `{ disallowRedundantWrapping: true }` | Use `/regex/` not `new RegExp('regex')` when pattern is static. |
| `vars-on-top` | error | -- | `var` declarations must be at the top of their scope (before `no-var` catches them). |
| `wrap-iife` | error | `'outside', { functionPrototypeMethods: false }` | IIFEs must be wrapped in parentheses: `(function() {}())`. |
| `yoda` | error | -- | Bans Yoda conditions: `if (color === 'red')` not `if ('red' === color)`. |

### ES6 (15 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/es6.js`

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `arrow-body-style` | error | `'as-needed', { requireReturnForObjectLiteral: false }` | Omit braces when arrow function body is a single expression. Object literals don't require explicit return. |
| `no-confusing-arrow` | error | `{ allowParens: true }` | Bans arrow functions that look like comparisons: `const x = a => 1 ? 2 : 3`. Parentheses resolve ambiguity. |
| `no-useless-computed-key` | error | -- | Catches `{ ['a']: 1 }` (use `{ a: 1 }`). |
| `no-useless-rename` | error | `{ ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }` | Catches `import { foo as foo }` and `const { bar: bar } = obj`. |
| `no-var` | error | -- | Always use `let`/`const`, never `var`. |
| `object-shorthand` | error | `'always', { ignoreConstructors: false, avoidQuotes: true }` | Use `{ method() {} }` not `{ method: function() {} }`. Reverts to longhand when key needs quotes. |
| `prefer-arrow-callback` | error | `{ allowNamedFunctions: false, allowUnboundThis: true }` | Use arrow functions for callbacks. Allows `function() {}` when `this` binding is needed. |
| `prefer-const` | error | `{ destructuring: 'any', ignoreReadBeforeAssign: true }` | Use `const` when variable is never reassigned. In destructuring, `const` if *any* binding is never reassigned. |
| `prefer-destructuring` | error | See config | Objects: destructure in declarations. Arrays: destructure in assignments. Does not enforce for renamed properties. |
| `prefer-numeric-literals` | error | -- | Use `0b1010` not `parseInt('1010', 2)` for binary/octal/hex. |
| `prefer-rest-params` | error | -- | Use `...args` not `arguments`. |
| `prefer-spread` | error | -- | Use `fn(...args)` not `fn.apply(null, args)`. |
| `prefer-template` | error | -- | Use template literals for string concatenation. |
| `symbol-description` | error | -- | `Symbol('description')` not `Symbol()`. |
| `no-restricted-exports` | error | `{ restrictedNamedExports: ['default', 'then'] }` | Bans `export { x as default }` (use `export default`) and `export { x as then }` (breaks dynamic `import()`). |

### Variables (5 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/variables.js`

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-label-var` | error | -- | Bans labels with same name as a variable (confusion hazard). |
| `no-shadow` | error | -- | Bans variable declarations that shadow variables in outer scopes. Prevents confusion about which variable is referenced. |
| `no-undef-init` | error | -- | Bans `let x = undefined` (redundant; `let x` is sufficient). |
| `no-unused-vars` | error | `{ vars: 'all', args: 'after-used', ignoreRestSiblings: true }` | Airbnb overrides eslint:recommended: checks all vars, unused args only after the last used one, ignores rest siblings in destructuring. |
| `no-use-before-define` | error | `{ functions: true, classes: true, variables: true }` | Bans use of variables, functions, and classes before they are defined. Strict: includes function declarations (no hoisting reliance). |

### Style -- Non-Formatting (20 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/style.js`

These are the style rules that enforce **logic and readability**, not whitespace/formatting.
All pure formatting rules from style.js were dropped (see [Dropped -- Formatting](#formatting--stylistic-60-rules)).

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `camelcase` | error | `{ properties: 'never', ignoreDestructuring: false }` | Enforces camelCase naming. Does not enforce on object properties (API responses). Checks destructured names. |
| `no-array-constructor` | error | -- | Bans `new Array(1, 2)` (confusing: `new Array(3)` creates sparse array). Use `[1, 2]`. |
| `no-bitwise` | error | -- | Bans `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`. Usually a typo for `&&`/`||`. |
| `no-continue` | error | -- | Bans `continue`. Airbnb prefers early returns and array methods. |
| `no-lonely-if` | error | -- | `if` as sole statement in `else` should be `else if`. |
| `no-mixed-operators` | error | See config | Bans ambiguous operator combinations (`%` with `+`, `&&` with `||`, etc.). Prevents precedence bugs. |
| `no-multi-assign` | error | -- | Bans `a = b = c = 1`. Unclear which variables are being set. |
| `no-nested-ternary` | error | -- | Bans `a ? b ? c : d : e`. Hard to read. |
| `no-plusplus` | error | -- | Bans `++`/`--`. Use `+= 1`/`-= 1` (avoids semicolon insertion bugs). |
| `no-restricted-syntax` | error | 4 selectors | Bans `for...in` (prototype chain), `for...of` (regenerator-runtime), labels, `with`. |
| `no-underscore-dangle` | error | `{ allow: [], enforceInMethodNames: true }` | Bans `_private` naming convention. Base config has no allow-list (React config overrides with Redux exception). |
| `no-unneeded-ternary` | error | `{ defaultAssignment: false }` | Bans `x ? x : 'default'` and `x ? true : false`. |
| `one-var` | error | `'never'` | One `const`/`let` per declaration. |
| `operator-assignment` | error | `'always'` | Use `x += 1` not `x = x + 1`. |
| `prefer-exponentiation-operator` | error | -- | Use `x ** 2` not `Math.pow(x, 2)`. Paired with `no-restricted-properties` ban on `Math.pow`. |
| `prefer-object-spread` | error | -- | Use `{ ...obj }` not `Object.assign({}, obj)`. |
| `spaced-comment` | error | See config | Require space after `//` and `/*`. Allows `/`, `!`, `=`, `::` markers. |
| `new-cap` | error | `{ newIsCap: true, capIsNew: false }` | `new Foo()` not `new foo()`. Allows `Immutable.Map()` without `new`. |
| `func-names` | warn | -- | Warns on anonymous function expressions (helps stack traces). |
| `max-len` | error | `100, 2` | 100 char limit, tab width 2. Ignores URLs, regex, strings, template literals. Does not ignore comments. |

---

## Kept Rules -- React (27 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb/rules/react.js` and `react-a11y.js`

These are rules Airbnb sets **on top of** `eslint-plugin-react:recommended` and
`eslint-plugin-jsx-a11y:recommended`. Rules that are identical to the recommended
configs are excluded (they're inherited automatically).

### React Plugin Rules (22 rules)

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `react/no-danger` | warn | -- | Warns on `dangerouslySetInnerHTML`. Security review signal. |
| `react/self-closing-comp` | error | -- | `<Component />` not `<Component></Component>` when no children. |
| `react/jsx-boolean-value` | error | `'never'` | `<Comp disabled />` not `<Comp disabled={true} />`. |
| `react/jsx-curly-brace-presence` | error | `{ props: 'never', children: 'never' }` | `<Comp name="foo" />` not `<Comp name={'foo'} />`. No curlies for static strings. |
| `react/jsx-fragments` | error | `'syntax'` | `<>...</>` not `<React.Fragment>...</React.Fragment>`. |
| `react/jsx-no-useless-fragment` | error | -- | Bans `<>{children}</>` when fragment is unnecessary. |
| `react/jsx-pascal-case` | error | `{ allowAllCaps: true }` | Components must be PascalCase. ALL_CAPS allowed (e.g., `SVGICON`). |
| `react/no-array-index-key` | error | -- | Bans `arr.map((item, i) => <Item key={i} />)`. Index keys cause reconciliation bugs. |
| `react/no-unstable-nested-components` | error | -- | Bans defining components inside render. Causes remount on every parent render. |
| `react/destructuring-assignment` | error | `'always'` | `const { name } = props` not `props.name`. Enforces destructuring for props, state, context. |
| `react/jsx-no-constructed-context-values` | error | -- | Bans `<Ctx.Provider value={{ key: val }}>` (new object every render). Use `useMemo`. |
| `react/no-namespace` | error | -- | Bans `<Foo:Bar />` (XML namespaces in JSX). |
| `react/button-has-type` | error | `{ button: true, submit: true, reset: false }` | `<button>` must have explicit `type` attribute. Prevents accidental form submissions. |
| `react/no-this-in-sfc` | error | -- | Bans `this` in stateless function components (always a bug). |
| `react/jsx-no-script-url` | error | `[{ name: 'Link', props: ['to'] }]` | Bans `javascript:` URLs in JSX, including React Router `Link` `to` prop. |
| `react/void-dom-elements-no-children` | error | -- | Bans `<img>children</img>`, `<br>text</br>`, etc. |
| `react/style-prop-object` | error | -- | `style` prop must be an object, not a string. |
| `react/jsx-props-no-spreading` | error | `{ html: 'enforce', custom: 'enforce', explicitSpread: 'ignore' }` | Bans `<Comp {...props} />`. Explicit spread (`<Comp {...{ a, b }} />`) is allowed. |
| `react/function-component-definition` | error | `{ namedComponents: ['function-declaration', 'function-expression'], unnamedComponents: 'function-expression' }` | Enforces consistent function component syntax. Named: function declaration or expression. Unnamed: expression only. |
| `react/jsx-filename-extension` | error | `{ extensions: ['.jsx'] }` | Only `.jsx` files may contain JSX. TypeScript users override to `['.jsx', '.tsx']`. |
| `react/jsx-no-bind` | error | `{ ignoreRefs: true, allowArrowFunctions: true, ignoreDOMComponents: true }` | Bans `.bind()` in JSX props (new function every render). Allows arrow functions and ref callbacks. |
| `react/no-invalid-html-attribute` | error | -- | Catches invalid `rel`, `target`, etc. attribute values on HTML elements. |

### Core ESLint Overrides for React (1 rule)

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-underscore-dangle` | error | `{ allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'], enforceInMethodNames: true }` | React config overrides base: adds Redux DevTools to the allow-list. |

### JSX-a11y Overrides (4 rules)

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `jsx-a11y/no-autofocus` | error | `{ ignoreNonDOM: true }` | Airbnb override: allows `autoFocus` on custom components (e.g., modal focus traps), bans on native DOM elements. jsx-a11y:recommended does not set `ignoreNonDOM`. |
| `jsx-a11y/anchor-is-valid` | error | `{ components: ['Link'], specialLink: ['to'], aspects: ['noHref', 'invalidHref', 'preferButton'] }` | Enforces valid anchor usage. Extends to React Router `Link` component and `to` prop. |
| `jsx-a11y/label-has-associated-control` | error | `{ assert: 'both', depth: 25 }` | Labels must be associated with a form control via both `htmlFor` and nesting. Deep nesting traversal (25 levels). |
| `jsx-a11y/control-has-associated-label` | error | See config | Form controls must have an accessible label. Airbnb enables this (jsx-a11y:recommended has it `off`). Ignores audio, canvas, embed, input, textarea, tr, video. |

---

## Kept Rules -- TypeScript (12 rule pairs)

Source: `@kesills/eslint-config-airbnb-typescript` (maintained fork of `iamturns/eslint-config-airbnb-typescript`)

Pattern: Turn off the base ESLint rule, enable the `@typescript-eslint` equivalent.
This prevents false positives from base rules that don't understand TypeScript syntax
(e.g., `no-shadow` flags type imports, `no-use-before-define` flags type references).

| Base Rule (off) | TypeScript Rule (on) | Severity | Options | Notes |
|-----------------|----------------------|----------|---------|-------|
| `camelcase` | `@typescript-eslint/naming-convention` | error | variable: camelCase/PascalCase/UPPER_CASE, function: camelCase/PascalCase, typeLike: PascalCase | Richer than `camelcase`. Allows React components (PascalCase) and constants (UPPER_CASE). |
| `dot-notation` | `@typescript-eslint/dot-notation` | error | `{ allowKeywords: true }` | Type-aware: understands `obj.prop` vs `obj['prop']` with TypeScript index signatures. |
| `no-shadow` | `@typescript-eslint/no-shadow` | error | -- | Type-aware: does not flag type imports or enum members that shadow variables. |
| `no-use-before-define` | `@typescript-eslint/no-use-before-define` | error | `{ functions: true, classes: true, variables: true }` | Type-aware: does not flag type references before declaration (types are hoisted). |
| `no-loop-func` | `@typescript-eslint/no-loop-func` | error | -- | Type-aware: understands TypeScript's `const` assertions and type narrowing in loops. |
| `no-implied-eval` | `@typescript-eslint/no-implied-eval` | error | -- | Type-aware: catches `setTimeout(string)` even through type aliases. |
| `no-throw-literal` | `@typescript-eslint/only-throw-error` | error | -- | Type-aware: ensures only `Error` objects (or subclasses) are thrown. The TS rule is named `only-throw-error` (renamed from `no-throw-literal` in typescript-eslint v6). |
| `no-unused-expressions` | `@typescript-eslint/no-unused-expressions` | error | `{ allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false }` | Type-aware: does not flag TypeScript-specific expressions like type assertions. Strict: no short-circuit or ternary side effects. |
| `no-return-await` | `@typescript-eslint/return-await` | error | `'in-try-catch'` | Requires `return await` inside try/catch (needed for correct stack traces), forbids it elsewhere (unnecessary microtask). |
| `no-unused-vars` | `@typescript-eslint/no-unused-vars` | error | `{ vars: 'all', args: 'after-used', ignoreRestSiblings: true }` | Type-aware: does not flag TypeScript type-only imports. Airbnb options preserved (check all vars, unused args after last used). |
| `no-useless-constructor` | `@typescript-eslint/no-useless-constructor` | error | -- | Type-aware: understands TypeScript parameter properties (`constructor(private x: string) {}`). |
| `no-array-constructor` | `@typescript-eslint/no-array-constructor` | error | -- | Type-aware: understands TypeScript generic array constructors (`new Array<string>()`). |

---

## Stylistic Rules (opt-in: 76 rules)

These rules are the `@stylistic/eslint-plugin` equivalents of the ~60 Airbnb formatting rules dropped by default. Enable with `stylistic: true`.

### Deprecated Rule Migrations (5 pairs)

When stylistic is enabled, these base rules are turned off and replaced:

| Base Rule (off) | @stylistic Equivalent | Source |
|---|---|---|
| `max-len` | `@stylistic/max-len` | style.js |
| `no-confusing-arrow` | `@stylistic/no-confusing-arrow` | es6.js |
| `spaced-comment` | `@stylistic/spaced-comment` | style.js |
| `wrap-iife` | `@stylistic/wrap-iife` | best-practices.js |
| `no-mixed-operators` | `@stylistic/no-mixed-operators` | style.js |

### Base Formatting (63 rules)

| Rule | Severity | Key Options | Source |
|---|---|---|---|
| `@stylistic/max-len` | error | 100, 2; ignoreUrls, ignoreStrings, ignoreTemplateLiterals, ignoreRegExpLiterals | style.js |
| `@stylistic/no-confusing-arrow` | error | allowParens: true | es6.js |
| `@stylistic/spaced-comment` | error | always; line/block exceptions and markers | style.js |
| `@stylistic/wrap-iife` | error | outside; functionPrototypeMethods: false | best-practices.js |
| `@stylistic/no-mixed-operators` | error | 9 operator groups; allowSamePrecedence: false | style.js |
| `@stylistic/indent` | error | 2, SwitchCase: 1; JSX nodes ignored | style.js |
| `@stylistic/semi` | error | always | style.js |
| `@stylistic/semi-spacing` | error | before: false, after: true | style.js |
| `@stylistic/semi-style` | error | last | style.js |
| `@stylistic/quotes` | error | single; avoidEscape: true | style.js |
| `@stylistic/quote-props` | error | as-needed; unnecessary: true | style.js |
| `@stylistic/comma-dangle` | error | always-multiline (arrays, objects, imports, exports, functions) | style.js |
| `@stylistic/comma-spacing` | error | before: false, after: true | style.js |
| `@stylistic/comma-style` | error | last; 11 exception types: false | style.js |
| `@stylistic/brace-style` | error | 1tbs; allowSingleLine: true | style.js |
| `@stylistic/arrow-parens` | error | always | es6.js |
| `@stylistic/arrow-spacing` | error | before: true, after: true | es6.js |
| `@stylistic/array-bracket-spacing` | error | never | style.js |
| `@stylistic/block-spacing` | error | always | style.js |
| `@stylistic/computed-property-spacing` | error | never | style.js |
| `@stylistic/function-call-spacing` | error | never | style.js |
| `@stylistic/key-spacing` | error | beforeColon: false, afterColon: true | style.js |
| `@stylistic/keyword-spacing` | error | before: true, after: true; return/throw/case overrides | style.js |
| `@stylistic/object-curly-spacing` | error | always | style.js |
| `@stylistic/space-before-blocks` | error | (default) | style.js |
| `@stylistic/space-before-function-paren` | error | anonymous: always, named: never, asyncArrow: always | style.js |
| `@stylistic/space-in-parens` | error | never | style.js |
| `@stylistic/space-infix-ops` | error | (default) | style.js |
| `@stylistic/space-unary-ops` | error | words: true, nonwords: false | style.js |
| `@stylistic/switch-colon-spacing` | error | after: true, before: false | style.js |
| `@stylistic/template-curly-spacing` | error | (default: never) | style.js |
| `@stylistic/template-tag-spacing` | error | never | style.js |
| `@stylistic/eol-last` | error | always | style.js |
| `@stylistic/linebreak-style` | error | unix | style.js |
| `@stylistic/lines-between-class-members` | error | always; exceptAfterSingleLine: false | style.js |
| `@stylistic/new-parens` | error | (default) | style.js |
| `@stylistic/newline-per-chained-call` | error | ignoreChainWithDepth: 4 | style.js |
| `@stylistic/no-extra-semi` | error | (default) | style.js |
| `@stylistic/no-floating-decimal` | error | (default) | best-practices.js |
| `@stylistic/no-mixed-spaces-and-tabs` | error | (default) | style.js |
| `@stylistic/no-multi-spaces` | error | ignoreEOLComments: false | best-practices.js |
| `@stylistic/no-multiple-empty-lines` | error | max: 1, maxBOF: 0, maxEOF: 0 | style.js |
| `@stylistic/no-tabs` | error | (default) | style.js |
| `@stylistic/no-trailing-spaces` | error | skipBlankLines: false, ignoreComments: false | style.js |
| `@stylistic/no-whitespace-before-property` | error | (default) | style.js |
| `@stylistic/nonblock-statement-body-position` | error | beside | style.js |
| `@stylistic/object-curly-newline` | error | minProperties: 4, multiline: true, consistent: true (per context) | style.js |
| `@stylistic/object-property-newline` | error | allowAllPropertiesOnSameLine: true | style.js |
| `@stylistic/one-var-declaration-per-line` | error | always | style.js |
| `@stylistic/operator-linebreak` | error | before; '=' override: none | style.js |
| `@stylistic/padded-blocks` | error | blocks/classes/switches: never; allowSingleLineBlocks: true | style.js |
| `@stylistic/function-paren-newline` | error | multiline-arguments | style.js |
| `@stylistic/function-call-argument-newline` | error | consistent | style.js |
| `@stylistic/implicit-arrow-linebreak` | error | beside | style.js |
| `@stylistic/generator-star-spacing` | error | before: false, after: true | es6.js |
| `@stylistic/rest-spread-spacing` | error | never | es6.js |
| `@stylistic/yield-star-spacing` | error | after | es6.js |
| `@stylistic/dot-location` | error | property | best-practices.js |

### JSX Formatting (12 rules)

| Rule | Severity | Key Options | Source |
|---|---|---|---|
| `@stylistic/jsx-quotes` | error | prefer-double | react.js |
| `@stylistic/jsx-indent-props` | error | 2 | react.js |
| `@stylistic/jsx-closing-bracket-location` | error | line-aligned | react.js |
| `@stylistic/jsx-closing-tag-location` | error | (default) | react.js |
| `@stylistic/jsx-curly-spacing` | error | never; allowMultiline: true | react.js |
| `@stylistic/jsx-curly-newline` | error | multiline: consistent, singleline: consistent | react.js |
| `@stylistic/jsx-equals-spacing` | error | never | react.js |
| `@stylistic/jsx-first-prop-new-line` | error | multiline-multiprop | react.js |
| `@stylistic/jsx-max-props-per-line` | error | maximum: 1, when: multiline | react.js |
| `@stylistic/jsx-one-expression-per-line` | error | allow: single-child | react.js |
| `@stylistic/jsx-tag-spacing` | error | closingSlash: never, beforeSelfClosing: always, afterOpening: never, beforeClosing: never | react.js |
| `@stylistic/jsx-wrap-multilines` | error | parens-new-line for declaration, assignment, return, arrow, condition, logical, prop | react.js |

### TypeScript Override (1 rule)

| Rule | Severity | Key Options | Source |
|---|---|---|---|
| `@stylistic/lines-between-class-members` | error | always; exceptAfterSingleLine: false, exceptAfterOverload: true | typescript |

### Methodology Notes

- Options copied verbatim from Airbnb source files (best-practices.js, es6.js, style.js, react.js)
- `func-call-spacing` renamed to `function-call-spacing` per @stylistic convention
- `jsx-indent` and `jsx-props-no-multi-spaces` removed (deprecated in @stylistic v4+, not in v5)
- @stylistic v5+ is ESM-only with unified JS+TS+JSX rules

---

## Dropped Rules -- By Category

### Formatting / Stylistic (~60 rules)

**Rationale**: Formatting is handled by Prettier, `@stylistic/eslint-plugin`, or editor
settings. These rules enforce whitespace, indentation, bracket placement, and other
visual concerns that are orthogonal to code quality. Mixing formatting rules with
linting rules caused the majority of ESLint 9 migration headaches in the ecosystem.

Dropped from `style.js`:

| Rule | Original Severity | Why Dropped |
|------|-------------------|-------------|
| `array-bracket-spacing` | error | Formatting (Prettier) |
| `block-spacing` | error | Formatting (Prettier) |
| `brace-style` | error | Formatting (Prettier) |
| `comma-dangle` | error | Formatting (Prettier) |
| `comma-spacing` | error | Formatting (Prettier) |
| `comma-style` | error | Formatting (Prettier) |
| `computed-property-spacing` | error | Formatting (Prettier) |
| `eol-last` | error | Formatting (Prettier) |
| `func-call-spacing` | error | Formatting (Prettier) |
| `function-paren-newline` | error | Formatting (Prettier) |
| `implicit-arrow-linebreak` | error | Formatting (Prettier) |
| `indent` | error | Formatting (Prettier) |
| `jsx-quotes` | error | Formatting (Prettier) |
| `key-spacing` | error | Formatting (Prettier) |
| `keyword-spacing` | error | Formatting (Prettier) |
| `linebreak-style` | error | Formatting (Prettier) |
| `lines-around-directive` | error | Formatting (Prettier) |
| `lines-between-class-members` | error | Formatting (Prettier) |
| `max-statements-per-line` | error | Formatting (Prettier) |
| `multiline-ternary` | error | Formatting (Prettier) |
| `new-parens` | error | Formatting (Prettier) |
| `newline-per-chained-call` | error | Formatting (Prettier) |
| `no-extra-parens` | error | Formatting (Prettier) |
| `no-mixed-spaces-and-tabs` | error | Formatting (Prettier), also in eslint:recommended |
| `no-multi-spaces` | error | Formatting (Prettier) |
| `no-multiple-empty-lines` | error | Formatting (Prettier) |
| `no-tabs` | error | Formatting (Prettier) |
| `no-trailing-spaces` | error | Formatting (Prettier) |
| `no-whitespace-before-property` | error | Formatting (Prettier) |
| `nonblock-statement-body-position` | error | Formatting (Prettier) |
| `object-curly-newline` | error | Formatting (Prettier) |
| `object-curly-spacing` | error | Formatting (Prettier) |
| `object-property-newline` | error | Formatting (Prettier) |
| `one-var-declaration-per-line` | error | Formatting (Prettier) |
| `operator-linebreak` | error | Formatting (Prettier) |
| `padded-blocks` | error | Formatting (Prettier) |
| `quote-props` | error | Formatting (Prettier) |
| `quotes` | error | Formatting (Prettier) |
| `semi` | error | Formatting (Prettier / @stylistic) |
| `semi-spacing` | error | Formatting (Prettier) |
| `semi-style` | error | Formatting (Prettier) |
| `space-before-blocks` | error | Formatting (Prettier) |
| `space-before-function-paren` | error | Formatting (Prettier) |
| `space-in-parens` | error | Formatting (Prettier) |
| `space-infix-ops` | error | Formatting (Prettier) |
| `space-unary-ops` | error | Formatting (Prettier) |
| `switch-colon-spacing` | error | Formatting (Prettier) |
| `template-curly-spacing` | error | Formatting (Prettier) |
| `template-tag-spacing` | error | Formatting (Prettier) |
| `unicode-bom` | error | Formatting (Prettier) |
| `wrap-regex` | error | Formatting (Prettier) |
| `yield-star-spacing` | error | Formatting (Prettier) |

Dropped from `es6.js`:

| Rule | Original Severity | Why Dropped |
|------|-------------------|-------------|
| `arrow-parens` | error | Formatting (Prettier) |
| `arrow-spacing` | error | Formatting (Prettier) |
| `generator-star-spacing` | error | Formatting (Prettier) |
| `rest-spread-spacing` | error | Formatting (Prettier) |

Dropped from `react.js` (JSX formatting):

| Rule | Original Severity | Why Dropped |
|------|-------------------|-------------|
| `react/jsx-closing-bracket-location` | error | Formatting (Prettier) |
| `react/jsx-closing-tag-location` | error | Formatting (Prettier) |
| `react/jsx-curly-newline` | error | Formatting (Prettier) |
| `react/jsx-curly-spacing` | error | Formatting (Prettier) |
| `react/jsx-equals-spacing` | error | Formatting (Prettier) |
| `react/jsx-first-prop-new-line` | error | Formatting (Prettier) |
| `react/jsx-indent` | error | Formatting (Prettier) |
| `react/jsx-indent-props` | error | Formatting (Prettier) |
| `react/jsx-max-props-per-line` | error | Formatting (Prettier) |
| `react/jsx-one-expression-per-line` | error | Formatting (Prettier) |
| `react/jsx-props-no-multi-spaces` | error | Formatting (Prettier) |
| `react/jsx-tag-spacing` | error | Formatting (Prettier) |
| `react/jsx-wrap-multilines` | error | Formatting (Prettier) |

### PropTypes (~8 rules)

**Rationale**: TypeScript provides compile-time type checking that is strictly superior
to runtime PropTypes. These rules enforce patterns that are meaningless in a TypeScript
codebase.

| Rule | Original Severity | Why Dropped |
|------|-------------------|-------------|
| `react/prop-types` | error | TypeScript interfaces replace PropTypes entirely. |
| `react/no-unused-prop-types` | error | TypeScript compiler catches unused type fields. |
| `react/default-props-match-prop-types` | error | TypeScript default parameters replace `defaultProps`. |
| `react/require-default-props` | error | TypeScript optional props (`prop?: Type`) replace `defaultProps`. |
| `react/sort-prop-types` | error | TypeScript interface field ordering is a style concern. |
| `react/forbid-prop-types` | error | No PropTypes = no need to forbid certain PropType shapes. |
| `react/no-typos` | error | TypeScript compiler catches typos in prop names at compile time. |
| `react/boolean-prop-naming` | off | Was off in Airbnb; confirmed no value with TypeScript. |

### Class Components (~6 rules)

**Rationale**: Modern React uses function components exclusively. React 19 does not add
new class component APIs. These rules enforce patterns in `class extends Component`
that have no equivalent in function components.

| Rule | Original Severity | Why Dropped |
|------|-------------------|-------------|
| `react/no-direct-mutation-state` | error | `this.state` does not exist in function components. |
| `react/no-did-mount-set-state` | error | `componentDidMount` does not exist in function components (use `useEffect`). |
| `react/no-did-update-set-state` | error | `componentDidUpdate` does not exist in function components. |
| `react/no-will-update-set-state` | error | `componentWillUpdate` does not exist in function components. |
| `react/no-redundant-should-component-update` | error | `shouldComponentUpdate` does not exist in function components (use `React.memo`). |
| `react/state-in-constructor` | error | No constructor in function components. |
| `react/sort-comp` | error | Class method ordering has no equivalent in function components. |
| `react/no-access-state-in-setstate` | error | `setState` callback pattern does not exist in function components. |
| `react/prefer-stateless-function` | error | All components are already stateless functions. |
| `react/no-multi-comp` | error | Was `off` in Airbnb; irrelevant without class component boilerplate. |

### eslint-plugin-import (~25 rules)

**Rationale**: `eslint-plugin-import` has had chronic ESLint 9 flat config compatibility
issues. Multiple GitHub issues document broken resolution, performance regressions, and
incomplete flat config support. TypeScript + bundlers (Next.js, Vite) already handle
import resolution, cycle detection, and module boundaries at build time.

The `eslint-plugin-import` rules fell into three sub-categories:

**Static analysis (resolution)** -- TypeScript handles:

| Rule | Why Dropped |
|------|-------------|
| `import/no-unresolved` | TypeScript compiler catches unresolved imports. |
| `import/named` | TypeScript compiler verifies named exports exist. |
| `import/default` | TypeScript compiler verifies default exports. |
| `import/namespace` | TypeScript compiler verifies namespace imports. |
| `import/no-absolute-path` | Rare issue; bundler config prevents. |
| `import/no-dynamic-require` | TypeScript `import()` syntax is type-checked. |
| `import/no-webpack-loader-syntax` | Webpack-specific; Next.js handles. |

**Helpful warnings** -- dropped due to plugin instability:

| Rule | Why Dropped |
|------|-------------|
| `import/no-cycle` | Expensive rule (full graph traversal). TypeScript strict mode + bundler tree-shaking mitigate cycles. |
| `import/no-self-import` | TypeScript compiler errors on self-imports. |
| `import/no-useless-path-segments` | Nice-to-have but not worth plugin dependency. |
| `import/no-relative-packages` | Monorepo-specific. |
| `import/no-mutable-exports` | `prefer-const` + TypeScript `readonly` cover this. |
| `import/no-extraneous-dependencies` | `package.json` `dependencies` vs `devDependencies` enforcement. TypeScript + bundlers catch missing deps at build. |

**Style / ordering** -- formatting concern:

| Rule | Why Dropped |
|------|-------------|
| `import/order` | Import ordering is a formatting concern (Prettier plugin or `@ianvs/prettier-plugin-sort-imports`). |
| `import/newline-after-import` | Formatting (Prettier). |
| `import/prefer-default-export` | Controversial. Named exports are often preferred (better tree-shaking, explicit API). |
| `import/no-named-as-default` | False positives with TypeScript re-exports. |
| `import/no-named-as-default-member` | False positives with TypeScript namespace patterns. |
| `import/no-duplicates` | TypeScript compiler + Prettier import sort handle duplicate imports. |
| `import/extensions` | TypeScript handles extension resolution. Bundlers resolve `.ts`/`.tsx`. |
| `import/first` | Formatting (import order). |
| `import/no-anonymous-default-export` | Style preference; named exports enforced by convention. |
| `import/no-named-default` | Style preference. |

### TypeScript-Redundant (~5 rules)

**Rationale**: These rules are already enabled by `typescript-eslint:recommended` with
identical or stricter settings. Including them would be a no-op.

| Rule | Why Dropped |
|------|-------------|
| `@typescript-eslint/no-explicit-any` | Already in tseslint:recommended (warn). |
| `@typescript-eslint/no-non-null-assertion` | Already in tseslint:recommended (warn). |
| `@typescript-eslint/no-var-requires` | Already in tseslint:recommended (error). Deprecated in v8+. |
| `@typescript-eslint/ban-ts-comment` | Already in tseslint:recommended (error with `allowWithDescription`). |

### Already in eslint:recommended (~5 rules)

**Rationale**: These rules ship identically in `eslint:recommended` (which this package
layers on top of). Duplicating them adds no value.

| Rule | Why Dropped |
|------|-------------|
| `no-debugger` | Identical to eslint:recommended. |
| `no-empty` | Identical to eslint:recommended. |
| `no-extra-semi` | Identical to eslint:recommended (also formatting). |
| `use-isnan` | Identical to eslint:recommended. |
| `valid-typeof` | Identical to eslint:recommended. |
| `no-constant-condition` | Identical to eslint:recommended. |
| `no-dupe-args` | Identical to eslint:recommended. |
| `no-dupe-keys` | Identical to eslint:recommended. |
| `no-duplicate-case` | Identical to eslint:recommended. |
| `no-empty-character-class` | Identical to eslint:recommended. |
| `no-ex-assign` | Identical to eslint:recommended. |
| `no-func-assign` | Identical to eslint:recommended. |
| `no-inner-declarations` | Identical to eslint:recommended. |
| `no-invalid-regexp` | Identical to eslint:recommended. |
| `no-irregular-whitespace` | Identical to eslint:recommended. |
| `no-obj-calls` | Identical to eslint:recommended. |
| `no-regex-spaces` | Identical to eslint:recommended. |
| `no-sparse-arrays` | Identical to eslint:recommended. |
| `no-unexpected-multiline` | Identical to eslint:recommended. |
| `no-unreachable` | Identical to eslint:recommended. |
| `no-unsafe-finally` | Identical to eslint:recommended. |
| `no-unsafe-negation` | Identical to eslint:recommended. |
| `no-unused-labels` | Identical to eslint:recommended. |
| `no-useless-catch` | Identical to eslint:recommended. |
| `no-useless-escape` | Identical to eslint:recommended. |
| `no-with` | Identical to eslint:recommended. |
| `require-yield` | Identical to eslint:recommended. |
| `no-undef` | In eslint:recommended; disabled by tseslint:recommended for TS files. |

### React -- Already in recommended (~5 rules)

**Rationale**: These rules ship in `eslint-plugin-react:recommended`. The package comment
in `react.ts` explicitly notes these exclusions.

| Rule | Why Dropped |
|------|-------------|
| `react/no-danger-with-children` | Identical to react:recommended. |
| `react/no-unescaped-entities` | Identical to react:recommended. |
| `react/no-children-prop` | Identical to react:recommended. |
| `react/display-name` | Identical to react:recommended. |
| `react/jsx-key` | Identical to react:recommended. |
| `react/jsx-no-duplicate-props` | Identical to react:recommended. |
| `react/jsx-no-target-blank` | Identical to react:recommended. |
| `react/jsx-no-undef` | Identical to react:recommended. |
| `react/jsx-uses-react` | Identical to react:recommended (disabled in jsx-runtime). |
| `react/jsx-uses-vars` | Identical to react:recommended. |
| `react/no-deprecated` | Identical to react:recommended. |
| `react/no-find-dom-node` | Identical to react:recommended. |
| `react/no-is-mounted` | Identical to react:recommended. |
| `react/no-render-return-value` | Identical to react:recommended. |
| `react/no-string-refs` | Identical to react:recommended. |
| `react/no-unknown-property` | Identical to react:recommended. |
| `react/react-in-jsx-scope` | Identical to react:recommended (disabled in jsx-runtime). |
| `react/require-render-return` | Identical to react:recommended. |

### Miscellaneous Dropped Rules (~5 rules)

| Rule | Original Source | Why Dropped |
|------|----------------|-------------|
| `no-unused-private-class-members` | es6.js | Class-specific. TypeScript compiler catches unused members. |
| `prefer-named-capture-group` | best-practices.js | Was `off` in Airbnb. ES2018 feature not universally adopted. |
| `no-magic-numbers` | best-practices.js | Was `off` in Airbnb. Too noisy for most codebases. |
| `no-eq-null` | best-practices.js | Conflicts with `eqeqeq` `{ null: 'ignore' }` setting (Airbnb keeps it off). |
| `react/no-danger` | react.js | Kept as `warn` (see React table above). |

---

## Methodology

### Audit Process

1. **DeepWiki analysis** of 6 upstream repositories to identify the complete Airbnb rule
   inventory:
   - `airbnb/javascript` (eslint-config-airbnb-base: best-practices.js, es6.js, imports.js, style.js, variables.js)
   - `airbnb/javascript` (eslint-config-airbnb: react.js, react-a11y.js)
   - `iamturns/eslint-config-airbnb-typescript` (original TypeScript bridge)
   - `@kesills/eslint-config-airbnb-typescript` (maintained fork)
   - `eslint-plugin-react` (recommended config for baseline)
   - `eslint-plugin-jsx-a11y` (recommended config for baseline)

2. **Source code extraction**: Every rule from the 6 Airbnb source files was cataloged
   with its severity, options, and inline comments.

3. **Classification**: Each rule was classified into one of:
   - **Keep**: Rule provides code quality value beyond what recommended configs provide.
   - **Drop (formatting)**: Rule enforces whitespace/indentation handled by Prettier.
   - **Drop (PropTypes)**: Rule enforces PropTypes patterns replaced by TypeScript.
   - **Drop (class)**: Rule enforces class component patterns not used in modern React.
   - **Drop (import)**: Rule requires eslint-plugin-import (chronic ESLint 9 issues).
   - **Drop (redundant)**: Rule is identical to eslint:recommended or tseslint:recommended.

4. **Production validation**: The rule set was validated against a production Next.js 15
   + React 19 + TypeScript 5.9 codebase (nightclub reservation platform) with 200+
   components, confirming zero false positives and catching real issues.

### Why Not Just Use eslint-config-airbnb?

`eslint-config-airbnb` (v19.0.4) does not support ESLint 9 flat config. It uses the
legacy `.eslintrc` format and has peer dependency requirements incompatible with ESLint 9.
As of March 2026, the Airbnb team has not released a flat config version.

Alternatives like `eslint-config-airbnb-flat` (other packages on npm) typically:
- Auto-generate rules without auditing which ones are formatting vs logic
- Include eslint-plugin-import (broken ESLint 9 support)
- Include PropTypes rules (useless with TypeScript)
- Don't document which rules they keep or drop

This package takes the opposite approach: hand-audit every rule, document every decision,
ship only what provides value in a modern TypeScript + Prettier stack.
