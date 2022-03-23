"use strict";

const punycode = require("punycode");
const uts46 = require("idna-uts46-hx");

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
  // Clean name
  name = nameToAscii(name);

  // Return cleaned name if no punycode
  if (!punycodeRegex().test(name)) return name;

  const allChars = tonedEmojis.concat(skinColors);
  let unicode;
  let chars = [];

  try {
    unicode = uts46.toUnicode(name);
  } catch (error) {
    try {
      unicode = punycode.toUnicode(name);
    } catch (error) {
      // Invalid
      return "";
    }
  }

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

  // remove last element if zwj
  if (chars[chars.length - 1] === "\u200d") chars.pop();

  // combine to string
  return chars.join("");
};
