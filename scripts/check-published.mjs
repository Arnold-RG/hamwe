import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const personalPhone = /(\+?48)?[\s().\/-]*575[\s().\/-]*217[\s().\/-]*930/;
const personalTel = /tel:\+?48/i;
// Any +48 number (country code plus at least two digits) is disallowed.
const plus48Phone = /\+48[\s().\/-]*\d{2,}/;
// The public Hamwe office number is the only telephone that may appear,
// including as a tel: URI.
const officeDigits = ["250", "794", "607", "518"].join("");
const officeTelSource =
  "(?:tel:\\s*)?\\+?" + ["250", "794", "607", "518"].join("[\\s().\\/-]*");
// In JS/HTML/text, tel: counts only when a real phone pattern follows
// (so React's tel:!0 and template tel:${...} are ignored).
const telThenPhone = /(?<![A-Za-z])tel:\s*(?:\+|\(\s*\+?|\d)/i;

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0", plus: "+", colon: ":",
  sol: "/", lpar: "(", rpar: ")", period: ".", hyphen: "-", dash: "-", ndash: "\u2013", mdash: "\u2014",
  minus: "\u2212", comma: ",", num: "#", semi: ";", equals: "=", lowbar: "_", shy: "\u00ad",
  zwsp: "\u200b", zwj: "\u200d", zwnj: "\u200c", nobreak: "\u2060", thinsp: "\u2009", ensp: "\u2002",
  emsp: "\u2003", numsp: "\u2007", puncsp: "\u2008", hairsp: "\u200a", bsol: "\\",
};

const codePoint = (hex) => {
  const n = parseInt(hex, 16);
  return n <= 0x10ffff ? String.fromCodePoint(n) : "";
};

// Decode HTML entities (numeric and named), JS/JSON escapes (\uXXXX, \u{...},
// \xNN), and percent-encodes, repeatedly so layered encodings are caught too.
function decode(text) {
  let prev;
  let out = text;
  do {
    prev = out;
    out = out
      .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => codePoint(hex))
      .replace(/&#(\d+);?/g, (_, dec) => (Number(dec) <= 0x10ffff ? String.fromCodePoint(Number(dec)) : ""))
      .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
      .replace(/\\u\{([0-9a-f]+)\}/gi, (_, hex) => codePoint(hex))
      .replace(/\\u([0-9a-f]{4})/gi, (_, hex) => codePoint(hex))
      .replace(/\\x([0-9a-f]{2})/gi, (_, hex) => codePoint(hex))
      .replace(/%([0-9a-f]{2})/gi, (_, hex) => {
        try {
          return decodeURIComponent(`%${hex}`);
        } catch {
          return `%${hex}`;
        }
      });
  } while (out !== prev);
  return out;
}

// Drop soft hyphens and zero-width characters; map Unicode dashes and spaces to
// plain ones.
function normalize(text) {
  return text
    .replace(/[\u00ad\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/[\u2010-\u2015\u2212\u2043\ufe58\ufe63\uff0d]/g, "-")
    .replace(/[\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]/g, " ");
}

const stripTags = (text) => text.replace(/<[^>]*>/g, "");

// The decoding pipeline shared by the phone, name, and path checks: the raw
// text, the decoded and normalized text, and tag-stripped copies of both.
function textVariants(text) {
  const decoded = normalize(decode(text));
  return [text, decoded, stripTags(text), stripTags(decoded), normalize(decode(stripTags(text)))];
}

// Match every variant (catches 575<b>217</b>930).
function stripOffice(text) {
  return text.replace(new RegExp(officeTelSource, "gi"), " ");
}

function officeIn(fragment) {
  return fragment.replace(/\D/g, "") === officeDigits;
}

function hasDisallowedTelUri(text) {
  const re = /\/URI\s*\(((?:\\.|[^\\)])*)\)/g;
  let m;
  while ((m = re.exec(text))) {
    const uri = m[1].replace(/\\([()\\])/g, "$1").trim();
    if (/^tel:/i.test(uri) && !officeIn(uri)) return true;
  }
  return false;
}

function hasPhone(text, { pdf = false } = {}) {
  return textVariants(text).some((t) => {
    const rest = stripOffice(t);
    if (personalPhone.test(rest) || personalTel.test(rest) || plus48Phone.test(rest)) {
      return true;
    }
    if (pdf) return hasDisallowedTelUri(t);
    return telThenPhone.test(rest);
  });
}

