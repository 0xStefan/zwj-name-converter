# zwj-name-converter

[![Build Status][ci-status-img]][ci-status-url]

Convert any string to Unicode or ASCII, respecting the Zero Width Joiner ([ZWJ](https://emojipedia.org/zero-width-joiner/)) character. _zwj-name-converter_ was especially designed to be fully compatible with the [Handshake protocol](https://handshake.org/) but is not limited to that. The zwj-name-converter is currently implemented on https://niami.io/.

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
converter.nameToUnicode("xn--vi8h"); // ð
converter.nameToUnicode("xn--nn8hi4bz4d"); // ð§ðŒâð
converter.nameToUnicode("ðšðŸâ€ðšðœ"); // ðšðŸââ€âðšðœ

// Unsupported or Invalid Punycode will not be converted
converter.nameToUnicode("xn--0"); // xn--0
converter.nameToUnicode("xn--v86c5408p"); // xn--v86c5408p
converter.nameToUnicode("xn--1ug5408p"); // xn--1ug5408p

// To ASCII
converter.nameToAscii("ð"); // xn--vi8h
converter.nameToAscii("&/#, +()$~%.AL IC E-bob"); // alice-bob
converter.nameToAscii("xn--vi8hæææ"); // xn--xn--vi8h-5x3qlog6n
```

## Test

```bash
npm test
```

## License

_zwj-name-converter_ is available under the [MIT](https://mths.be/mit) license.

[ci-status-img]: https://github.com/0xStefan/zwj-name-converter/workflows/Build/badge.svg
[ci-status-url]: https://github.com/0xStefan/zwj-name-converter/tree/main
