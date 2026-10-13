// Nén ảnh: resize tối đa MAX_WIDTH, xoay đúng theo EXIF, xuất WebP.
// node scripts/optimize-images.mjs <srcDir> <outDir>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";


const [src, out] = process.argv.slice(2);
const MAX_WIDTH = 1920;
const QUALITY = 80;
fs.mkdirSync(out, { recursive: true });

let before = 0, after = 0;
for (const f of fs.readdirSync(src)) {
  const ext = path.extname(f).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const input = path.join(src, f);
  const output = path.join(out, path.basename(f, path.extname(f)) + ".webp");
  const meta = await sharp(input).metadata();
  await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90 })
    .toFile(output);
  const a = fs.statSync(input).size, b = fs.statSync(output).size;
  before += a; after += b;
  console.log(`${f.padEnd(28)} ${meta.width}x${meta.height}  ${(a / 1024).toFixed(0).padStart(5)}KB -> ${(b / 1024).toFixed(0).padStart(4)}KB`);
}
console.log(`TOTAL ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
