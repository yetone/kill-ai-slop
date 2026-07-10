# Detection patterns

Concrete signals for each tell. `scripts/scan.mjs` encodes these; this file is
the human reference and the place to widen patterns for a specific stack.

**Scan scope.** Frontend source only: `.html .css .scss .tsx .jsx .ts .js .vue
.svelte .astro .md .mdx` plus `tailwind.config.*`. Skip `node_modules dist build
.git out .next .astro coverage vendor` and anything `*.min.*` or a lockfile.

**Every match is a lead, not a verdict.** Open the file and confirm. The false
positives noted below are the usual ways a pattern lies.

---

### 01 Indigo→violet gradient
```
rg -n -i 'from-(indigo|violet|purple|fuchsia)-[0-9]+ ?.*to-(purple|violet|fuchsia|pink)-[0-9]+'
rg -n -i '(linear-gradient|bg-gradient)[^;]*(#6366f1|#8b5cf6|#a855f7|#7c3aed)'
rg -n -i 'shadow-(purple|violet|indigo)-[0-9]+/[0-9]+'
```
*False positives:* a brand that genuinely is purple (check the logo / design
tokens); a one-off illustration. Slop is the *combination* — purple gradient +
glow + pill button + "AI-powered" eyebrow.

### 02 Gradient headline text
```
rg -n 'bg-clip-text.*text-transparent|text-transparent.*bg-clip-text'
rg -n '(-webkit-)?background-clip:\s*text'
rg -n -i '-webkit-text-fill-color:\s*transparent'
```
*False positives:* a logo wordmark; a single deliberate hero treatment. Slop is
gradient text used as the default heading style.

### 03 Warm "cozy" palette
```
rg -n -i '\b(amber|orange|stone)-(50|100|200|300)\b'
rg -n -i 'bg-\[#(fdf6ec|fef3e2|faf3e8|fff7ed|fdf4e3)\]'
rg -n -i 'text-amber-[0-9]+|border-amber-[0-9]+'
```
*False positives:* a food/coffee/craft brand where warm is the identity. Slop is
warm-as-default with no brand reason.

### 04 Default semantic palette
```
rg -n -i 'bg-(blue|indigo)-50|bg-amber-50|bg-green-50|bg-emerald-50|bg-red-50'
rg -n -i 'text-(blue|indigo)-(600|700).*text-(green|emerald)-(600|700)'  # multiple stock hues near each other
rg -n -i 'info.*blue|warning.*amber|success.*green|error.*red'
```
*Confirm:* three or four of the stock `-50 / -600` semantic pairs used together
(info=blue, tip=amber, success=green, error=red), unrelated to the brand. A
single, deliberate status colour is fine.

### 05 One-hue status box
```
rg -n -i 'border-(red|amber|yellow|green|blue)-[0-9]+[^"]*text-\1-[0-9]+'
rg -n -i 'bg-(red|amber|yellow|green)-[0-9]+/(5|10|15|20)'
rg -n -i '(error|warning|success)[^\n]{0,40}(red|amber|yellow|green)-[0-9]+'
```
*Confirm:* one box where border, text, and a `/10` background are all the same
hue — the whole alert is one colour at three opacities. A single muted accent on
a neutral surface is fine.

### 06 Gradients as atmosphere
```
rg -n -i 'radial-gradient|bg-\[radial-gradient'
rg -n -i 'linear-gradient[^;]*(to bottom|180deg|to top)'  # top-lighter surface fill
rg -n -i 'bg-gradient-to-(b|t)\b[\s\S]{0,40}from-'
```
*Confirm:* a page-wide radial glow behind everything, or card surfaces filled
with a top-to-bottom gradient where a flat colour would do. A gradient that
points at something specific is a choice, not slop.

### 07 Serif-italic on one word
Hard to grep purely; look for a serif font family or `<em>/italic` applied
*inside* an otherwise-sans heading.
```
rg -n -i 'font-serif|font-family:\s*(georgia|"?playfair|"?lora|"?cormorant)'
rg -n '<em>|italic' -g '*.{tsx,jsx,vue,svelte,astro,html}'
```
*Confirm:* the italic/serif span sits within an `<h1>/<h2>` whose base font is
sans.

