"use strict";

const punycode = require("punycode/punycode");
const uts46 = require("idna-uts46-hx");
const tr46 = require("tr46");

const punycodeRegex = require("./punycode-regex");
const nameToAscii = require("./name-to-ascii");

const skinColors = require("../lib/skin-colors");
const tonedEmojis = require("../lib/toned-emojis");

/**
 * @desc Returns the unicode from a string
 * @param {string} name
 * @return unicode name or empty string
 */
module.exports = (name) => {
  name = nameToAscii(name);

  if (!punycodeRegex().test(name)) return name;

  const allChars = tonedEmojis.concat(skinColors);
  let unicode;
  let chars = [];
  let idnaCheck = false;

  try {
    unicode = tr46.toUnicode(name).domain;
  } catch (error) {
    return name;
  }

  try {
    // double check with strict uts46 library
    idnaCheck = uts46.toAscii(unicode) === name;
  } catch (error) {
    // Failed to validate + Overflow seem too strict
    if (
      error.message.includes("Failed to validate") ||
      error.message.includes("Overflow")
    )
      idnaCheck = true;
  }

  if (!idnaCheck) return name;

  let i = 0;
  for (let c of unicode) {
    // remove last zwj if the next one is a skin color
    if (skinColors.includes(c)) chars.pop();

    // add emoji
    chars.push(c);

    // add zwj
    if (allChars.includes(c)) chars.push("\u200d");

    i++;
  }

  // remove last ZWJ
  if (chars[chars.length - 1] === "\u200d") chars.pop();

  return chars.join("");
};