// Published-output email scan: the only allowed personal address is
// the public resume address. Consumer-mail domains otherwise fail.
// Organisation addresses and obvious placeholders / library strings
// are left alone.
const allowedPersonalEmail = ["rurangwaarnold", "32", "@gmail.com"].join("");
const personalMailDomains = new RegExp(
  "@(?:" +
    [
      "gmail", "googlemail", "yahoo", "ymail", "hotmail", "outlook",
      "live", "msn", "icloud", "me", "mac", "protonmail", "proton",
      "aol", "gmx", "zoho", "yandex", "mail",
    ].join("|") +
    ")\\.(?:com|me|ru|de|co\\.\\w{2})\\b",
  "i",
);
const placeholderEmail = new RegExp(
  "^(?:you|user|name|foo|bar|test|someone|placeholder)@|@(?:example\\.(?:com|org|net)|email\\.com|test\\.com|localhost|invalid)\\b",
  "i",
);
const emailFinder = /(?:mailto:)?([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/g;

function foundEmails(text) {
  const out = [];
  for (const variant of textVariants(text)) {
    const re = new RegExp(emailFinder.source, "gi");
    let m;
    while ((m = re.exec(variant))) out.push({ raw: m[0], email: m[1].toLowerCase() });
  }
  return out;
}

function isLibraryOrPlaceholder(email, raw) {
  if (placeholderEmail.test(email)) return true;
  if (/@[A-Za-z0-9.\-]+\/[A-Za-z]/.test(raw)) return true;
  if (/@\d/.test(email) && !email.includes(".")) return true;
  return false;
}

function isPersonalMail(email) {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  return personalMailDomains.test("@" + email.slice(at + 1));
}

function hasDisallowedEmail(text) {
  for (const { raw, email } of foundEmails(text)) {
    if (email === allowedPersonalEmail.toLowerCase()) continue;
    if (isLibraryOrPlaceholder(email, raw)) continue;
    if (isPersonalMail(email)) return true;
    if (/^mailto:/i.test(raw) && email !== allowedPersonalEmail.toLowerCase()) {
      // mailto: to a personal-looking address already returned above;
      // mailto: to an org address is allowed.
      continue;
    }
  }
  return false;
}

function allowedOrgEmails(text) {
  const orgs = new Set();
  for (const { email } of foundEmails(text)) {
    if (email === allowedPersonalEmail.toLowerCase()) continue;
    if (isLibraryOrPlaceholder(email, email)) continue;
    if (!isPersonalMail(email)) orgs.add(email);
  }
  return [...orgs].sort();
}


// Default-deny: every file is scanned as text unless it is a known binary.
// PDFs are read through pdftotext and decompressed with qpdf --qdf.
const BINARY = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".ico", ".bmp", ".tif", ".tiff",
  ".woff", ".woff2", ".ttf", ".otf", ".eot",
  ".mp3", ".mp4", ".webm", ".ogg", ".wav", ".mov",
  ".zip", ".gz", ".br", ".7z",
]);

// PDFs: visible text via pdftotext, plus decompressed objects via
// qpdf --qdf (annotations, /URI values, and stream text). Missing
// tools fail closed (ENOENT).
function pdfScanText(path) {
  const visible = execFileSync("pdftotext", [path, "-"], { encoding: "utf8" });
  const qdf = execFileSync(
    "qpdf",
    ["--qdf", "--object-streams=disable", path, "-"],
    { encoding: "latin1", maxBuffer: 64 * 1024 * 1024 },
  );
  const uris = [];
  const uriRe = /\/URI\s*\(((?:\\.|[^\\)])*)\)/g;
  let m;
  while ((m = uriRe.exec(qdf))) uris.push(m[1].replace(/\\([()\\])/g, "$1"));
  const streams = [];
  const streamRe = /stream\r?\n([\s\S]*?)\nendstream/g;
  while ((m = streamRe.exec(qdf))) streams.push(m[1]);
  return [visible, qdf, ...uris, ...streams].join("\n");
}

function fileText(path) {
  if (extname(path).toLowerCase() !== ".pdf") return readFileSync(path, "utf8");
  return pdfScanText(path);
}

export function phoneProblems(root, dirs = ["site", "dist"]) {
  const found = [];

  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        walk(path);
        continue;
      }
      const ext = extname(path).toLowerCase();
      if (BINARY.has(ext)) continue;
      const text = fileText(path);
      const rel = relative(root, path).split(sep).join("/");
      if (hasPhone(text, { pdf: ext === ".pdf" })) {
        found.push(`${rel}: contains the personal phone number`);
      }
      if (hasDisallowedEmail(text)) {
        found.push(`${rel}: contains a disallowed email address`);
      }
    }
  };

  for (const dir of dirs) {
    const full = join(root, dir);
    if (existsSync(full)) walk(full);
  }
  return found;
}

// Private-name scan: no served file, path, or repo text/doc file may carry the
// private brand names. Patterns are built from pieces so this file does not
// contain the literals.
const privateName = new RegExp(["Ar", "nova"].join(""), "i");
const privateAlias = new RegExp(["at", "eck"].join(""), "i");
// Banned public alias, matched case-insensitively with flexible whitespace.
const publicAlias = new RegExp(
  [
    ["King", "Whisper"].join(""),
    ["King", "Whisper"].join("-"),
    ["King", "Whisper"].join("\\s+"),
  ].join("|"),
  "i",
);
const NAME_SKIP = new Set(["node_modules", "dist", "dist-ssr", ".git", "test-results", "playwright-report", "blob-report"]);