### 08 Serif where sans belongs
```
rg -n -i 'font-family:\s*[^;]*(playfair|cormorant|lora|"?dm serif|"?libre baskerville)'
rg -n -i "fontFamily.*(Playfair|Cormorant|Lora)"
```
*False positives:* an editorial/publishing product that wants serif. Slop is
display serif as UI/body on a tool or dashboard.

### 09 Decorative strikes & highlights
```
rg -n -i 'line-through' -g '*.{css,scss,tsx,jsx,vue,svelte,astro,html}'
rg -n '<(mark|s|u|del|strike)[\s>]' -g '*.{md,mdx,html,tsx,jsx,vue,svelte,astro}'
rg -n -i 'text-decoration:\s*(line-through|underline)'
```
*Confirm:* a strike over text that isn't being deleted, an underline that isn't
a link, a highlighter swipe under a heading — decoration, not annotation. Real
edits, links, and annotations are fine.

### 10 Highlighted keywords
```
rg -n '<mark' -g '*.{md,mdx,html,tsx,jsx,vue,svelte,astro}'
rg -n 'text-(primary|indigo|purple|violet)-[0-9]+' -g '*.{tsx,jsx,vue,svelte,astro,html}'
rg -n -i 'font-semibold|font-bold' -g '*.{md,mdx}'
```
*Confirm:* multiple colored/`font-semibold` spans inside one paragraph of body
copy. One accented phrase is fine.

### 11 AI copywriting voice
```
rg -n -i "not just .{1,40}\bit'?s\b|say goodbye to|meet your new|supercharge|unlock the power|in seconds, not"
rg -n -i '\b(blazing[- ]fast|effortless|seamless|game[- ]changer|next[- ]level)\b'
```
Also flag paragraphs built from three-word sentences ("Fast. Beautiful. Yours.")
and em-dash triplets. *False positives:* a genuine quote; a doc that discusses
these phrases (like this one).

### 12 Emoji everywhere
```
rg -n '[\x{1F000}-\x{1FAFF}\x{2600}-\x{27BF}\x{2190}-\x{21FF}\x{2B00}-\x{2BFF}]' -g '*.{md,mdx,html,tsx,jsx,vue,svelte,astro}'
rg -n -i '(🚀|✨|⚡|🔒|🎉).{0,40}(<|$)'  # emoji leading a heading/button/bullet
```
*False positives:* emoji inside a code sample being documented; an emoji picker
feature; user-generated content. Slop is an emoji stuck on *every* heading,
button, and bullet in your chrome.

### 13 Glowing status dot
```
rg -n -i 'animate-ping|animate-pulse'
rg -n -i 'shadow-(green|emerald|lime)-[0-9]+/[0-9]+|box-shadow:[^;]*(0 0|glow)'
rg -n -i '(ready|online|live)[\s\S]{0,40}(●|rounded-full)'
```
*Confirm:* a status dot with a pulsing halo or coloured glow — usually saturated
green "● Ready / Online." A small flat dot is fine.

### 14 Rounded card, colored left border
```
rg -n -i 'border-l-4 .*rounded|rounded.* border-l-4'
rg -n -i 'border-left:\s*[0-9]+px .*;.*border-radius|admonition|callout|\bnote-box\b'
```
*Confirm:* stacked callouts used as decoration on plain list items, not one
semantic aside.

### 15 Rounded-square icon tiles
```
rg -n -i 'rounded-(lg|xl|2xl) bg-(indigo|purple|blue|green|amber|pink)-(50|100)'
rg -n -i '(lucide|heroicons|@tabler/icons|react-icons)'
```
*Confirm:* one icon-in-a-tile per feature, in a grid, icons unrelated to content.

### 16 Max radius + glassmorphism
```
rg -n 'rounded-full' -g '*.{tsx,jsx,vue,svelte,astro,html}'
rg -n -i 'backdrop-blur|backdrop-filter:\s*blur|bg-white/(5|10|20|30)|bg-black/(5|10|20|30)'
rg -n -i 'border-radius:\s*(9999px|50%|2rem|24px)'
```
*Confirm:* `rounded-full` on cards/inputs (not just avatars/pills); blur used as
the default surface; radius values that don't agree with each other.

