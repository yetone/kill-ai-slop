---
name: kill-ai-slop
description: >-
  Find and remove AI slop — the generic, machine-default visual and copy tics of
  vibe-coded products — from a web project. Use when the user asks to "kill AI
  slop", "de-slop", "remove the AI look", "make this not look AI-generated", or
  clean up a landing page / UI / docs that feels templated. Detects and fixes:
  indigo→violet gradients, gradient-clip headline text, warm amber/stone "cozy"
  palettes, the default semantic palette (info-blue / tip-amber / success-green /
  error-red), one-hue status boxes, atmospheric/ambient gradients, serif-italic
  emphasis on one word, serif where sans belongs, decorative strikes and
  highlights, highlighted keywords in copy, AI copywriting voice ("not just X —
  it's Y"), emoji everywhere, glowing status dots, rounded colored-left-border
  callouts, pastel rounded-square icon tiles, glassmorphism and over-rounding,
  oversized drop shadows, corners that don't nest, badge & pill spam, AI-drawn
  SVG icons, icons in a
  tint of themselves, all-caps card grids, and the "tasteful terminal". Works on
  HTML/CSS, React/Vue/Svelte/Astro, Tailwind, and Markdown copy.
---

# Kill AI Slop

AI slop is **ugly** in a specific way: it piles on every possible style and
detail without settling on a focus. A gradient, a glow, a mascot, emoji, a wall
of glowing cards, every default switched on at once, until every product looks
like the same garish template. It reads as "designed" in a thumbnail and falls
apart the moment anyone looks. Your job is to strip it back to something a
person would actually choose.

The principles, held on every fix you make:

1. **Decide before you decorate.** Every visual choice must be explainable.
2. **One accent, one voice.**
3. **Hierarchy from scale and space.** Coloring words or swapping fonts is a shortcut.
4. **Subtract first.** The first move toward not-ugly is removing things.
5. **Specific beats punchy** in copy.
6. **Decoration must mean something** — icons, badges, callouts are signals.

## Workflow

Follow these steps in order. Do not mass-edit before the user has seen the report.

### 1. Scope
Confirm what to scan. Default to the app/site source (skip `node_modules`,
`dist`, `build`, `.git`, `vendor`, lockfiles, minified files). Ask if the
project mixes several apps.

### 2. Scan
Run the bundled scanner, which greps the codebase for the code-level signals of
each tell and prints grouped `file:line` hits:

```
node scripts/scan.mjs <root>          # human-readable report
node scripts/scan.mjs <root> --json   # machine-readable, for triage
```

It is pure Node (no dependencies) and never edits files. Use its output as a
starting map, not gospel — confirm each hit by reading the code.

### 3. Triage
For every hit, open the file and decide **slop vs. intentional**. This is the
step that separates this skill from a lint rule. A gradient, a serif, or an
emoji can be a real, defended choice. Keep anything the user clearly chose
(brand tokens, a logo, a deliberate illustration). Flag only defaults.

Read `references/taxonomy.md` for what each tell is and why it reads as
machine-made, and `references/detection.md` for the exact patterns and their
common false positives.

### 4. Report
Before changing anything, give the user a grouped summary: each tell, the
`file:line` hits you confirmed, one sentence on why, and the proposed fix.
Mirror the format:

```
slop  src/Hero.tsx:12   indigo→violet gradient        → one solid accent
slop  src/Hero.tsx:31   gradient-clip headline        → solid ink, scale up
slop  src/Note.tsx:8    border-l-4 callout ×3         → 1 aside, rest is body
slop  copy.md:1         "not just X — it's Y"         → say the specific thing
→ 4 groups, 11 hits.
```

Then ask which groups to apply, or whether to proceed on all.

### 5. Fix
Apply the minimal change that removes the tell while preserving intent and
function. Use `references/fixes.md` for the before→after pattern per tell.

- Prefer editing shared tokens/components over touching every call site.
- Never invent new brand colors; if a palette must change, propose neutrals +
  the project's existing accent and let the user confirm.
- Keep copy meaning; make it specific, don't just delete it.
- Re-run the scanner after fixing to confirm the count dropped, and note any
  hits you intentionally left (with the reason).

## Guardrails

- **Respect authorship.** Treat unfamiliar files and deliberate flourishes as
  someone's choice. When unsure whether something is slop, ask — don't strip it.
- **Small, reviewable diffs.** Never reformat unrelated code. Never run
  `git add -A`; stage explicit files only, and leave others' work-in-progress
  alone.
- **No new dependencies** to do this work.
- **Verify visually when possible.** If a dev server exists, look at the before
  and after; a passing scan is not the same as a better page.

## References

- `references/taxonomy.md` — the 23 tells: what each is, why it's slop, the fix.
- `references/detection.md` — concrete ripgrep/regex patterns + false positives.
- `references/fixes.md` — before→after remediation patterns.
- `scripts/scan.mjs` — the dependency-free scanner.
