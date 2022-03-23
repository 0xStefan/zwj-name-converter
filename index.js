"use strict";

const punycodeRegex = require("./scripts/punycode-regex");
const nameToAscii = require("./scripts/name-to-ascii");
const nameToUnicode = require("./scripts/name-to-unicode");

module.exports = {
  punycodeRegex,
  nameToAscii,
  nameToUnicode,
};
