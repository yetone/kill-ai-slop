# The AI-slop taxonomy

23 tells, in two tiers. **Classic** = widely recognised. **Evolved** = newer
defaults that already read as templated. For each: what it is, why it reads as
machine-made, and the fix. Detection patterns live in `detection.md`; code
patches in `fixes.md`.

The rule under every entry: slop is the *absence of a decision*. A tell is only
slop when it's a default nobody chose. The same element, chosen and defended,
is fine.

## Color

**01 · Indigo→violet gradient** — the `#6366f1 → #a855f7` diagonal on buttons,
glows, and hero backgrounds. It's the factory setting of Tailwind demos and
template galleries, so it reads as an absence of a decision.
*Fix:* one justified accent; if a gradient, give it direction and a reason, not
a "premium" sticker.

**02 · Gradient headline text** — `background-clip:text` rainbow fills on
headings. Trades legibility and contrast for an effect every AI page uses;
decoration eats the message.
*Fix:* solid color for headings; build hierarchy with size, weight, and space.

**03 · Warm "cozy" palette** — amber/stone/orange wash on soft beige. The
model's laziest translation of "warm and friendly": Tailwind's warm ramp served
raw, so every "human" product looks identical.
*Fix:* neutral base + one restrained warm accent; warmth comes from words.

**04 · The default semantic palette** — info in blue/indigo, tip in amber,
success in green, error in red: the framework's stock `-50` backgrounds with
`-600` text. Nobody picked these hues; three or four unrelated candy colors,
related to nothing — not your brand, not each other. A bowl of default rainbow
candy where every box shouts a different colour.
*Fix:* grow semantic colours out of your one palette (tints of a hue plus
neutrals); colour only the states that truly differ. Most notes need no colour.

**05 · The one-hue status box** — a status or alert where the border, text, and
background are all one hue, the background just a see-through version of it: red
on red, yellow on yellow, green on green. The framework reflex
(`border-red-500`, `text-red-500`, `bg-red-500/10`), one loud hue at three
opacities, nothing toned to sit next to your UI. Red/yellow/green is a traffic
light, not a palette.
*Fix:* carry the state in words and weight first — a bold "Error" reads before
colour does. If you colour at all, one muted accent from your own palette on a
neutral surface.

**06 · Gradients as atmosphere** — a near-black blue page with a soft glow up
top and cards whose surface is itself a gradient, lighter above and darker
below: the default "premium dark mode." The glow and surface gradients carry no
information; it's the move a model makes to look premium in the dark, the same
midnight blue with a spotlight behind a thousand AI pages.
*Fix:* pick one flat background and hold it; build surface depth with a hairline
and a restrained shadow. If a glow must exist, let it point at something.

## Type

**07 · Serif-italic on one word** — swapping one word in a sans headline to
serif italic for "emphasis." Cheap drama that stages two voices in one sentence;
the most viral AI headline tic.
*Fix:* emphasise with weight, position, or a line break; keep one voice, and if
you truly need italic use the same family's italic.

**08 · Serif where sans belongs** — Playfair/Lora/Cormorant display serif as
body/UI text on a dev tool or SaaS. The model equates "premium" with "serif";
display serifs are hard to read at UI sizes and tonally off, a tuxedo on a
terminal.
*Fix:* one legible sans you chose; serif only when you want that voice, and a
text serif not a display one.

**09 · Decorative strikes & highlights** — striking out, underlining, or
swiping a highlighter over a word, not to delete or annotate but as decorative
"emphasis." The same disease as serif-emphasis: the model doesn't trust the
words to carry weight, so it draws on them.
*Fix:* let weight, size, line breaks, and structure carry emphasis; keep strike
for real edits, underline for links, highlight for real annotation.

## Copy

**10 · Highlighted keywords** — coloring or bolding scattered words
mid-paragraph, like a highlighter ran over it. When every word is emphasised,
none is; it's the signature of not knowing the point.
*Fix:* let sentence structure carry emphasis — at most one accent per paragraph.

**11 · The AI copywriting voice** — "It's not just X — it's Y", "Say goodbye to
X", punchy three-word triads, an em-dash habit. A rhythmic fingerprint:
symmetrical, one notch too excited, specifics-free.
*Fix:* write something specific — real numbers, nouns, consequences; say it the
way one person explains it to another.

**12 · Emoji everywhere** — an emoji on every heading, button, and bullet: 🚀
launch, ⚡ fast, 🔒 secure, 🎉 delight. Borrowed warmth standing in for tone
that copy and design should carry; a glyph before every point is louder, not
clearer.
*Fix:* cut decorative emoji from the UI; keep one only where it genuinely
carries information, like a real status.

