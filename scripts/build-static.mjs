import { cp, mkdir, rm } from "node:fs/promises";

const outputDir = "dist";
const staticFiles = ["index.html", "styles.css", "app.js"];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const file of staticFiles) {
  await cp(file, `${outputDir}/${file}`);
}

console.log(`Built static site in ${outputDir}/`);
