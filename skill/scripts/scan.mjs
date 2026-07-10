#!/usr/bin/env node
/*
  kill-ai-slop scanner — dependency-free.

  Walks a project's frontend source and greps for the code-level signals of each
  AI-slop tell (see references/detection.md). Prints a grouped report of
  file:line hits. It NEVER edits files. Every hit is a lead to confirm by
  reading the code, not a verdict.

  Usage:
    node scan.mjs [root] [--json] [--no-color]
*/

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith("-")) || ".";
const asJson = args.includes("--json");
const useColor =
  !args.includes("--no-color") && process.stdout.isTTY && !asJson;

const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "out", ".next", ".astro",
  ".output", ".svelte-kit", ".nuxt", "coverage", "vendor", ".cache",
  ".vercel", ".turbo",
]);
const EXTS = new Set([
  ".html", ".css", ".scss", ".sass", ".less",
  ".tsx", ".jsx", ".ts", ".js", ".mjs", ".cjs",
  ".vue", ".svelte", ".astro", ".md", ".mdx",
]);

// A tell: id, human name, one-line fix, and the line patterns that flag it.
// `code` tells only look at code/style files; `copy` tells also read prose.
const TELLS = [
  { id: "01", group: "color", name: "indigo→violet gradient", fix: "one solid, chosen accent",
    patterns: [
      /from-(indigo|violet|purple|fuchsia)-\d+[\s\S]{0,60}?to-(purple|violet|fuchsia|pink)-\d+/i,
      /(linear-gradient|bg-gradient)[^;"'`]*(#6366f1|#8b5cf6|#a855f7|#7c3aed)/i,
      /shadow-(purple|violet|indigo)-\d+\/\d+/i,
    ] },
  { id: "02", group: "color", name: "gradient-clip headline", fix: "solid ink, scale up",
    patterns: [
      /bg-clip-text[\s\S]{0,40}?text-transparent|text-transparent[\s\S]{0,40}?bg-clip-text/,
      /(?:-webkit-)?background-clip:\s*text/i,
      /-webkit-text-fill-color:\s*transparent/i,
    ] },
  { id: "03", group: "color", name: "warm ‘cozy’ palette", fix: "neutral base + one warm accent",
    patterns: [
      /\b(amber|orange|stone)-(50|100|200|300)\b/i,
      /bg-\[#(?:fdf6ec|fef3e2|faf3e8|fff7ed|fdf4e3)\]/i,
      /(text|border)-amber-\d+/i,
    ] },
  { id: "04", group: "color", name: "default semantic palette", fix: "one palette: neutrals + a couple of chosen states",
    patterns: [
      /bg-(?:blue|indigo)-50|bg-amber-50|bg-(?:green|emerald)-50|bg-red-50/i,
      /(?:info|success|warning|error)[^\n]{0,30}(?:blue|green|amber|red)-(?:50|100|500|600|700)/i,
    ] },
  { id: "05", group: "color", name: "one-hue status box", fix: "state in words; one muted accent on neutral",
    patterns: [
      /border-(red|amber|yellow|green|blue)-\d+[\s\S]{0,60}?text-\1-\d+/i,
      /bg-(?:red|amber|yellow|green)-\d+\/(?:5|10|15|20)\b/i,
      /(?:error|warning|success)[^\n]{0,40}(?:red|amber|yellow|green)-\d+/i,
    ] },
  { id: "06", group: "color", name: "gradients as atmosphere", fix: "one flat bg; depth from a hairline",
    patterns: [
      /radial-gradient/i,
      /linear-gradient[^;)]*(?:to bottom|180deg|to top)/i,
      /bg-gradient-to-[bt]\b[\s\S]{0,40}?from-/i,
    ] },
  { id: "07", group: "type", name: "serif-italic emphasis", fix: "emphasise by weight, one voice",
    patterns: [
      /font-serif\b/i,
      /font-family:\s*(?:georgia|"?playfair|"?lora|"?cormorant)/i,
    ] },
  { id: "08", group: "type", name: "serif where sans belongs", fix: "one legible UI sans",
    patterns: [
      /font-family:\s*[^;]*(playfair|cormorant|lora|dm serif|libre baskerville)/i,
      /fontFamily[^;\n]*(Playfair|Cormorant|Lora)/,
    ] },
  { id: "09", group: "type", name: "decorative strikes & highlights", fix: "strike for edits, underline for links",
    patterns: [
      /\bline-through\b/i,
      /<(?:mark|s|u|del|strike)[\s>]/i,
      /text-decoration:\s*(?:line-through|underline)/i,
    ] },
  { id: "10", group: "copy", name: "highlighted keywords", fix: "let structure carry emphasis",
    copy: true,
    patterns: [
      /<mark[\s>]/i,
      /text-(primary|indigo|purple|violet)-\d+/,
    ] },
  { id: "11", group: "copy", name: "AI copywriting voice", fix: "say the specific thing",
    copy: true,
    patterns: [
      /not just .{1,40}\bit'?s\b/i,
      /\b(say goodbye to|meet your new|supercharge|unlock the power of|in seconds,? not)\b/i,
      /\b(blazing[- ]fast|effortless(?:ly)?|seamless(?:ly)?|game[- ]?changer|next[- ]level)\b/i,
    ] },
  { id: "12", group: "copy", name: "emoji everywhere", fix: "cut emoji from product copy",
    copy: true,
    patterns: [
      /\p{Extended_Pictographic}/u,
    ] },
  { id: "13", group: "component", name: "glowing status dot", fix: "flat dot + a word; no halo",
    patterns: [
      /\banimate-(?:ping|pulse)\b/i,
      /shadow-(?:green|emerald|lime)-\d+\/\d+/i,
      /(?:ready|online|live)[\s\S]{0,40}?(?:●|rounded-full)/i,
    ] },
  { id: "14", group: "component", name: "left-border callout", fix: "one aside, rest is body",
    patterns: [
      /border-l-4[\s\S]{0,40}?rounded|rounded[\s\S]{0,40}?border-l-4/i,
      /\b(admonition|callout|note-box)\b/i,
    ] },
  { id: "15", group: "component", name: "pastel icon tiles", fix: "labelled list with specifics",
    patterns: [
      /rounded-(lg|xl|2xl)\s+bg-(indigo|purple|blue|green|amber|pink)-(50|100)/i,
    ] },
  { id: "16", group: "component", name: "max-radius / glassmorphism", fix: "one small radius, solid surfaces",
    patterns: [
      /\brounded-full\b/,
      /backdrop-blur|backdrop-filter:\s*blur|bg-(?:white|black)\/(?:5|10|20|30)/i,
      /border-radius:\s*(?:9999px|50%|2rem|24px)/i,
    ] },
  { id: "17", group: "component", name: "oversized drop shadow", fix: "tight elevation, never bigger than the element",
    patterns: [
      /box-shadow:[^;{}]*\b(?:[6-9]\d|\d{3,})px/i,
      /shadow-\[[^\]]*\b(?:[6-9]\d|\d{3,})px/i,
      /filter:[^;{}]*drop-shadow\([^)]*\b(?:[6-9]\d|\d{3,})px/i,
    ] },
  { id: "18", group: "component", name: "corners that don't nest", fix: "inner = outer − padding",
    patterns: [
      /\brounded-(?:xl|2xl|3xl)\b/i,
      /border-radius:\s*(?:1rem|1\.5rem|24px|32px)/i,
    ] },
  { id: "19", group: "component", name: "badge / pill spam", fix: "badges only for real status",
    patterns: [
      /rounded-full[\s\S]{0,40}?bg-(indigo|purple|green|amber|pink)-(50|100|200)/i,
      />\s*(?:[✨🔥🎉🚀]\s*)?(new|beta|hot|popular|pro|coming soon)\s*</i,
    ] },
  { id: "20", group: "component", name: "AI-drawn SVG icon", fix: "a real, high-quality icon (a designer, or a strong image model)",
    patterns: [
      /<circle[^>]*\br="[1-9]/i,
      /(?:mascot|blob)\.svg/i,
    ] },
  { id: "21", group: "component", name: "icon in a tint of itself", fix: "no tinted tile; inherit text color",
    patterns: [
      /bg-(indigo|blue|green|amber|red|purple|pink)-\d+\/(?:5|10|15|20)[\s\S]{0,60}?text-\1-/i,
      /text-(indigo|blue|green|amber|red|purple|pink)-\d+[\s\S]{0,60}?bg-\1-\d+\/(?:5|10|15|20)/i,
    ] },
  { id: "22", group: "layout", name: "all-caps card grid", fix: "show the one key thing fully",
    patterns: [
      /\bgrid-cols-3\b/,
      /\buppercase\b[\s\S]{0,30}?(?:text-xs|tracking-wide)/i,
      /\b(everything you need|why (?:you.?ll love|choose|teams))\b/i,
    ] },
  { id: "23", group: "evolved", name: "tasteful-terminal", fix: "mono for code only",
    patterns: [
      /\bfont-mono\b/,
      /font-family:\s*[^;]*(?:mono|jetbrains|fira code|ibm plex mono|geist mono)/i,
      /[╔╗╚╝║═▓▒░]/,
    ] },
];

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".") {
      if (SKIP_DIRS.has(e.name)) continue;
    }
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, files);
    } else if (e.isFile()) {
      const base = e.name;
      if (/\.min\.(js|css)$/.test(base)) continue;
      if (/(package-lock|pnpm-lock|yarn\.lock)/.test(base)) continue;
      const ext = extname(base);
      if (EXTS.has(ext) || /^tailwind\.config\./.test(base)) files.push(full);
    }
  }
  return files;
}

