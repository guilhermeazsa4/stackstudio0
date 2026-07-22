const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");

const files = [
  "guilherme2.png",
  "vinicius.png",
  "logo/stackBranco.png",
  "logo/stBranco.png",
  "stackmobilehero.png",
  "npm.png",
  "lumimobile2.png",
  "editorahaust.png",
  "elemental.png",
  "rushh.png",
  "robloxstack.png",
  "hero/hero2.png",
  "team2.png",
  "heromobile.png",
];

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const outputPath = inputPath.replace(/\.png$/, ".webp");

    const before = fs.statSync(inputPath).size;
    await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
    const after = fs.statSync(outputPath).size;

    totalBefore += before;
    totalAfter += after;

    console.log(
      `${file} -> ${path.basename(outputPath)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB (${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`,
  );
}

run();