// Company identifiers on a personal portfolio, built from pieces so this
// file does not contain the literals. A leading word boundary on the short
// name avoids matching place names that only contain it as a suffix.
const companyShort = new RegExp("\\b" + ["vi", "ra"].join(""), "i");
const companyAlt = new RegExp(["an", "vi", "ra"].join(""), "i");

const hasPrivateName = (text) =>
  textVariants(text).some(
    (t) =>
      privateName.test(t) ||
      privateAlias.test(t) ||
      publicAlias.test(t) ||
      companyShort.test(t) ||
      companyAlt.test(t),
  );

export function privateNameProblems(repoRoot) {
  // Normalize (no trailing slash) so the top-level skip matches the root itself.
  const root = resolve(repoRoot);
  const found = [];

  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      // Skip these only at the repo top level; deeper folders of the same names are scanned.
      if (dir === root && NAME_SKIP.has(name)) continue;
      const path = join(dir, name);
      const rel = relative(root, path).split(sep).join("/");
      if (hasPrivateName(rel)) found.push(`${rel}: path contains a private name`);
      if (statSync(path).isDirectory()) {
        walk(path);
        continue;
      }
      const ext = extname(path).toLowerCase();
      if (BINARY.has(ext)) continue;
      if (hasPrivateName(fileText(path))) found.push(`${rel}: contains a private name`);
    }
  };

  walk(root);
  const dist = join(root, "dist");
  if (existsSync(dist)) {
    const walkDist = (dir) => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        const rel = relative(root, path).split(sep).join("/");
        if (hasPrivateName(rel)) found.push(`${rel}: path contains a private name`);
        if (statSync(path).isDirectory()) {
          walkDist(path);
          continue;
        }
        const ext = extname(path).toLowerCase();
        if (!BINARY.has(ext) && hasPrivateName(fileText(path))) {
          found.push(`${rel}: contains a private name`);
        }
      }
    };
    walkDist(dist);
  }
  return found;
}

// Local-path scan: no served file in site/ or dist/, and no repo Markdown doc,
// may carry a local file path.
// Personal dirs (/home, /Users, /workspace, /root, /mnt) and file:// URLs are
// caught anywhere, hrefs included. A Windows drive needs a Users folder and
// must not follow a word char or "?" (minified a?b:/x/). [\\/]+ accepts
// escaped C:\\Users forms. System dirs (/opt, /tmp, /usr, /var) are flagged
// only outside href/src values. Paths are matched against textVariants so
// entity- and percent-encoded forms are caught too.
const localPath = new RegExp(
  [
    String.raw`file:\/\/`,
    String.raw`(?<![\w?])[A-Za-z]:[\\/]+Users[\\/]+`,
    String.raw`(?:^|[^\w.\-])\/(?:home|Users|workspace|root|mnt)\/`,
    String.raw`(?:^|\s|(?<!\b(?:href|src)\s*=\s*)["'\`(])\/(?:opt|tmp|usr|var)\/`,
  ].join("|"),
  "m",
);

export function localPathProblems(repoRoot) {
  const root = resolve(repoRoot);
  const found = [];
  const check = (path) => {
    const rel = relative(root, path).split(sep).join("/");
    const raw = readFileSync(path, "utf8");
    if (textVariants(raw).some((t) => localPath.test(t))) {
      found.push(`${rel}: contains a local file path`);
    }
  };

  // Served trees: every non-binary, non-PDF file, nothing skipped.
  const walkServed = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        walkServed(path);
        continue;
      }
      const ext = extname(path).toLowerCase();
      if (!BINARY.has(ext) && ext !== ".pdf") check(path);
    }
  };
  for (const dir of ["site", "dist"]) {
    const full = join(root, dir);
    if (existsSync(full)) walkServed(full);
  }

  // Repo docs: Markdown outside site/ and dist/, skipping non-served folders at
  // the top level only.
  const walkDocs = (dir) => {
    for (const name of readdirSync(dir)) {
      if (dir === root && (NAME_SKIP.has(name) || name === "site")) continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        walkDocs(path);
        continue;
      }
      if (extname(path).toLowerCase() === ".md") check(path);
    }
  };
  walkDocs(root);
  return found;
}

function run() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const found = [...phoneProblems(root), ...privateNameProblems(root), ...localPathProblems(root)];
  if (found.length) {
    console.error(found.join("\n"));
    process.exit(1);
  }
  console.log("published check passed (site, dist; phone; names; paths)");
}

export { hasPhone, hasPrivateName, hasDisallowedEmail, fileText, pdfScanText, textVariants, personalPhone, plus48Phone, telThenPhone, publicAlias, allowedOrgEmails, allowedPersonalEmail };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
