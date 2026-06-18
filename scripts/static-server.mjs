import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootArg = process.argv[2] ?? ".";
const port = Number(process.argv[3] ?? 5173);
const root = path.resolve(rootArg);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
]);

function send(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

async function resolveRequestPath(requestUrl) {
  const { pathname } = new URL(requestUrl, "http://localhost");
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.slice(1);
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    return null;
  }

  const fileStat = await stat(filePath);
  return fileStat.isDirectory() ? path.join(filePath, "index.html") : filePath;
}

const server = createServer(async (req, res) => {
  try {
    const filePath = await resolveRequestPath(req.url ?? "/");

    if (!filePath) {
      send(res, 403, "Forbidden");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": contentTypes.get(ext) ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    if (error?.code === "ENOENT") {
      send(res, 404, "Not found");
      return;
    }

    send(res, 500, "Internal server error");
  }
});

server.listen(port, () => {
  const scriptName = path.basename(fileURLToPath(import.meta.url));
  console.log(`${scriptName} serving ${root}`);
  console.log(`Local: http://localhost:${port}/`);
});
