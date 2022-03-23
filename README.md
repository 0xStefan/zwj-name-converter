# zwj-name-converter

[![Build Status][ci-status-img]][ci-status-url]

Convert any Name to Unicode or ASCII, respecting the Zero Width Joiner ([ZWJ](https://emojipedia.org/zero-width-joiner/)) character. _zwj-name-converter_ was especially designed to be fully compatible with the [Handshake protocol](https://handshake.org/) but is not limited to that. The zwj-name-converter is currently implemented on https://niami.io/.

It is compatible with [Unicode Version 14.0](https://emojipedia.org/unicode-14.0/).

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install zwj-name-converter
```

In [Node.js](https://nodejs.org/):

```js
const converter = require("zwj-name-converter");

// To Unicode
converter.nameToUnicode("xn--vi8h"); // 🍕
converter.nameToUnicode("xn--nn8hi4bz4d"); // 🧑🏼‍🚀
converter.nameToUnicode("👨🏾❤👨🏽"); // 👨🏾‍❤‍👨🏽

// To ASCII
converter.nameToAscii("🍕"); // xn--vi8h
converter.nameToAscii("&/#, +()$~%.AL IC E-bob"); // alice-bob
converter.nameToAscii("xn--vi8h文教材"); // xn--xn--vi8h-5x3qlog6n
```

## Test

```bash
npm test
```

## License

_zwj-name-converter_ is available under the [MIT](https://mths.be/mit) license.
