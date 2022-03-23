const punycode = require("punycode");
const uts46 = require("idna-uts46-hx");

/**
 * @desc Returns a clean Handshake domain name in ASCII format
 * @param {string} name
 * @return cleaned name
 */
module.exports = nameToAscii = (name) => {
  let hnsName = name;
  let cleaned;

  // Remove unsupported characters
  cleaned = name.replace(/[&\/\\#,+()$~\%.\[\]'":*?!<>{}]/g, "");

  // Remove spaces
  cleaned = cleaned.replace(/\s+/g, "");

  // Convert to Punycode
  try {
    hnsName = uts46.toAscii(cleaned);
  } catch (error) {
    if (
      error.message.includes("Illegal char") ||
      error.message.includes("Overflow")
    ) {
      hnsName = punycode.toASCII(cleaned).toLowerCase();
    }
    /* Invalid input */
  }

  return hnsName;
};
