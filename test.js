const test = require("ava");
const punycodeRegex = require("./scripts/punycode-regex");
const nameToAscii = require("./scripts/name-to-ascii");
const nameToUnicode = require("./scripts/name-to-unicode");

test("Punycode Regex", (t) => {
  t.true(punycodeRegex().test("xn--vi8h"));
  t.true(punycodeRegex().test("XN--nn8hea944cfa"));
  t.false(punycodeRegex().test("Xn---nn8hea944cfa"));
  t.false(punycodeRegex().test("notpunycode"));
  t.true(punycodeRegex().test("xn--vi8h🍕"));
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
  t.is(nameToAscii("xn--zugaaaa"), "xn--zugaaaa");
});

test("Convert Input to Unicode Handshake name including zwj", (t) => {
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
});

test("Don't convert invalid punycode", (t) => {
  t.is(nameToUnicode("xn--zugaaaa"), "xn--zugaaaa");
  t.is(nameToUnicode("xn--1ug5408p"), "xn--1ug5408p");
  t.is(nameToUnicode("xn--lxg0205p"), "xn--lxg0205p");
  t.is(nameToUnicode("xn--lxg2706p"), "xn--lxg2706p");
  t.is(nameToUnicode("xn--v86c5408p"), "xn--v86c5408p");
  t.is(nameToUnicode("xn--lug"), "xn--lug");
  t.is(nameToUnicode("xn--3ug"), "xn--3ug");
  t.is(nameToUnicode("xn--vi8h🍕"), "xn--xn--vi8h-wh25g");
  t.is(nameToUnicode("xn--vi8h文教材"), "xn--xn--vi8h-5x3qlog6n");
  t.is(nameToUnicode("&/#,+()$~%.':*?!<>{}[]xn--vi8h🍕"), "xn--xn--vi8h-wh25g");
});
