import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "site");
const output = path.join(root, "dist");

const requiredFiles = [
  "index.html",
  "en/index.html",
  "assets/style.css",
  "_redirects",
  "robots.txt",
  "sitemap.xml"
];

function fail(message) {
  console.error(`Build failed: ${message}`);
  process.exit(1);
}

function listFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) fail(`symbolic links are not allowed: ${absolute}`);
    if (entry.isDirectory()) files.push(...listFiles(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files.sort();
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

if (!fs.existsSync(source)) fail("site/ directory is missing");

for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(source, relative))) fail(`required file is missing: site/${relative}`);
}

const sourceFiles = listFiles(source);
const htmlFiles = sourceFiles.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 76) fail(`expected at least 76 HTML files, found ${htmlFiles.length}`);

for (const file of sourceFiles) {
  const stats = fs.statSync(file);
  if (stats.size > 2 * 1024 * 1024) fail(`unexpected file larger than 2 MB: ${path.relative(root, file)}`);
}

fs.rmSync(output, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
fs.cpSync(source, output, { recursive: true, errorOnExist: true });

const outputFiles = listFiles(output);
if (sourceFiles.length !== outputFiles.length) {
  fail(`copy mismatch: source has ${sourceFiles.length} files, output has ${outputFiles.length}`);
}

for (const sourceFile of sourceFiles) {
  const relative = path.relative(source, sourceFile);
  const outputFile = path.join(output, relative);
  if (!fs.existsSync(outputFile) || sha256(sourceFile) !== sha256(outputFile)) {
    fail(`copy verification failed: ${relative}`);
  }
}

console.log(`Build passed: ${sourceFiles.length} files, ${htmlFiles.length} HTML pages, byte-verified output.`);
