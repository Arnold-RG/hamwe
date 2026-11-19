import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  fileText,
  hasPhone,
  hasPrivateName,
  hasDisallowedEmail,
  allowedOrgEmails,
  phoneProblems,
  privateNameProblems,
} from "./check-published.mjs";

const K = "King";
const W = "Whisper";
const tel = ["te", "l:"].join("");
const plus48 = ["+", "48"].join("");
const d1 = ["57", "5"].join("");
const d2 = ["21", "7"].join("");
const d3 = ["93", "0"].join("");
const personal = `${plus48} ${d1}-${d2}-${d3}`;
const telUri = `${tel}(${plus48}) ${d1}-${d2}-${d3}`;
const company = ["vi", "ra"].join("");
const org = ["Ar", "nova"].join("");
const alt = ["an", "vi", "ra"].join("");
const night = ["At", "eck"].join("");

const temps = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop(), { recursive: true, force: true });
});

function tmpTree(files) {
  const root = mkdtempSync(join(tmpdir(), "pubchk-"));
  temps.push(root);
  for (const [rel, content] of Object.entries(files)) {
    const path = join(root, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  return root;
}

function escapePdf(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function makePdf({ text = "Hello", uri = null } = {}) {
  const stream = `BT /F1 12 Tf 72 720 Td (${escapePdf(text)}) Tj ET`;
  const annotObj = uri
    ? `<< /Type /Annot /Subtype /Link /Rect [72 710 300 740] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${escapePdf(uri)}) >> >>`
    : null;
  const page = annotObj
    ? `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> /Annots [6 0 R] >>`
    : `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>`;
  const objects = [
    null,
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    page,
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  if (annotObj) objects.push(annotObj);
  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (let n = 1; n < objects.length; n++) {
    offsets[n] = Buffer.byteLength(body);
    body += `${n} 0 obj\n${objects[n]}\nendobj\n`;
  }
  const xrefPos = Buffer.byteLength(body);
  let xref = `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let n = 1; n < objects.length; n++) {
    xref += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  }
  body += xref;
  body += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return body;
}

function compressPdf(input) {
  const dir = mkdtempSync(join(tmpdir(), "pdfc-"));
  temps.push(dir);
  const src = join(dir, "in.pdf");
  const dst = join(dir, "out.pdf");
  writeFileSync(src, input);
  const r = spawnSync("qpdf", ["--object-streams=generate", "--compress-streams=y", src, dst], {
    encoding: "utf8",
  });
  if (r.status !== 0) throw new Error(r.stderr || "qpdf compress failed");
  return dst;
}

function pdfPhoneHits(pdfPath) {
  const root = tmpTree({});
  const dest = join(root, "site", "resume.pdf");
  mkdirSync(join(root, "site"), { recursive: true });
  copyFileSync(pdfPath, dest);
  return phoneProblems(root, ["site"]);
}
function pdfNameHits(pdfPath) {
  const root = tmpTree({});
  const dest = join(root, "resume.pdf");
  copyFileSync(pdfPath, dest);
  return privateNameProblems(root);
}

test("hasPhone: personal number and tel: URIs fail; office number and hotel: do not", () => {
  assert.equal(hasPhone(personal), true);
  assert.equal(hasPhone(telUri), true);
  assert.equal(hasPhone(`${tel}${plus48}555111222`), true);
  assert.equal(hasPhone(plus48 + " 111-22-33"), true);
  assert.equal(hasPhone("hotel: lobby"), false);
  assert.equal(hasPhone("telephone directory"), false);
  assert.equal(hasPhone("+250794607518"), false);
  assert.equal(hasPhone("Krakow, Poland"), false);
});

test("public alias: closed, hyphenated, and spaced forms fail; parts alone do not", () => {
  assert.equal(hasPrivateName(K + W), true);
  assert.equal(hasPrivateName(K + "-" + W), true);
  assert.equal(hasPrivateName(K + " " + W), true);
  assert.equal(hasPrivateName(K + "  " + W), true);
  assert.equal(hasPrivateName(K), false);
  assert.equal(hasPrivateName(W), false);
});

test("company and private names fail; Uvira and museovirasto do not", () => {
  assert.equal(hasPrivateName(company), true);
  assert.equal(hasPrivateName(org), true);
  assert.equal(hasPrivateName(alt), true);
  assert.equal(hasPrivateName(night), true);
  assert.equal(hasPrivateName("Uvira"), false);
  assert.equal(hasPrivateName("museovirasto"), false);
});

test("positive: HTML with the personal number is flagged", () => {
  const root = tmpTree({ "site/index.html": `<p>${personal}</p>` });
  const hits = phoneProblems(root, ["site"]);
  assert.ok(hits.some((l) => l.includes("personal phone")), hits);
});

test("positive: HTML with closed, hyphenated, and spaced public-alias forms is flagged", () => {
  for (const form of [K + W, K + "-" + W, K + " " + W]) {
    const root = tmpTree({ "site/alias.html": `<p>${form}</p>` });
    const hits = privateNameProblems(root);
    assert.ok(hits.some((l) => l.includes("private name")), { form, hits });
  }
});

test("positive: compressed PDF tel: annotation is flagged even when raw bytes hide it", () => {
  const dirty = makePdf({ text: "Email only", uri: telUri });
  const compressed = compressPdf(dirty);
  const raw = readFileSync(compressed);
  assert.equal(raw.toString("latin1").toLowerCase().includes(tel), false, "raw should hide the annotation");
  const visible = spawnSync("pdftotext", [compressed, "-"], { encoding: "utf8" });
  assert.equal(visible.status, 0);
  assert.equal(hasPhone(visible.stdout), false, "pdftotext should not show a number");
  const hits = pdfPhoneHits(compressed);
  assert.ok(hits.some((l) => l.includes("personal phone") || l.includes("phone")), hits);
});

test("positive: visible phone or company name inside a PDF is flagged", () => {
  const phonePdf = makePdf({ text: personal });
  const namePdf = makePdf({ text: "Role at " + company });
  const aliasPdf = makePdf({ text: K + W });
  assert.ok(pdfPhoneHits(writeTempPdf(phonePdf)).some((l) => l.includes("phone")));
  assert.ok(pdfNameHits(writeTempPdf(namePdf)).some((l) => l.includes("private name")));
  assert.ok(pdfNameHits(writeTempPdf(aliasPdf)).some((l) => l.includes("private name")));
});

function writeTempPdf(bytes) {
  const dir = mkdtempSync(join(tmpdir(), "p-"));
  temps.push(dir);
  const p = join(dir, "t.pdf");
  writeFileSync(p, bytes);
  return p;
}

test("negative: clean PDF with mailto only is accepted", () => {
  const clean = makePdf({ text: "Email only", uri: "mailto:rurangwaarnold32@gmail.com" });
  const path = writeTempPdf(clean);
  assert.deepEqual(pdfPhoneHits(path), []);
  assert.equal(pdfNameHits(path).some((l) => l.includes("resume") || l.includes("t.pdf")), false);
});

test("negative: HTML with Uvira, museovirasto, and the office number is accepted", () => {
  const root = tmpTree({
    "site/index.html": "<p>Uvira and museovirasto. Office +250794607518. hotel: lobby.</p>",
    "site/ok.pdf": makePdf({ text: "Uvira museovirasto +250794607518", uri: "https://github.com/Arnold-RG" }),
  });
  const phones = phoneProblems(root, ["site"]);
  const names = privateNameProblems(root);
  assert.deepEqual(phones, []);
  assert.equal(names.some((l) => l.includes("Uvira") || l.includes("museovirasto") || l.includes("site/")), false, names);
});

test("missing qpdf fails closed", () => {
  const path = writeTempPdf(makePdf({ text: "Hi" }));
  const prev = process.env.PATH;
  process.env.PATH = "/usr/bin:/bin";
  try {
    let threw = false;
    try {
      fileText(path);
    } catch (err) {
      threw = true;
      assert.equal(err.code, "ENOENT");
    }
    assert.equal(threw, true);
  } finally {
    process.env.PATH = prev;
  }
});

test("missing pdftotext fails closed", () => {
  const path = writeTempPdf(makePdf({ text: "Hi" }));
  const prev = process.env.PATH;
  // Put only qpdf on PATH, not pdftotext. A temporary directory with a
  // symlink keeps this portable (no machine-local path in the tree) and
  // works when qpdf and pdftotext share a directory.
  const which = spawnSync("which", ["qpdf"], { encoding: "utf8" });
  const qpdf = (which.stdout || "").trim();
  assert.ok(qpdf, "qpdf must be on PATH so this test can hide pdftotext");
  const dir = mkdtempSync(join(tmpdir(), "qpdf-only-"));
  temps.push(dir);
  symlinkSync(qpdf, join(dir, "qpdf"));
  process.env.PATH = dir;
  try {
    let threw = false;
    try {
      fileText(path);
    } catch (err) {
      threw = true;
      assert.equal(err.code, "ENOENT");
    }
    assert.equal(threw, true);
  } finally {
    process.env.PATH = prev;
  }
});

test("hasPhone: React tel:!0 and the office tel: URI are allowed; any +48 still fails", () => {
  assert.equal(hasPhone("search:!0,tel:!0,text:!0"), false);
  assert.equal(hasPhone("href:`tel:${Hn.tel}`"), false);
  const officeTel = ["te", "l:+"].join("") + ["250", "794", "607", "518"].join("");
  assert.equal(hasPhone(officeTel), false);
  assert.equal(hasPhone(officeTel, { pdf: true }), false);
  assert.equal(hasPhone(`${tel}${plus48}555111222`), true);
  assert.equal(hasPhone(plus48 + " 111-22-33"), true);
});

test("email: only the official personal address is allowed; other Gmail and mailto fail", () => {
  const official = ["rurangwaarnold", "32", "@gmail.com"].join("");
  const other = ["abcdefg.person", "32", "@gmail.com"].join("");
  assert.equal(hasDisallowedEmail("mailto:" + official), false);
  assert.equal(hasDisallowedEmail(official), false);
  assert.equal(hasDisallowedEmail("mailto:" + other), true);
  assert.equal(hasDisallowedEmail(other), true);
  assert.equal(hasDisallowedEmail("circle@hamwe.rw"), false);
  assert.equal(hasDisallowedEmail("you@email.com"), false);
  assert.equal(hasDisallowedEmail("user@example.com"), false);
  assert.deepEqual(allowedOrgEmails("write circle@hamwe.rw please"), ["circle@hamwe.rw"]);
});

test("positive: PDF mailto: to another Gmail is flagged", () => {
  const other = ["abcdefg.person", "32", "@gmail.com"].join("");
  const dirty = makePdf({ text: "Email", uri: "mailto:" + other });
  const path = writeTempPdf(dirty);
  const hits = pdfPhoneHits(path);
  // email hits go through the same walk as phone on IO (phoneProblems) / privacyProblems on AP
  const emailHits = hits.filter((l) => l.includes("email") || l.includes("phone") || l.includes("mailto"));
  // On IO, phoneProblems now also reports email. On AP, privacyProblems does.
  // Either way the walk used by pdfPhoneHits should include email now.
  assert.ok(
    hits.some((l) => l.includes("email") || l.includes("disallowed")),
    hits,
  );
});

test("negative: official mailto in a PDF is accepted", () => {
  const official = ["rurangwaarnold", "32", "@gmail.com"].join("");
  const clean = makePdf({ text: "Email only", uri: "mailto:" + official });
  const path = writeTempPdf(clean);
  assert.deepEqual(
    pdfPhoneHits(path).filter((l) => l.includes("email") || l.includes("disallowed") || l.includes("phone")),
    [],
  );
});
