/* Generate the PWA icon set from public/favicon.svg.  Usage: npm run icons */
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";

const svg = readFileSync("public/favicon.svg");
mkdirSync("public/icons", { recursive: true });

/* maskable icons need ~10% safe padding on every side, so the glyph is drawn smaller */
const maskable = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
     <rect width="64" height="64" fill="#17130F"/>
     <g transform="translate(32 32) scale(0.62) translate(-32 -32)">
       <path d="M14 20h36" stroke="#E0A94F" stroke-width="5" stroke-linecap="round"/>
       <path d="M24 20v26" stroke="#E0A94F" stroke-width="5" stroke-linecap="round"/>
       <path d="M40 20v26" stroke="#E0A94F" stroke-width="5" stroke-linecap="round"/>
     </g>
   </svg>`
);

const jobs = [
  [svg, 192, "public/icons/icon-192.png"],
  [svg, 512, "public/icons/icon-512.png"],
  [maskable, 512, "public/icons/icon-512-maskable.png"],
  [svg, 180, "public/apple-touch-icon.png"],
];

for (const [src, size, out] of jobs) {
  await sharp(src, { density: 384 }).resize(size, size).png().toFile(out);
  console.log(`${out.padEnd(38)} ${size}x${size}`);
}
