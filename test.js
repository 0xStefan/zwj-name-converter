const test = require("ava");
const punycodeRegex = require("./scripts/punycode-regex");
const nameToAscii = require("./scripts/name-to-ascii");
const nameToUnicode = require("./scripts/name-to-unicode");
const invalidPunycodeExamples = require("./lib/invalid-punycode-examples");

test("Punycode Regex", (t) => {
  t.false(punycodeRegex().test("notpunycode"));
  t.true(punycodeRegex().test("xn--vi8h"));
  t.true(punycodeRegex().test("XN--nn8hea944cfa"));
  t.true(punycodeRegex().test("Xn---nn8hea944cfa"));
  t.true(punycodeRegex().test("xn--vi8h🍕"));
  t.true(punycodeRegex().test("xn----bi3sea"));
  t.true(punycodeRegex().test("xn----7sbbqcdlv9ch"));
  t.true(punycodeRegex().test("xn---hren---sgen-ocb8v"));
});

test("Convert Input to clean ASCII Handshake Name", (t) => {
  t.is(nameToAscii("ALICE bob &/#,+()$~%.':*?!<>{}[]"), "alicebob");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]ALICE bob"), "alicebob");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]🍕"), "xn--vi8h");
  t.is(nameToAscii("xn--vi8h"), "xn--vi8h");
  t.is(nameToAscii("🧑🏼‍🚀"), "xn--nn8hi4bz4d");
  t.is(nameToAscii("I love 🍕"), "xn--ilove-0q93d");
  t.is(nameToAscii("With Ümlaut ö"), "xn--withmlaut-87a4d");
  t.is(nameToAscii("xn--vi8h🍕"), "xn--xn--vi8h-wh25g");
  t.is(nameToAscii("xn--vi8h文教材"), "xn--xn--vi8h-5x3qlog6n");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]xn--vi8h🍕"), "xn--xn--vi8h-wh25g");
  t.is(nameToAscii(".֩"), "xn--0cb");
  t.is(nameToAscii("❤‍🫑"), "xn--qei1760n");
  t.is(nameToAscii("❤🫑"), "xn--qei1760n");
});

test("Convert Input to IDNA2003/2008 Unicode name including zwj", (t) => {
  t.is(nameToUnicode("xn---hren---sgen-ocb8v"), "-hören---sägen");
  t.is(nameToUnicode("ALICE bob &/#,+()$~%.':*?!<>{}[]"), "alicebob");
  t.is(nameToUnicode("&/#, +()$~%.':*?!<>{}[]A_L IC E-bob"), "a_lice-bob");
  t.is(nameToUnicode("&/#,+()$~%.':*?!<>{}[]🍕"), "🍕");
  t.is(nameToUnicode("xn--vi8h"), "🍕");
  t.is(nameToUnicode("xn--nn8hi4bz4d"), "🧑🏼‍🚀");
  t.is(nameToUnicode("xn--qn8hh5i"), "🫳🏿");
  t.is(nameToUnicode("xn--nn8hea944cfa"), "🫱🏼‍🫲🏾");
  t.is(nameToUnicode("🫄🏾"), "🫄🏾");
  t.is(nameToUnicode("😄😃🫠"), "😄😃🫠");
  t.is(nameToUnicode("I love 🍕"), "ilove🍕");
  t.is(nameToUnicode("With Ümlaut ö"), "withümlautö");
  t.is(nameToUnicode("👨🏾❤👨🏽"), "👨🏾‍❤‍👨🏽");
  t.is(nameToUnicode("xn--xn--vi8h-wh25g"), "xn--vi8h🍕");
  t.is(nameToUnicode("xn--vi8h文教材"), "xn--vi8h文教材");
  t.is(nameToUnicode("&/#,+()$~%.':*?!<>{}[]xn--vi8h🍕"), "xn--vi8h🍕");
  t.is(nameToUnicode("xn----7sbbqcdlv9ch"), "аскер-заде");
  t.is(nameToUnicode("xn--4ug3ew87z"), "‹牋‐");
  t.is(nameToUnicode("xn--071a"), "虐");
  t.is(nameToUnicode("xn--qei1760n"), "❤‍🫑");
  t.is(nameToUnicode("xn----bi3sea"), "🔙-🔚");
  t.is(nameToUnicode("xn--qei0070n"), "❤‍🫧");
});

test("Don't convert unsupported punycode", (t) => {
  invalidPunycodeExamples.forEach((e) => t.is(nameToUnicode(e), e));
  invalidPunycodeExamples.forEach((e) => t.is(nameToAscii(e), e));
});
