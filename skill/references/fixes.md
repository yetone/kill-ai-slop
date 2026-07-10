# Fix patterns

Before→after for each tell. These are *directions*, not find-and-replace rules —
adapt to the project's tokens and framework. Prefer changing a shared token or
component once over editing every call site.

General order of operations:
1. Fix the design tokens / theme first (colors, radius, fonts). Many hits
   disappear at once.
2. Then components, then one-off call sites.
3. Then copy.

---

### 01 Indigo→violet gradient
```diff
- class="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-purple-500/50"
+ class="bg-[--accent]"      /* one solid, chosen accent */
```
If a gradient is truly wanted, make it subtle and directional (a single hue,
low contrast) and justify it. Drop the colored glow shadow.

### 02 Gradient headline text
```diff
- <h1 class="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
+ <h1 class="text-[--ink]">          /* solid; go bigger/heavier for impact */
```

### 03 Warm "cozy" palette
Replace the amber/stone wash with a near-neutral base and keep one warm accent:
```diff
- bg-[#fdf6ec] text-amber-900 border-amber-200
+ bg-[--paper] text-[--ink] border-[--rule]   /* accent stays for one element */
```
Propose the neutral values; let the user confirm before applying globally.

### 04 Default semantic palette
Replace the framework rainbow with a coherent set derived from your palette:
neutrals plus at most one or two intentional semantic colours.
```diff
- <span class="bg-blue-50 text-blue-700">Info</span>
- <span class="bg-green-50 text-green-700">Success</span>
- <span class="bg-amber-50 text-amber-700">Warning</span>
- <span class="bg-red-50 text-red-700">Error</span>
+ <span class="chip">Info</span> <span class="chip">Warning</span>
+ <span class="chip chip--ok">Success</span>       /* one chosen green */
+ <span class="chip chip--danger">Error</span>     /* the brand accent */
```

### 05 One-hue status box
Carry the state in a word first; drop the border/text/tint all being one hue.
```diff
- <div class="border border-red-500 bg-red-500/10 text-red-500 rounded p-3">
-   Something went wrong.
- </div>
+ <div class="border border-[--rule] bg-[--surface] text-[--ink] rounded p-3">
+   <b>Error</b> — something went wrong.   /* one muted accent, on a neutral surface */
+ </div>
```

### 06 Gradients as atmosphere
Hold one flat background; build surface depth with a hairline, not a gradient.
```diff
- <body class="bg-[radial-gradient(circle_at_top,#1e293b,#020617)]">
-   <div class="rounded-2xl bg-gradient-to-b from-white/10 to-white/0 …">
+ <body class="bg-[--bg]">                 /* one flat colour, held */
+   <div class="rounded-[--radius] bg-[--card] border border-[--rule]">
```
If a glow must exist, let it point at one element instead of filling the void.

### 07 Serif-italic on one word
```diff
- The editor that <em class="font-serif italic text-indigo-600">actually</em> ships.
+ The editor that <b>ships</b>.        /* emphasise by weight/position, one voice */
```

### 08 Serif where sans belongs
Swap the display serif for the project's UI sans in the font tokens; keep serif
only if the product's voice is genuinely editorial (and then use a *text* serif).
```diff
- font-family: "Playfair Display", serif;
+ font-family: var(--font-sans);
```

### 09 Decorative strikes & highlights
Remove the strike/underline/highlight used for emphasis; let structure carry it.
```diff
- <h1>The <s>old</s> <mark>new</mark> way to <u>ship</u>.</h1>
+ <h1>A faster way to ship.</h1>
```
Keep strike-through for a real edit, underline for a link, highlight for a real
annotation — each only when it does that job.

### 10 Highlighted keywords
```diff
- Our <span class="text-indigo-600 font-semibold">revolutionary</span> platform helps
- <span class="text-pink-600 font-semibold">ambitious</span> teams move faster.
+ A project tracker for engineering teams. It updates issues from your commits.
```
Let structure carry emphasis; at most one accented phrase.

### 11 AI copywriting voice
Rewrite for specifics. Delete triads and em-dash drama.
```diff
- It's not just an editor — it's a movement. Say goodbye to friction.
+ A code editor. Opens in under a second, ~half the memory of Electron editors.
```

### 12 Emoji everywhere
Remove emoji from headings, buttons, and bullets; keep one only where it carries
real information (a status).
```diff
- <h2>🚀 Why you'll love it</h2>
+ <h2>Why teams pick it</h2>
```

