# kill-ai-slop — an Agent Skill

Scan a web project for **AI slop** — the generic, machine-default visual and
copy tics of vibe-coded products — and strip it out. This skill turns the
catalogue at **[killaislop.com](https://killaislop.com)** into action: it
detects 23 tells from their code-level signals, explains why each reads as
machine-made, and proposes or applies the clean fix.

It covers indigo→violet gradients, gradient-clip headlines, the default
semantic palette, one-hue status boxes, atmospheric background gradients,
serif-italic emphasis, decorative strikes/highlights, highlighted keywords, AI
copywriting voice, emoji spam, glowing status dots, colored-left-border
callouts, pastel icon tiles, glassmorphism and over-rounding, oversized drop
shadows, corners that don't nest, badge & pill spam, AI-drawn SVG icons,
icon-in-a-tint-of-itself tiles, all-caps stat-card grids, and the "tasteful
terminal" default — across HTML/CSS, React/Vue/Svelte/Astro, Tailwind, and
Markdown copy.

## Install — just ask your agent

This is an [Agent Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
You don't need to configure anything by hand — tell your coding agent, in plain
language, to fetch and install it from this repo. Paste something like this to
Claude Code (or any agent that supports skills):

> Install the **kill-ai-slop** skill from
> `https://github.com/yetone/kill-ai-slop/tree/main/skill`. Put its contents
> (`SKILL.md`, `references/`, `scripts/`) in `.claude/skills/kill-ai-slop/`,
> then confirm it's registered.

The agent will read `SKILL.md`, copy the skill into your skills directory, and
register it. Swap `.claude/skills/…` for `~/.claude/skills/…` if you want it
available in every project instead of just this one.

## Install — manually

If you'd rather do it yourself:

```bash
git clone https://github.com/yetone/kill-ai-slop

# this project only:
cp -r kill-ai-slop/skill ~/your-project/.claude/skills/kill-ai-slop
# or everywhere:
cp -r kill-ai-slop/skill ~/.claude/skills/kill-ai-slop
```

The skill is self-contained: `SKILL.md`, three markdown references, and one
dependency-free Node scanner. No packages, no build step.

## Use it

Once installed, ask your agent:

> Kill the AI slop in this project.

(or "de-slop this", "remove the AI look", "make this not look AI-generated"). It
will **scan** the code for each tell, **triage** slop vs. a real chosen design,
**report** a grouped summary before touching anything, and **fix** only the
groups you approve — smallest diff that removes the tell without changing intent.

You can also run the scanner on its own; it only reads, never edits:

```bash
node scripts/scan.mjs path/to/src          # human-readable report
node scripts/scan.mjs path/to/src --json   # machine-readable
```

Every hit is a lead to confirm by reading the code, not a verdict. A gradient, a
serif, or an emoji can be a real, defended choice — the skill flags defaults,
and keeps anything you clearly decided.

## What's inside

| File | |
|---|---|
| `SKILL.md` | The skill definition, workflow, and guardrails. |
| `references/taxonomy.md` | The 23 tells: what each is, why it's slop, the fix. |
| `references/detection.md` | The code patterns per tell, and their false positives. |
| `references/fixes.md` | Before→after remediation patterns. |
| `scripts/scan.mjs` | The dependency-free scanner. |
