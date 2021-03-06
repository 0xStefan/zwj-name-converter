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
  t.true(punycodeRegex().test("xn--vi8hπ"));
  t.true(punycodeRegex().test("xn----bi3sea"));
  t.true(punycodeRegex().test("xn----7sbbqcdlv9ch"));
  t.true(punycodeRegex().test("xn---hren---sgen-ocb8v"));
});

test("Convert Input to clean ASCII Handshake Name", (t) => {
  t.is(nameToAscii("ALICE bob &/#,+()$~%.':*?!<>{}[]"), "alicebob");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]ALICE bob"), "alicebob");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]π"), "xn--vi8h");
  t.is(nameToAscii("xn--vi8h"), "xn--vi8h");
  t.is(nameToAscii("π§πΌβπ"), "xn--nn8hi4bz4d");
  t.is(nameToAscii("I love π"), "xn--ilove-0q93d");
  t.is(nameToAscii("With Γmlaut ΓΆ"), "xn--withmlaut-87a4d");
  t.is(nameToAscii("xn--vi8hπ"), "xn--xn--vi8h-wh25g");
  t.is(nameToAscii("xn--vi8hζζζ"), "xn--xn--vi8h-5x3qlog6n");
  t.is(nameToAscii("&/#,+()$~%.':*?!<>{}[]xn--vi8hπ"), "xn--xn--vi8h-wh25g");
  t.is(nameToAscii(".Φ©"), "xn--0cb");
  t.is(nameToAscii("β€βπ«"), "xn--qei1760n");
  t.is(nameToAscii("β€π«"), "xn--qei1760n");
});

test("Convert Input to IDNA2003/2008 Unicode name including zwj", (t) => {
  t.is(nameToUnicode("xn---hren---sgen-ocb8v"), "-hΓΆren---sΓ€gen");
  t.is(nameToUnicode("ALICE bob &/#,+()$~%.':*?!<>{}[]"), "alicebob");
  t.is(nameToUnicode("&/#, +()$~%.':*?!<>{}[]A_L IC E-bob"), "a_lice-bob");
  t.is(nameToUnicode("&/#,+()$~%.':*?!<>{}[]π"), "π");
  t.is(nameToUnicode("xn--vi8h"), "π");
  t.is(nameToUnicode("xn--nn8hi4bz4d"), "π§πΌβπ");
  t.is(nameToUnicode("xn--qn8hh5i"), "π«³πΏ");
  t.is(nameToUnicode("xn--nn8hea944cfa"), "π«±πΌβπ«²πΎ");
  t.is(nameToUnicode("π«πΎ"), "π«πΎ");
  t.is(nameToUnicode("πππ« "), "πππ« ");
  t.is(nameToUnicode("I love π"), "iloveπ");
  t.is(nameToUnicode("With Γmlaut ΓΆ"), "withΓΌmlautΓΆ");
  t.is(nameToUnicode("π¨πΎβ€π¨π½"), "π¨πΎββ€βπ¨π½");
  t.is(nameToUnicode("xn--xn--vi8h-wh25g"), "xn--vi8hπ");
  t.is(nameToUnicode("xn--vi8hζζζ"), "xn--vi8hζζζ");
  t.is(nameToUnicode("&/#,+()$~%.':*?!<>{}[]xn--vi8hπ"), "xn--vi8hπ");
  t.is(nameToUnicode("xn----7sbbqcdlv9ch"), "Π°ΡΠΊΠ΅Ρ-Π·Π°Π΄Π΅");
  t.is(nameToUnicode("xn--4ug3ew87z"), "βΉηβ");
  t.is(nameToUnicode("xn--071a"), "θ");
  t.is(nameToUnicode("xn--qei1760n"), "β€βπ«");
  t.is(nameToUnicode("xn----bi3sea"), "π-π");
  t.is(nameToUnicode("xn--qei0070n"), "β€βπ«§");
});

test("Don't convert unsupported punycode", (t) => {
  invalidPunycodeExamples.forEach((e) => t.is(nameToUnicode(e), e));
  invalidPunycodeExamples.forEach((e) => t.is(nameToAscii(e), e));
});