function scanFile(path) {
  let text;
  try {
    const st = statSync(path);
    if (st.size > 512 * 1024) return []; // skip large/generated files
    text = readFileSync(path, "utf8");
  } catch {
    return [];
  }
  const isCode = ![".md", ".mdx"].includes(extname(path));
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 2000) continue; // minified-ish
    for (const tell of TELLS) {
      if (!tell.copy && !isCode) continue; // code-only tell in a prose file
      if (tell.patterns.some((re) => re.test(line))) {
        hits.push({ tell, line: i + 1, text: line.trim().slice(0, 100) });
      }
    }
  }
  return hits;
}

// ---- run ----
const files = walk(root);
const byTell = new Map(); // id -> { tell, hits: [{file,line,text}] }
for (const f of files) {
  for (const h of scanFile(f)) {
    if (!byTell.has(h.tell.id)) byTell.set(h.tell.id, { tell: h.tell, hits: [] });
    byTell.get(h.tell.id).hits.push({ file: relative(root, f) || f, line: h.line, text: h.text });
  }
}

const groups = [...byTell.values()].sort((a, b) => a.tell.id.localeCompare(b.tell.id));
const totalHits = groups.reduce((n, g) => n + g.hits.length, 0);

if (asJson) {
  console.log(
    JSON.stringify(
      {
        root,
        filesScanned: files.length,
        groups: groups.length,
        hits: totalHits,
        findings: groups.map((g) => ({
          id: g.tell.id,
          group: g.tell.group,
          name: g.tell.name,
          fix: g.tell.fix,
          hits: g.hits,
        })),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const red = (s) => c("31", s);
const dim = (s) => c("2", s);
const bold = (s) => c("1", s);

console.log(`\n${bold("kill-ai-slop")} — scanned ${files.length} files under ${root}\n`);
if (groups.length === 0) {
  console.log("No slop signals found. (Still trust your eyes — open the pages.)\n");
  process.exit(0);
}

for (const g of groups) {
  console.log(`${red("slop")} ${bold(g.tell.id)} ${g.tell.name}  ${dim("→ " + g.tell.fix)}`);
  const shown = g.hits.slice(0, 12);
  for (const h of shown) {
    console.log(`     ${dim(h.file + ":" + h.line)}  ${h.text}`);
  }
  if (g.hits.length > shown.length) {
    console.log(dim(`     … and ${g.hits.length - shown.length} more`));
  }
  console.log("");
}

console.log(
  `${bold("→")} ${groups.length} groups, ${totalHits} hits. ` +
    dim("Confirm each by reading the code, then fix per references/fixes.md.\n"),
);
