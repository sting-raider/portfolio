import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const [directory, portString] = process.argv.slice(2);
const root = resolve(directory || ".artifacts/motion-previews/battle");
const port = Number(portString || 3001);
if (!Number.isInteger(port) || port < 3001 || port > 3004) throw new Error("Choose a motion preview port: 3001 through 3004.");
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".woff": "font/woff", ".woff2": "font/woff2", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ico": "image/x-icon" };

const serve = (request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname); }
  catch { response.writeHead(400).end(); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, "index.html");
  if (!existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/html" });
    createReadStream(resolve(root, "404.html")).pipe(response);
    return;
  }
  const size = statSync(file).size;
  const type = mime[extname(file)] || "application/octet-stream";
  // Audio seeking / repeat must work in the static preview, too.
  const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range || "");
  if (range) {
    const start = Number(range[1]);
    const end = Math.min(Number(range[2] || size - 1), size - 1);
    if (start > end) { response.writeHead(416, { "Content-Range": `bytes */${size}` }).end(); return; }
    response.writeHead(206, { "Content-Type": type, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes" });
    createReadStream(file, { start, end }).pipe(response);
  } else {
    response.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).pipe(response);
  }
};
for (const address of ["127.0.0.1", "::1"]) {
  createServer(serve).listen(port, address, () => console.log(`Optimized motion preview: http://localhost:${port} (${address})`));
}
