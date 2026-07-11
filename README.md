# Kill AI Slop

**[killaislop.com](https://killaislop.com)**

Vibe-coded products are ugly in the same specific way: indigo gradients, glowing
cards, emoji everywhere, a mascot in every corner, ALL-CAPS stat-cards. It's what
a machine reaches for when it has no taste but wants to look impressive, and it's
so common you've stopped seeing it.

**Kill AI Slop** is two things:

1. **A website**, a multilingual field guide (English, Chinese, Japanese, and
   Korean) that catalogues 32 AI-slop tells, each with an interactive
   before→after demo showing the clean fix. The site is itself built as a
   rebuttal to everything it catalogues.
2. **An Agent Skill**, `kill-ai-slop`, which turns that catalogue into action:
   it scans a web project for the code-level signals of each tell, explains why
   each reads as machine-made, and proposes (or applies) the clean fix.

Every tell is one you can find in real, shipped products, not a strawman. Each
entry rebuilds the tell in plain HTML so you can see the machine-default and the
clean fix side by side.

## Repo layout

```
website/   Astro site, the field guide (multilingual, static, zero-JS-by-default)
skill/     the kill-ai-slop Agent Skill (SKILL.md + references + scanner)
```

## The website

Live at **[killaislop.com](https://killaislop.com)**. To run it locally:

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

### Universal agent installer

Run the following command and follow the prompt to install it to your favorite coding agents:

```
npx skills add yetone/kill-ai-slop
```

### Manual installation

Install it without touching a single file: paste this to your coding agent (Claude
Code, Cursor, etc.) and it fetches the skill and drops it into its own skills
directory for you.

```
Install the kill-ai-slop skill from
https://github.com/yetone/kill-ai-slop/tree/main/skill

Copy everything in that directory into a kill-ai-slop/ folder
inside your agent's skills directory, then confirm it's registered.
```

Then just tell it to "kill the AI slop in this project". Prefer to install by hand?
See `skill/README.md`.

You can also run the scanner directly. Point it at any web project:

```bash
node skill/scripts/scan.mjs path/to/project          # grouped report
node skill/scripts/scan.mjs path/to/project --json    # machine-readable
```

The scanner is dependency-free and never edits files. In an Agent-Skills host
(e.g. Claude Code), invoke the skill and it will scan, triage, report, then fix,
following `skill/SKILL.md`. See `skill/references/` for the taxonomy, detection
patterns, and remediation playbook, and `skill/README.md` for install steps.

## Every example is a rebuild

The demos are reconstructed in plain HTML, for commentary, criticism, and
education. The point is not to dunk on any one project. It's to make the ugly
defaults visible again, so you can choose against them.