## Components

**13 · The glowing status dot** — a status indicator (online / ready / live)
drawn as a solid dot in a pale halo, usually pulsing, almost always saturated
green. A status is a tiny signal; the halo, pulse, and breathing glow carry no
information. Inflating a binary state into a glowing gem is textbook overdesign.
*Fix:* a small, flat, single-color dot plus a word; no halo, no pulse. Colour
only when the state actually matters or changes.

**14 · Rounded card, colored left border** — a pale rounded box with a 4px
colored bar down the left, wrapped around every list item, not just a "Tip/Note"
but feature points and changelog rows. A docs admonition turned into universal
decoration, so every row looks like an "important note" and none is.
*Fix:* let a list be a list — alignment, spacing, hierarchy. Callouts are
scarce: one or two a page, only for a genuine aside.

**15 · Rounded-square icon tiles** — every feature gets a rounded-square chip +
a line icon, tiled into a grid. Shortest path to "looks designed"; the icons
rarely relate to the content, they just fill the grid.
*Fix:* an icon must carry meaning or go; a clear label + one sentence beats a
row of glyphs.

**16 · Max radius + glassmorphism** — everything a max-radius pill; every card a
translucent `backdrop-blur` pane. A frozen slice of 2021 Dribbble; effect
presets unrelated to what the product says.
*Fix:* one radius, held site-wide (usually small); depth from solid surfaces and
space, not blur.

**17 · The oversized drop shadow** — a small card or icon casting a huge, soft
shadow that bleeds far past it on every side: big blur, low opacity, almost no
offset. A shadow says how high a surface floats, and real light gives a tight
contact shadow plus a soft ambient one with the blur tracking the height; this
one tracks nothing. A big soft blur reads as "depth" in a thumbnail but maps to
no real height — atmosphere standing in for elevation.
*Fix:* a small elevation scale, held: tight blur, small offset, low opacity,
never a shadow bigger than the thing casting it. Often a hairline does the
separating and no shadow is needed; keep it colorless — a tinted glow isn't depth.

**18 · Corners that don't nest** — the same radius on every layer: a big-radius
outer box with an inner box at the same big radius, so the corners don't sit
concentrically and the inner arc fights the outer one. Nested corners have a
rule (inner = outer − gap); AI UIs skip the math and stamp one radius token on
everything.
*Fix:* compute the nested radius (inner = outer − padding), or don't round the
inner element at all; keep a small, deliberate radius scale.

**19 · Badge and pill spam** — "✨ New", "β Beta", "🔥 Popular" decorative pills
everywhere. Manufacturing fake buzz; in bulk each stops meaning anything.
*Fix:* a badge only for real status (a version, stock).

**20 · AI-drawn SVG icons** — asking a model to "draw an icon" and shipping what
comes back: a round blob with two dot eyes, a mascot of primitive shapes, a logo
that's a rounded square with a face. Vector art the machine can't really draw,
used as the product's mark; it looks like placeholder art that never got
replaced.
*Fix:* get a real, high-quality icon. Commission a designer, or generate one
with the best image model and refine it until it's crisp and on-brand. A crude
SVG the model sketched, or a bare fallback letter, isn't a mark worth shipping.

**21 · Icon in a tint of itself** — every icon wrapped in a rounded square
filled with a see-through tint of its own color: a blue icon on faint blue, a
green one on faint green (`bg-{color}/10` behind `text-{color}`). A one-line
reflex — pad, round, wash in 10% of the icon's hue — so the page becomes a grid
of soft colored squares.
*Fix:* let an icon just be an icon; inherit the text color, no container. If
something genuinely needs one, give it a deliberate opaque surface from your
palette, not a tint of the icon it holds.

## Layout

**22 · The all-caps card grid** — an ALL-CAPS label plus a number or icon,
copied into rows of interchangeable cards: feature grids and dashboard
stat-cards alike. It fakes structure while stuffing unrelated things into
identical boxes; the ALL-CAPS micro-label is the default costume for "looks
designed."
*Fix:* decide the single most important thing and show it fully; if you must
list, use real hierarchy and contrast, not a grid of equal-weight cards.

## Evolved slop

**23 · The "tasteful terminal"** — mono everywhere, a near-black background, one
warm accent, ASCII art: the look of "an AI that read one Vercel blog post." It
isn't ugly, that's the trap; it's polished enough to have become the new
default, dodging the design decision exactly like the indigo gradient did, in
cooler clothing.
*Fix:* keep monospace for code, not UI chrome; use ASCII art and terminal
metaphors only where they serve the product. Real taste is a choice you can
explain, not this season's safest template.