### 17 Oversized drop shadow
```
rg -n -i 'box-shadow:[^;{}]*\b([6-9][0-9]|[0-9]{3,})px'   # a 60px+ blur/spread
rg -n -i 'shadow-\[[^\]]*\b([6-9][0-9]|[0-9]{3,})px'      # tailwind arbitrary shadow
rg -n -i 'filter:[^;{}]*drop-shadow\([^)]*\b([6-9][0-9]|[0-9]{3,})px'
```
*Confirm:* the shadow's render range is far bigger than the element casting it —
a small card/icon under a huge, faint, barely-offset blur (a fog, not a drop).
A genuinely large surface (a modal, a full hero) with a proportionate shadow is
fine; so is one small, tight elevation shadow.

### 18 Corners that don't nest
Hard to grep with certainty; flag the same radius token on nested containers.
```
rg -n -i 'rounded-(xl|2xl|3xl)' -g '*.{tsx,jsx,vue,svelte,astro,html}'  # then check for nesting
rg -n -i 'border-radius:\s*(1rem|1\.5rem|24px|32px)'
```
*Confirm:* an outer box and an inner box carrying the *same* big radius, so the
corners don't sit concentric. Inner radius should be outer minus the padding; a
single flat radius scale that already nests correctly is fine.

### 19 Badge & pill spam
```
rg -n -i 'rounded-full .*(bg-(indigo|purple|green|amber|pink)-(50|100|200))'
rg -n -i '>(\s*[✨🔥🎉🚀]\s*)?(new|beta|hot|popular|pro|coming soon)\s*<'
```
*Confirm:* several decorative pills in chrome. A real version tag is fine.

### 20 AI-drawn SVG icons
Grep finds inline SVG; the judgment is visual.
```
rg -n '<svg' -g '*.{tsx,jsx,vue,svelte,astro,html,svg}'
rg -n -i '<circle[^>]*r="[0-9]'  # dot eyes / blob body built from primitives
rg -n -i '(mascot|blob|logo)\.svg'
```
*Confirm:* an inline `<svg>` that's a blob-with-dot-eyes or a cartoon creature
built from primitive shapes, shipped as the product's mark. A drawn icon set or
a real designed logo is fine.

### 21 Icon in a tint of itself
```
rg -n -i 'bg-(indigo|blue|green|amber|red|purple|pink)-[0-9]+/(5|10|15|20)[\s\S]{0,60}text-\1-'
rg -n -i 'text-(indigo|blue|green|amber|red|purple|pink)-[0-9]+[\s\S]{0,60}bg-\1-[0-9]+/(5|10|15|20)'
rg -n -i 'rounded-(md|lg|xl)\s+bg-(indigo|blue|green|amber|red)-[0-9]+/(5|10|15|20)'
```
*Confirm:* an icon tile whose translucent background is the same hue as the icon
inside it — every glyph wrapped in a soft colored square. A deliberate opaque
button surface is fine.

### 22 The all-caps card grid
```
rg -n -i 'grid-cols-3'
rg -n -i 'uppercase[\s\S]{0,30}(text-xs|tracking-wide|tracking-wider)|text-transform:\s*uppercase'
rg -n -i 'everything you need|why (you.?ll love|choose|teams)'
```
*Confirm:* an ALL-CAPS micro-label + number/icon repeated across interchangeable
cards — a feature grid or a stat-card grid — points unrelated.

### 23 The tasteful terminal (evolved)
```
rg -n -i 'font-mono' -g '*.{tsx,jsx,vue,svelte,astro,html}'
rg -n -i 'font-family:\s*[^;]*(mono|jetbrains|fira code|ibm plex mono|geist mono)'
rg -n '[╔╗╚╝║═▓▒░]|\$ [a-z]' -g '*.{tsx,jsx,vue,svelte,astro,html,md}'
```
*Confirm:* monospace on non-code UI chrome; ASCII banners as decoration;
near-black with a single warm accent. This one needs judgment most — it's a
current default, so weigh whether the terminal metaphor actually serves the
product.
