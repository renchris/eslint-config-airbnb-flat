# Rule-by-Rule Audit Trail

Every Airbnb ESLint rule decision, documented. This is the complete audit trail for
`eslint-config-airbnb-flat` -- which rules shipped, which were dropped, and why.

No other Airbnb flat config alternative documents their decisions at this level.

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| **Airbnb upstream rules audited** | ~350 | Across 6 source files + react + react-a11y + import + typescript |
| **Shipped in this package** | 98 | 71 base + 18 React + 9 TypeScript pairs |
| **Inherited from recommended** | ~80 | eslint:recommended (42), tseslint:recommended (~25), react:recommended (~12) |
| **Dropped** | ~170 | Formatting, PropTypes, class components, import plugin, redundant |

### Where rules live

This package ships rules **on top of** recommended configs. The full Airbnb experience
comes from layering:

1. `eslint:recommended` (42 rules) -- core JS safety
2. `typescript-eslint:recommended` (~25 rules) -- TS-specific safety
3. `eslint-plugin-react:recommended` (~12 rules) -- React safety
4. `eslint-plugin-jsx-a11y:recommended` (~30 rules) -- accessibility
5. **`airbnb-flat/base`** (71 rules) -- Airbnb opinions beyond recommended
6. **`airbnb-flat/react`** (18 rules) -- Airbnb React opinions beyond recommended
7. **`airbnb-flat/typescript`** (9 rule pairs) -- type-aware replacements

---

## Kept Rules -- Base (71 rules)

### Best Practices (39 rules)

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
| `yoda` | error | -- | Bans Yoda conditions: `if (color === 'red')` not `if ('red' === color)`. |

### ES6 (14 rules)

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

### Variables (2 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/variables.js`

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-label-var` | error | -- | Bans labels with same name as a variable (confusion hazard). |
| `no-undef-init` | error | -- | Bans `let x = undefined` (redundant; `let x` is sufficient). |

### Style -- Non-Formatting (16 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb-base/rules/style.js`

These are the style rules that enforce **logic and readability**, not whitespace/formatting.
All pure formatting rules from style.js were dropped (see [Dropped -- Formatting](#formatting--stylistic-60-rules)).

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `no-bitwise` | error | -- | Bans `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`. Usually a typo for `&&`/`||`. |
| `no-continue` | error | -- | Bans `continue`. Airbnb prefers early returns and array methods. |
| `no-lonely-if` | error | -- | `if` as sole statement in `else` should be `else if`. |
| `no-multi-assign` | error | -- | Bans `a = b = c = 1`. Unclear which variables are being set. |
| `no-nested-ternary` | error | -- | Bans `a ? b ? c : d : e`. Hard to read. |
| `no-plusplus` | error | -- | Bans `++`/`--`. Use `+= 1`/`-= 1` (avoids semicolon insertion bugs). |
| `no-restricted-syntax` | error | 4 selectors | Bans `for...in` (prototype chain), `for...of` (regenerator-runtime), labels, `with`. |
| `no-underscore-dangle` | error | `{ allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'], enforceInMethodNames: true }` | Bans `_private` naming convention. Exception for Redux DevTools. |
| `no-unneeded-ternary` | error | `{ defaultAssignment: false }` | Bans `x ? x : 'default'` and `x ? true : false`. |
| `one-var` | error | `'never'` | One `const`/`let` per declaration. |
| `operator-assignment` | error | `'always'` | Use `x += 1` not `x = x + 1`. |
| `prefer-object-spread` | error | -- | Use `{ ...obj }` not `Object.assign({}, obj)`. |
| `spaced-comment` | error | See config | Require space after `//` and `/*`. Allows `/`, `!`, `=`, `::` markers. |
| `new-cap` | error | `{ newIsCap: true, capIsNew: false }` | `new Foo()` not `new foo()`. Allows `Immutable.Map()` without `new`. |
| `func-names` | warn | -- | Warns on anonymous function expressions (helps stack traces). |
| `max-len` | error | `100, 2` | 100 char limit, tab width 2. Ignores URLs, regex, strings, template literals. Does not ignore comments. |

---

## Kept Rules -- React (18 rules)

Source: `airbnb/javascript` > `packages/eslint-config-airbnb/rules/react.js` and `react-a11y.js`

These are rules Airbnb sets **on top of** `eslint-plugin-react:recommended` and
`eslint-plugin-jsx-a11y:recommended`. Rules that are identical to the recommended
configs are excluded (they're inherited automatically).

### React Plugin Rules (17 rules)

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

### JSX-a11y Override (1 rule)

| Rule | Severity | Options | Notes |
|------|----------|---------|-------|
| `jsx-a11y/no-autofocus` | error | `{ ignoreNonDOM: true }` | Airbnb override: allows `autoFocus` on custom components (e.g., modal focus traps), bans on native DOM elements. jsx-a11y:recommended does not set `ignoreNonDOM`. |

---

## Kept Rules -- TypeScript (9 rule pairs)

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
| `no-mixed-operators` | error | Formatting (Prettier) |
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
| `wrap-iife` | error | Formatting (Prettier) |
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
| `@typescript-eslint/no-unused-vars` | Already in tseslint:recommended (error). Consumers often customize. |
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
| `no-cond-assign` | Identical to eslint:recommended. |
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
| `no-unused-vars` | Identical to eslint:recommended (overridden by tseslint:recommended in TS mode). |
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

### Miscellaneous Dropped Rules (~10 rules)

| Rule | Original Source | Why Dropped |
|------|----------------|-------------|
| `no-restricted-exports` | es6.js | Airbnb-specific convention (`default` export restriction). Not universally useful. |
| `class-methods-use-this` | best-practices.js | Class-specific. Function components don't have methods. |
| `no-empty-function` | best-practices.js | TypeScript-eslint:recommended handles via `@typescript-eslint/no-empty-function`. |
| `no-useless-constructor` | es6.js | TypeScript-eslint:recommended handles via `@typescript-eslint/no-useless-constructor`. |
| `no-unused-private-class-members` | es6.js | Class-specific. TypeScript compiler catches unused members. |
| `prefer-named-capture-group` | best-practices.js | Was `off` in Airbnb. ES2018 feature not universally adopted. |
| `no-magic-numbers` | best-practices.js | Was `off` in Airbnb. Too noisy for most codebases. |
| `max-classes-per-file` | best-practices.js | Class-specific. Function component files often co-locate helpers. |
| `no-new-func` | best-practices.js | Subsumed by `no-eval` + `no-implied-eval` (type-aware TS version). |
| `guard-for-in` | best-practices.js | `for...in` is already banned by `no-restricted-syntax`. |
| `no-eq-null` | best-practices.js | Conflicts with `eqeqeq` `{ null: 'ignore' }` setting (Airbnb keeps it off). |
| `react/jsx-props-no-spreading` | react.js | Was `error` in Airbnb. Highly controversial -- component libraries (Ark UI, Radix) rely on prop spreading. Left to consumers. |
| `react/function-component-definition` | react.js | Was `error` in Airbnb (prefers `function` declarations). Arrow vs function is a team style choice. Left to consumers. |
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
