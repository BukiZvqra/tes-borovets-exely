import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const previewPort = Number.parseInt(process.env.TES_PREVIEW_PORT || "4173", 10);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"]
]);

function resolveRequestFile(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  } catch {
    return null;
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const candidates = [];

  if (!relativePath || pathname.endsWith("/")) {
    candidates.push(path.join(outputRoot, relativePath, "index.html"));
  } else {
    candidates.push(path.join(outputRoot, relativePath));
    candidates.push(path.join(outputRoot, relativePath, "index.html"));
  }

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (resolved !== outputRoot && !resolved.startsWith(`${outputRoot}${path.sep}`)) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
  }

  const notFound = path.join(outputRoot, "404.html");
  return fs.existsSync(notFound) ? notFound : null;
}

if (!Number.isInteger(previewPort) || previewPort < 1 || previewPort > 65535) {
  throw new Error("TES_PREVIEW_PORT must be a valid TCP port number");
}

if (!fs.existsSync(outputRoot)) {
  throw new Error("dist/ is missing; run npm run build first");
}

const server = http.createServer((request, response) => {
  const file = resolveRequestFile(request.url || "/");
  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const isNotFound = path.basename(file) === "404.html" && !(request.url || "").includes("404.html");
  response.writeHead(isNotFound ? 404 : 200, {
    "Cache-Control": "no-store",
    "Content-Type": contentTypes.get(path.extname(file).toLowerCase()) || "application/octet-stream"
  });
  fs.createReadStream(file).pipe(response);
});

server.listen(previewPort, "127.0.0.1", () => {
  console.log(`TES Borovets preview: http://127.0.0.1:${previewPort}`);
  console.log("Press Ctrl+C to stop the preview server.");
});
