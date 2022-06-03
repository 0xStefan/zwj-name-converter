const punycode = require("punycode/punycode");
const uts46 = require("idna-uts46-hx");
const tr46 = require("tr46");

/**
 * @desc Returns a clean Handshake domain name in ASCII format
 * @param {string} name
 * @return cleaned name
 */
module.exports = nameToAscii = (name) => {
  let hnsName = name;
  let cleaned;
  let convError = false;

  // Remove unsupported characters
  cleaned = name.replace(/[&\/\\#,+()$~\%.\[\]'":*?!<>{}]/g, "");

  // Remove spaces
  cleaned = cleaned.replace(/\s+/g, "");

  // Convert to Punycode
  try {
    hnsName = tr46.toASCII(cleaned, { processingOption: "transitional" });
  } catch (error) {
    convError = true;
  }

  if (hnsName === null || convError)
    hnsName = punycode.toASCII(cleaned).toLowerCase();

  return hnsName;
};