### 13 Glowing status dot
Drop the halo, the pulse, and the glow shadow; a flat dot plus a word is enough.
```diff
- <span class="relative flex h-3 w-3">
-   <span class="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
-   <span class="relative rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
- </span> Ready
+ <span class="inline-block h-2 w-2 rounded-full bg-[--ok]"></span> Ready
```

### 14 Rounded card, colored left border
Collapse stacked callouts to body text; keep at most one real aside.
```diff
- <div class="border-l-4 border-indigo-500 rounded-lg bg-indigo-50 p-4">Note …</div>
- <div class="border-l-4 border-amber-500 rounded-lg bg-amber-50 p-4">Tip …</div>
+ <p>… the note, inline as normal prose …</p>
+ <aside class="note">Beta: exports may change format before 1.0.</aside>
```

### 15 Rounded-square icon tiles
Drop decorative tiles; use a labelled list with real specifics.
```diff
- <div class="rounded-xl bg-indigo-100 p-2"><Icon/></div><h3>Fast</h3><p>Very fast.</p>
+ <li><b>Fast</b> — cold start in 180 ms, measured on a 2020 laptop.</li>
```

### 16 Max radius + glassmorphism
Pick one small radius token; replace blur panes with solid surfaces.
```diff
- class="rounded-full backdrop-blur bg-white/10 border border-white/20"
+ class="rounded-[--radius] bg-[--card] border border-[--rule]"
```

### 17 Oversized drop shadow
Shrink the shadow to a real elevation: tight blur, small offset, low opacity,
never bigger than the element. Often a hairline replaces it outright.
```diff
- box-shadow: 0 16px 80px 10px rgba(0,0,0,0.36);   /* a room-sized fog */
+ border: 1px solid var(--rule);
+ box-shadow: 0 1px 2px rgba(0,0,0,0.06), 0 4px 10px -6px rgba(0,0,0,0.1);
```
Keep it colorless; a tinted glow is not depth. (See tell 01 for the purple
glow-shadow, tell 13 for the status-dot halo.)

### 18 Corners that don't nest
Compute the inner radius from the outer minus the padding, or don't round the
inner element at all.
```diff
- <div class="rounded-2xl p-3"><div class="rounded-2xl">…</div></div>   /* both 16px */
+ <div class="rounded-2xl p-3"><div class="rounded-lg">…</div></div>   /* 16 − 12 ≈ 8 */
```

### 19 Badge & pill spam
Delete decorative pills; keep at most a real status tag.
```diff
- <h1>Dashboard</h1><Pill>✨ New</Pill><Pill>🔥 Popular</Pill><Pill>β Beta</Pill>
+ <h1>Dashboard</h1><span class="ver">v2.1</span>
```

### 20 AI-drawn SVG icons
Get a real, high-quality icon: commission a designer, or generate one with the
best image model and refine it until it's crisp and on-brand.
```diff
- <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><circle cx="18" cy="20" r="2"/>…</svg>
+ <img src="/icon.svg" alt="" />        /* a real icon: a designer, or a strong image model, refined */
```
Don't ship the crude blob the model sketched, and don't fall back to a bare
letter; a crude generated icon is worse than no picture at all.

### 21 Icon in a tint of itself
Let the icon inherit the text color with no container; if it truly needs one,
give it a deliberate opaque surface.
```diff
- <div class="rounded-lg bg-blue-500/10 p-2"><Icon class="text-blue-500"/></div>
+ <Icon class="text-[--ink]"/>          /* just an icon; no tinted tile */
```

### 22 The all-caps card grid
Replace the grid of equal-weight cards with the single most important point,
told fully; drop the ALL-CAPS micro-labels.
```diff
- <div class="grid grid-cols-3 gap-8"> …6 icon+CAPS-label+one-liner cards… </div>
+ <p class="lead">It replaces your standups.</p>
+ <p>Every morning it reads yesterday's commits and PRs and writes the team a
+ three-line summary.</p>
```

### 23 The tasteful terminal
Move monospace back to code; use terminal metaphors only where they serve the
product.
```diff
- <body class="font-mono bg-[#0a0a0a] text-amber-400">
-   <pre>  ╔══════════════╗
-          ║  WELCOME  ║
-          ╚══════════════╝</pre>
+ <body class="font-sans bg-[--bg] text-[--ink]">
+   <h1>Welcome</h1>          /* mono stays in <code>/<pre> for actual code */
```
