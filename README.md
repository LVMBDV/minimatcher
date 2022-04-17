# minimatcher

Simple wildcard matching in TypeScript and JavaScript.

## Installation

```
npm install minimatcher
```

## Usage

```javascript
import MiniMatcher from "minimatcher"

const matcher = new MiniMatcher("*bar", { global: true })

// MiniMatcher inherits from RegExp so it can be used wherever RegExp is used.

matcher.test("foobar") // true

"foobarbaz".replace(matcher, "goo") // "goobaz"
```

### Wildcards

Star (`*`) matches zero or more characters, including whitespace if the
`whitespace` option is enabled.

```javascript
const matcher = new MiniMatcher("foo*")

matcher.test("foo") // true
matcher.test("foobar") // true
matcher.test("foo\nbar") // true
```

Question mark (`?`) matches any single character, including whitespace if the
`whitespace` option is enabled.

```javascript
const matcher = new MiniMatcher("foo?")

matcher.test("food") // true
matcher.test("foot") // true
matcher.test("football") // false
```

Exclamation point (`!`) at the start of a pattern negates the pattern.
Anywhere else, it matches the character itself. In addition, if it's the only
character in a pattern i.e. `pattern === "!"`, it matches itself.

```javascript
const matcher = new MiniMatcher("!foo*")

matcher.test("foobar") // false
matcher.test("foo") // false
matcher.test("bar") // true
matcher.test("barfoo") // true
```

### Options

The second parameter of MiniMatcher's constructor is an object that can contain
the following options:

  * `indices`: If true, generate indices for substring matches.
  * `global`:  If true, search for the pattern in the whole string, not just the
  start.
  * `ignoreCase`: If true, search for the pattern case-insensitively.
  * `multiline`: If true, search for the pattern in each line of the string.
  * `whitespace`: True by default, wildcards match whitespace characters as well.
  * `unicode`: If true, characters in the pattern and the string are also
  recognized as code points.

### Disclaimer

minimatcher is [fair-code](http://faircode.io) distributed under the
[**Sustainable Use License**](https://github.com/lvmbdv/minimatcher/blob/master/LICENSE.md).