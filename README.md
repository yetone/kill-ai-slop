# Kill AI Slop · 杀死 AI slop

Vibe-coded products are ugly in the same specific way: indigo gradients, glowing
cards, emoji everywhere, a mascot in every corner, ALL-CAPS stat-cards. It's what
a machine reaches for when it has no taste but wants to look impressive — and
it's so common you've stopped seeing it.

**Kill AI Slop** is two things:

1. **A website** — a bilingual (中文 / EN) field guide that catalogues 23 AI-slop
   tells, each with an interactive before→after demo showing the clean fix. The
   site is itself built as a rebuttal to everything it catalogues.
2. **An Agent Skill** — `kill-ai-slop`, which turns that catalogue into action:
   it scans a web project for the code-level signals of each tell, explains why
   each reads as machine-made, and proposes (or applies) the clean fix.

The reference specimen throughout is **OpenClaw** (`openclaw.ai`) — captured
live, used for commentary and teaching. It turned out not to be the
blue-purple/serif stereotype at all, but a near-complete set of the *evolved*
slop it does have (tasteful-terminal, emoji mascot, testimonial wall, serif-
italic emphasis, feature/logo grids). The catalogue is honest about this: real
screenshots where the tell genuinely appears, rebuilt demos where it doesn't.

## Repo layout

```
website/   Astro site — the field guide (bilingual, static, zero-JS-by-default)
skill/     the kill-ai-slop Agent Skill (SKILL.md + references + scanner)
capture/   Playwright tooling used to capture the reference screenshots
```

## The website

```bash
cd website
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/  (static, deploy anywhere)
```

Design system: paper + ink, **one** editorial red used like a proofreader's pen,
hierarchy from scale and space, hairline rules, no gradients / emoji / glass /
badges. See `website/src/styles/tokens.css` for the rules it holds itself to,
and `website/src/data/catalogue.ts` for the taxonomy (the single source of truth
shared with the skill).

## The skill

Point it at any web project:

```bash
node skill/scripts/scan.mjs path/to/project          # grouped report
node skill/scripts/scan.mjs path/to/project --json    # machine-readable
```

The scanner is dependency-free and never edits files. In an Agent-Skills host
(e.g. Claude Code), invoke the skill and it will scan → triage → report → fix,
following `skill/SKILL.md`. See `skill/references/` for the taxonomy, detection
patterns, and remediation playbook.

## Re-capturing screenshots

```bash
cd capture
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install    # uses the system Chrome
node capture-elements.mjs                          # → website/public/screenshots/
```

## A note on the specimen

Screenshots are real captures of OpenClaw's product UI (its Control UI, run
locally), reproduced here for commentary, criticism, and education. The point
is not to dunk on one project. It's to make the ugly defaults visible again, so
you can choose against them.
