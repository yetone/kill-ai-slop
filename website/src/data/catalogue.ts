/*
  The AI-slop catalogue — the single source of truth for the website, and the
  spec the kill-ai-slop skill enforces.

  Two tiers:
   - tier 1  "classic" slop: the tells most people already recognise.
   - tier 2  "evolved" slop: newer defaults that already read as templated —
             the friendly-AI-app look every product ships now.

  Each tell is shown as a live before→after demo (`demo`), rebuilt in HTML so the
  comparison is precise and never drifts. (Earlier drafts pinned annotated
  screenshots of the reference product; those were removed in favour of demos.)
*/

export type Group = "color" | "type" | "copy" | "component" | "layout" | "evolved";

// Localized string. English is the source of truth and always present; the
// other languages are optional and fall back to English at the <T> layer.
// zh is inline in this file; ja/ko are merged in from catalogue.i18n.ts.
export interface Bi {
  en: string;
  zh: string;
  ja?: string;
  ko?: string;
}

export interface Entry {
  id: string;
  n: number;
  tier: 1 | 2;
  group: Group;
  title: Bi;
  what: Bi; // one line: what the tell is
  why: Bi; // why it reads as machine-made
  fix: Bi; // the clean move
  detect: string[]; // code-level signals (mono chips + skill heuristics)
  demo?: string; // key into demos.css / BeforeAfter data
}

export const GROUPS: Record<Group, Bi> = {
  color: { en: "Color", zh: "配色", ja: "カラー", ko: "색상" },
  type: { en: "Type", zh: "字体", ja: "書体", ko: "타이포" },
  copy: { en: "Copy", zh: "文案", ja: "コピー", ko: "카피" },
  component: { en: "Components", zh: "组件", ja: "コンポーネント", ko: "컴포넌트" },
  layout: { en: "Layout", zh: "版式", ja: "レイアウト", ko: "레이아웃" },
  evolved: { en: "Evolved slop", zh: "进化型 slop", ja: "進化型 slop", ko: "진화형 slop" },
};

// Entries are numbered by position (see the map below), so inserting a case
// renumbers the rest automatically.
const rawEntries: Omit<Entry, "n">[] = [
  // ── Color ────────────────────────────────────────────────────────────────
  {
    id: "indigo-violet-gradient",
    tier: 1,
    group: "color",
    title: { zh: "蓝紫渐变", en: "The indigo→violet gradient" },
    what: {
      zh: "从 #6366f1 到 #a855f7 的紫色对角渐变，按钮、光晕、hero 背景，无处不在。",
      en: "That #6366f1→#a855f7 diagonal on buttons, glows, and hero backgrounds.",
    },
    why: {
      zh: "它就是生成工具直接塞给你的那种默认色，从来没人主动选过。它是 Tailwind 示例和成堆模板的出厂配色，看一眼就知道是「没做选择」的状态。",
      en: "It is the generative default. Nobody chose it; it's the factory setting of Tailwind demos and template galleries, so it reads as an absence of a decision.",
    },
    fix: {
      zh: "选一个有理有据的主色。要用渐变，就让它有方向和目的，而不是拿来当「高级感」的贴纸。",
      en: "Pick one accent you can justify. If you use a gradient, give it direction and a reason — not as a sticker for ‘premium’.",
    },
    detect: [
      "from-indigo-500 to-purple-500",
      "#6366f1 → #a855f7",
      "bg-gradient-to-r via-purple",
      "shadow-purple-500/50",
    ],
    demo: "indigo-violet-gradient",
  },
  {
    id: "gradient-text",
    tier: 1,
    group: "color",
    title: { zh: "渐变文字标题", en: "Gradient headline text" },
    what: {
      zh: "把大标题做成 background-clip:text 的彩色渐变字。",
      en: "The big heading done as a clipped rainbow gradient fill.",
    },
    why: {
      zh: "渐变字牺牲了可读性和对比度，换来那种每个 AI 落地页都在用的效果。装饰压过了内容本身。",
      en: "It trades legibility and contrast for an effect — the same effect on every AI landing page. Decoration eats the message.",
    },
    fix: {
      zh: "标题用实色。层级靠字号、字重和留白来决定，而不是给文字上色。",
      en: "Solid color for headings. Build hierarchy with size, weight, and space — not by painting the letters.",
    },
    detect: [
      "bg-clip-text text-transparent",
      "background-clip: text",
      "-webkit-text-fill-color: transparent",
    ],
    demo: "gradient-text",
  },
  {
    id: "warm-cozy-palette",
    tier: 1,
    group: "color",
    title: { zh: "棕色「温暖」配色", en: "The warm ‘cozy’ palette" },
    what: {
      zh: "amber、stone、orange 堆出的暖棕色调，配上柔和的米色背景。",
      en: "The amber / stone / orange wash on a soft beige background.",
    },
    why: {
      zh: "这是模型对「温暖、亲和」最偷懒的翻译。它把 Tailwind 的 warm 色阶原样端上来，结果每个「有温度」的产品长得一模一样。",
      en: "It's the model's laziest translation of ‘warm and friendly’: Tailwind's warm ramp served raw, so every ‘human’ product looks identical.",
    },
    fix: {
      zh: "温度来自内容和文字，不是把什么都刷成焦糖色。用中性底色 + 一个克制的暖色点缀。",
      en: "Warmth comes from words and content, not from dipping everything in caramel. Use a neutral base with one restrained warm accent.",
    },
    detect: [
      "amber-50 / stone-100 / orange-400",
      "bg-[#fdf6ec] text-amber-900",
      "border-amber-200",
    ],
    demo: "warm-cozy-palette",
  },
  {
    id: "default-semantic-palette",
    tier: 1,
    group: "color",
    title: { zh: "默认语义配色（蓝·黄·绿·红）", en: "The default semantic palette" },
    what: {
      zh: "info 用蓝/靛、tip 用琥珀黄、success 用绿、error 用红——永远是框架自带那套 50 号浅底配 600 号文字。",
      en: "Info in blue/indigo, tip in amber, success in green, error in red — always the framework's stock -50 backgrounds with -600 text.",
    },
    why: {
      zh: "这套「语义色」是 Tailwind / Bootstrap 的出厂设定，没人真去挑过。几种毫不相干的糖果色挤在一起，和品牌无关，彼此也不搭，就像一盘默认的彩虹糖，每个提示框各喊各的调。",
      en: "This ‘semantic’ set is the Tailwind / Bootstrap factory default; nobody actually picked it. Three or four unrelated candy colors crammed together, unrelated to your brand or to each other — a bowl of default rainbow candy with every box shouting a different hue.",
    },
    fix: {
      zh: "语义色也该出自你自己那套调色板：用同一个主色的深浅加中性灰，只给少数真正需要区分的状态上色。大多数「提示」根本用不上颜色。",
      en: "Grow semantic colors out of your one palette: tints of a single hue plus neutrals, and color only the few states that truly differ. Most ‘notes’ need no color at all.",
    },
    detect: ["bg-blue-50 / bg-amber-50 / bg-green-50 together", "-50 bg + -600 text semantic set", "default info/warn/success/error hues"],
    demo: "default-semantic-palette",
  },
  {
    id: "mono-hue-alert",
    tier: 1,
    group: "color",
    title: { en: "The one-hue status box", zh: "同色系状态框" },
    what: {
      zh: "一个状态或提示，边框、文字、背景都是同一个色系，背景就是这个色系的半透明版。错误永远红字红底，警告永远黄字黄底，成功永远绿字绿底。",
      en: "A status or alert where the border, the text, and the background are all one hue — and the background is just a see-through version of it. Error is red on red, warning is yellow on yellow, success is green on green, every time.",
    },
    why: {
      zh: "这是框架的条件反射：border-red-500、text-red-500、bg-red-500/10，盖到每一个状态上。没有一处是为配合你真正的界面调过的，整个框就是同一个刺眼的色，只是换了三种透明度。红黄绿是红绿灯，不是调色板；靠它，就是让颜色去干本该由布局和文字干的活。",
      en: "It's the framework reflex: border-red-500, text-red-500, bg-red-500/10, stamped on every state. Nothing was toned to sit next to your actual UI; the whole box is one loud hue at three opacities. And red/yellow/green is a traffic light, not a palette — leaning on it lets color do the work your layout and words should do.",
    },
    fix: {
      zh: "先用文字和字重说清状态：一个加粗的「错误」，比任何颜色都先被读到。真要上色，就用调色板里一个克制柔和的强调色，衬在中性底上。屏幕很少需要红黄绿三种灯同时亮。",
      en: "Carry the state in words and weight first: a bold ‘Error’ reads before any color does. If you color at all, use one muted, restrained accent from your own palette on a neutral surface — you rarely need three traffic-light hues on screen at once.",
    },
    detect: ["border-{c} text-{c} bg-{c}/10 status box", "red/yellow/green fixed to error/warn/success", "same-hue border, text, and tint background", "alert that's one hue at three opacities"],
    demo: "mono-hue-alert",
  },
  {
    id: "atmosphere-gradient",
    tier: 1,
    group: "color",
    title: { en: "Gradients as atmosphere", zh: "拿渐变当氛围" },
    what: {
      zh: "近黑的深蓝页面，顶部一团柔光，卡片背景也是渐变，上浅下深。这是「高级暗色模式」的出厂设定，每个表面都在营造气氛，没有一处是实心色。",
      en: "A near-black blue page with a soft glow up top, and cards whose surface is itself a gradient — lighter at the top, darker below. The default ‘premium dark mode’: every surface is mood, none is a flat color.",
    },
    why: {
      zh: "光晕和表面渐变都不带信息，也回答不了任何设计问题。这是模型让暗色界面显得高级时的固定动作，和一千个 AI 落地页背后那团带聚光灯的午夜蓝一样。一个你选定的实心背景，比一层想撑气氛的渐变更有底气。",
      en: "The glow and the surface gradients carry no information and answer no design question. It's the move a model makes to look premium in the dark — the same midnight blue with a spotlight behind a thousand AI landing pages. A flat background you chose reads as more sure of itself than a gradient reaching for atmosphere.",
    },
    fix: {
      zh: "选一个实心背景色，从头用到尾。表面的层次用一条细边框加克制的阴影，别用渐变。真要加光晕，就让它指向某个东西，而不是把背后所有空白都填满。",
      en: "Pick one flat background and hold it. Build depth on surfaces with a hairline and a restrained shadow, not a gradient. If a glow has to exist, let it point at something instead of filling the void behind everything.",
    },
    detect: ["radial-gradient page background", "dark navy + top spotlight glow", "linear-gradient on card/surface fill", "‘premium’ ambient glow behind everything", "gradient where a flat bg color would do"],
    demo: "atmosphere-gradient",
  },

  // ── Type ───────────────────────────────────────────────────────────────
  {
    id: "serif-emphasis",
    tier: 1,
    group: "type",
    title: { zh: "衬线斜体强调一个词", en: "Serif-italic on one word" },
    what: {
      zh: "在一句无衬线标题里，把某个词单独换成衬线斜体来「强调」。",
      en: "Swapping one word in a sans headline to serif italic for ‘emphasis’.",
    },
    why: {
      zh: "字体切换是一种廉价的戏剧感——它模仿「编辑感」，实际上只是在一句话里制造了两种声音的打架。这是当下最泛滥的 AI 标题套路。",
      en: "The font-swap is cheap drama. It cosplays ‘editorial’ while actually staging a fight between two voices in one sentence. It's the most viral AI headline tic right now.",
    },
    fix: {
      zh: "要强调，就用字重、位置或断行，让整句话保持一种嗓音。真需要斜体时，用同一字体家族的斜体。",
      en: "Emphasise with weight, position, or a line break, and keep one voice. If you truly need italic, use the same family's italic.",
    },
    detect: ["font-serif italic inside a sans <h1>", 'style="font-family: Georgia"', "<em> with a display serif"],
    demo: "serif-emphasis",
  },
  {
    id: "serif-body-misuse",
    tier: 1,
    group: "type",
    title: { zh: "该用无衬线的地方用衬线", en: "Serif where sans belongs" },
    what: {
      zh: "给开发者工具 / SaaS 落地页正文用 Playfair、Lora 这类展示衬线字体。",
      en: "A dev tool or SaaS page dressed in Playfair / Lora display serif for body copy.",
    },
    why: {
      zh: "模型把「高级」等同于「衬线」。但衬线在小字号、信息密集的界面里，既难读又跑题，就像给终端穿上了燕尾服。",
      en: "The model equates ‘premium’ with ‘serif’. Display serifs are hard to read at UI sizes and tonally off — a tuxedo on a terminal.",
    },
    fix: {
      zh: "界面正文用一款你选定的、好读的无衬线字体。衬线字体只在真的想要那种嗓音时、且是正文衬线时才用。",
      en: "One legible sans you actually chose for UI text. Reach for serif only when you want that voice — and use a text serif, not a display one.",
    },
    detect: ["font-family: 'Playfair Display'", "Lora / Cormorant on body", "serif on a dashboard"],
    demo: "serif-body-misuse",
  },
  {
    id: "decorative-text-lines",
    tier: 1,
    group: "type",
    title: { zh: "给文字划线、高亮当装饰", en: "Decorative strikes & highlights" },
    what: {
      zh: "划掉一个词、加下划线、刷高亮，不为删改，也不为标注，纯粹是当成装饰来强调。",
      en: "Striking out a word, underlining it, or swiping a highlighter over it — not to delete or annotate, just decorative ‘emphasis’.",
    },
    why: {
      zh: "和衬线强调、高亮关键词是同一个毛病：模型不信任文字本身能承载重点，于是往上画记号。划掉一个并没被删的词是在「耍酷」，下划线是假重点，高亮是荧光笔滥用。（这个网站的早期版本自己就犯了，首页标题上划了线、词上刷了高亮）",
      en: "The same disease as serif-emphasis and highlighted keywords: the model doesn't trust the words to carry weight, so it draws on them. A strike through a word that isn't being deleted is ‘edgy’; an underline is fake emphasis; a highlighter is highlighter abuse. (An early version of this very site did it, the hero was struck through and highlighted.)",
    },
    fix: {
      zh: "重点靠字重、字号、断行和句子结构。删除线只用在真的删改上，下划线留给链接，高亮留给真的标注——每种样式只在它该出现的时候才出现。",
      en: "Let weight, size, line breaks, and sentence structure carry emphasis. Keep strike-through for real edits, underline for links, highlight for real annotation; each only when it does a job.",
    },
    detect: ["text-decoration: line-through on non-deleted text", "<mark>/<u>/<s> for emphasis", "gradient/box-shadow ‘highlight’ under a heading"],
    demo: "decorative-text-lines",
  },

  // ── Copy ─────────────────────────────────────────────────────────────────
  {
    id: "highlighted-keywords",
    tier: 1,
    group: "copy",
    title: { zh: "介绍页里高亮关键词", en: "Highlighted keywords in copy" },
    what: {
      zh: "在段落中间把一堆词染成主题色或加粗，像荧光笔扫过一样。",
      en: "Coloring or bolding scattered words mid-paragraph, like a highlighter ran over it.",
    },
    why: {
      zh: "当每个词都被强调，就相当于没有词被强调。这是模型「不知道重点在哪，所以全标上」的视觉呈现。",
      en: "When every word is emphasised, none is. It's the visual signature of a model that doesn't know the point, so it marks everything.",
    },
    fix: {
      zh: "让句子结构承担重点。一段里最多一个强调，或者干脆不要。",
      en: "Let sentence structure carry emphasis. At most one accent per paragraph, or none.",
    },
    detect: ["<span class='text-primary'> mid-sentence", "multiple <mark> per paragraph", "font-semibold sprinkled in prose"],
    demo: "highlighted-keywords",
  },
  {
    id: "ai-copy-tics",
    tier: 1,
    group: "copy",
    title: { zh: "AI 文案腔", en: "The AI copywriting voice" },
    what: {
      zh: "「不只是 X——更是 Y」「告别 X」，还有那种三连短句排比、破折号成瘾。",
      en: "‘It's not just X — it's Y’, ‘Say goodbye to X’, punchy triads, and an em-dash habit.",
    },
    why: {
      zh: "这是生成文案的节奏指纹：结构永远对称、情绪永远高一度、信息永远含糊。读着顺，但什么都没说。",
      en: "It's the rhythmic fingerprint of generated copy: forever symmetrical, one notch too excited, and specifics-free. It scans well and says nothing.",
    },
    fix: {
      zh: "写具体的东西。用真实的数字、名词、后果。一个人会怎么跟另一个人解释，就怎么写。",
      en: "Write something specific: real numbers, nouns, consequences. Say it the way one person explains it to another.",
    },
    detect: ["“not just … it's …”", "“Say goodbye to …”", "three-word triads", "em-dash triplets"],
    demo: "ai-copy-tics",
  },
  {
    id: "emoji-everywhere",
    tier: 1,
    group: "copy",
    title: { zh: "emoji 泛滥", en: "Emoji everywhere" },
    what: {
      zh: "🚀 提速、⚡ 极快、🔒 安全、🎉 好用。",
      en: "An emoji stuck on every heading, button, and bullet point: 🚀 for launch, ⚡ for fast, 🔒 for secure, 🎉 for delight.",
    },
    why: {
      zh: "emoji 是一种廉价的亲和力。它取代了本该由文字和设计来传递的语气，让一个能读你邮件、跑你 shell 的产品，看起来像是在讨好你。每个要点前面加个图标并不会让它更清晰，只会更吵。",
      en: "Emoji are borrowed warmth. They stand in for tone that copy and design should carry, and make a product that reads your email and runs your shell feel like it's performing friendliness. A glyph before every point doesn't make it clearer, only louder.",
    },
    fix: {
      zh: "删掉产品界面里的装饰性 emoji；语气交给文字和布局。只在 emoji 确实携带信息时才保留（比如一个真实的状态）。",
      en: "Cut decorative emoji from the UI; let the words and layout set the tone. Keep an emoji only where it genuinely carries information — a real status, say.",
    },
    detect: ["emoji in headings / buttons", "🚀 / ✨ / ⚡ / 🎉 in product copy", "one emoji per bullet or feature"],
    demo: "emoji-everywhere",
  },

  // ── Components ─────────────────────────────────────────────────────────
  {
    id: "status-dot-glow",
    tier: 1,
    group: "component",
    title: { zh: "发光的状态圆点", en: "The glowing status dot" },
    what: {
      zh: "表示状态（在线／就绪／直播）的圆点，画成实心圆加一圈浅色光晕，通常还一直呼吸或脉冲，几乎永远是饱和绿。",
      en: "A status indicator (online / ready / live) drawn as a solid dot wrapped in a pale halo — usually pulsing, almost always saturated green.",
    },
    why: {
      zh: "状态本身只是极小的信号，光晕、脉冲、呼吸这些全是纯装饰，不携带任何信息。每个 AI 产品都冲你闪着「● 就绪」。把一个二元状态放大成一颗发光宝石，就是典型的过度设计。",
      en: "A status is a tiny signal — the halo, the pulse, the breathing glow carry no information, they're pure decoration. Every AI product blinks ‘● Ready’ at you. Inflating a binary state into a glowing gem is textbook overdesign.",
    },
    fix: {
      zh: "一个小小的单色圆点，配一句文字就够了。不要光晕，不要脉冲。只在状态确实重要、或确实会变化时才上色。",
      en: "A small, flat, single-color dot plus a word is enough. No halo, no pulse. Use color only when the state actually matters or actually changes.",
    },
    detect: ["glowing / pulsing status dot", "pale halo ring around a solid dot", "animate-ping or box-shadow glow on a ‘live’ dot", "saturated-green ‘● Ready / Online’ indicator"],
    demo: "status-dot-glow",
  },
  {
    id: "left-border-callout",
    tier: 1,
    group: "component",
    title: { zh: "圆角 + 彩色左边框卡片", en: "Rounded card, colored left border" },
    what: {
      zh: "每个列表项都套一个浅色圆角方块，左边加一条 4px 彩色竖条。不限于「提示/注意」，功能点、更新日志、任何列表都这么处理。",
      en: "Wrapping any list item in a pale rounded box with a 4px colored bar down the left. Not just a ‘Tip/Note’, but feature points, changelog rows, any list at all.",
    },
    why: {
      zh: "圆角 + 左侧彩条原本是文档里 admonition（旁注）的语义组件，结果被当成了万能装饰，什么列表项都往上套。每一条都看着像「重点提示」，真正的重点反而被淹没了。这套组合本身就是文档模板的默认样式。",
      en: "The rounded box with a left accent bar is a docs admonition — a real aside — turned into universal decoration and wrapped around every list item. Now every row looks like an ‘important note’, so none is; and the combo itself is just the docs-template default.",
    },
    fix: {
      zh: "列表就该是列表：靠对齐、间距和层级来呈现。旁注是稀缺资源，一页最多一两个，而且只在确实需要时才用。",
      en: "Let a list be a list — carried by alignment, spacing, and hierarchy. A callout is scarce: one or two a page, and only when it's genuinely an aside.",
    },
    detect: ["border-l-4 rounded-lg bg-*-50 on list items", "every row/card wearing a left accent bar", "admonition styling on plain lists"],
    demo: "left-border-callout",
  },
  {
    id: "pastel-icon-tiles",
    tier: 1,
    group: "component",
    title: { zh: "圆角方块图标砖", en: "Rounded-square icon tiles" },
    what: {
      zh: "每个功能配一个圆角方块背景 + 一个线性图标，整齐排成网格。",
      en: "Every feature gets a rounded-square chip with a line icon, tiled into a grid.",
    },
    why: {
      zh: "图标砖是「看起来像做了设计」的最快捷径。图标通常跟内容无关（一个齿轮、一道闪电、一个地球），纯粹为了占满格子。",
      en: "Icon tiles are the shortest path to ‘looks designed’. The icons rarely relate to the content — a gear, a bolt, a globe — they just fill the grid.",
    },
    fix: {
      zh: "图标要么承载信息，要么删掉。宁可用清楚的标题和一句话，也不要一排装饰图标。",
      en: "An icon should carry meaning or go. A clear label and one sentence beat a row of decorative glyphs.",
    },
    detect: ["grid of rounded-xl bg-*-100 icon chips", "lucide/heroicons one-per-feature", "icon square + h3 + one line ×6"],
    demo: "pastel-icon-tiles",
  },
  {
    id: "over-rounded-glass",
    tier: 1,
    group: "component",
    title: { zh: "过度圆角 + 毛玻璃", en: "Max radius + glassmorphism" },
    what: {
      zh: "所有东西都是大圆角胶囊，卡片全上 backdrop-blur 半透明毛玻璃。",
      en: "Everything is a max-radius pill; every card is a translucent backdrop-blur pane.",
    },
    why: {
      zh: "这是 2021 年 Dribbble 的冷冻切片。毛玻璃和满圆角是「效果预设」，套上就完事，跟产品要表达什么没关系。",
      en: "A frozen slice of 2021 Dribbble. Glass and full-round are effect presets you switch on, unrelated to what the product is trying to say.",
    },
    fix: {
      zh: "圆角统一选一个值，全站保持一致，通常小而克制。靠实心面和留白来制造层次，别用模糊。",
      en: "Pick one radius and hold it site-wide — usually small. Build depth with solid surfaces and space, not blur.",
    },
    detect: ["rounded-full on cards", "backdrop-blur bg-white/10 border-white/20", "radius mixed 4/12/24/9999px"],
    demo: "over-rounded-glass",
  },
  {
    id: "oversized-shadow",
    tier: 1,
    group: "component",
    title: { zh: "巨大的弥散阴影", en: "The oversized drop shadow" },
    what: {
      zh: "一张小卡片或图标，投出一大团柔软的阴影，向四周漫开、远超它本身：模糊度高、透明度低、几乎不带偏移，像悬在一团雾里。",
      en: "A small card or icon casting a huge, soft shadow that bleeds far past it on every side — big blur, low opacity, almost no offset, like it's floating in fog.",
    },
    why: {
      zh: "阴影本应表示一个表面浮在底层之上有多高：真实的光会落下一小片贴地的接触阴影，再加一层柔和的环境阴影，模糊程度随高度变化。但这团阴影什么都不表达——罩在按钮外面的和罩在 hero 卡片外面的是同一团雾。模型抓它，是因为一大片柔软的模糊在缩略图里像「有层次」「高级」，可它对应不上任何真实高度，也不带任何信息，是拿氛围冒充高度。于是每个元素都悬在自己那团诡异的云里。",
      en: "A shadow says how high a surface floats above the one under it: real light drops a tight contact shadow plus a soft ambient one, and the blur tracks the height. This shadow tracks nothing — the fog around a button is the same fog around a hero card. The model reaches for it because a big soft blur reads as ‘depth’ and ‘premium’ in a thumbnail, but it maps to no real height and carries no information: atmosphere standing in for elevation. So every element floats in its own uncanny cloud.",
    },
    fix: {
      zh: "阴影的本质是模拟高度，那就给它一套克制的高度刻度并守住：模糊要小、偏移要小、透明度要低，绝不让阴影比投出它的物体还大。很多时候一条细边框就能把层次分清楚，根本用不着阴影。真要用，就一层贴地的接触阴影垫一层克制的环境阴影，而且别上色——带色的光晕不是层次。",
      en: "A shadow models elevation, so give it a small elevation scale and hold it: tight blur, small offset, low opacity, and never a shadow bigger than the thing casting it. Often a hairline border does the separating and you need no shadow at all. If you do, layer a 1px contact shadow under one restrained ambient shadow — and keep it colorless; a tinted glow is not depth.",
    },
    detect: [
      "box-shadow blur ≥ 40px on a small element",
      "0 30px 80px / 0 40px 120px soft drop",
      "filter: drop-shadow(0 0 60px …)",
      "big-blur, low-opacity shadow as ‘depth’",
      "shadow larger than the element casting it",
    ],
    demo: "oversized-shadow",
  },
  {
    id: "nested-radius",
    tier: 1,
    group: "component",
    title: { en: "Corners that don't nest", zh: "对不齐的嵌套圆角" },
    what: {
      zh: "把同一个圆角值套用在每一层：外框是大圆角，里面的框也是同样的大圆角，导致嵌套的角对不齐，内圈和外圈的弧在每个角上都别扭地冲突。",
      en: "The same radius on every layer: a big-radius outer box with an inner box at the same big radius, so the corners don't sit concentrically; the inner arc fights the outer one at every corner.",
    },
    why: {
      zh: "嵌套圆角的规则是：内圈半径 = 外圈半径 − 间距，这样两条弧线才能平行。AI 生成的界面跳过了这一步，给所有元素套上同一个圆角 token，结果嵌套的角永远对不齐。这就是「圆角是默认来的，不是量出来的」的痕迹。",
      en: "Nested corners have a rule: the inner radius should equal the outer radius minus the gap between them, so the two arcs stay parallel. AI-generated UIs skip the math and stamp one radius token on everything, so nested corners never line up. It's the fingerprint of a radius that was defaulted, not measured.",
    },
    fix: {
      zh: "算嵌套圆角：内 = 外 − 内边距。或者干脆不给内层加圆角。用一套小而克制的圆角刻度，让每个角与父级同心。",
      en: "Compute the nested radius: inner = outer − padding. Or don't round the inner element at all. Keep a small, deliberate radius scale and let every corner sit concentric with its parent.",
    },
    detect: ["same rounded-* on nested containers", "inner radius ≥ outer radius", "border-radius not adjusted for padding", "concentric radius mismatch"],
    demo: "nested-radius",
  },
  {
    id: "badge-spam",
    tier: 1,
    group: "component",
    title: { zh: "徽章 / 药丸标签泛滥", en: "Badge and pill spam" },
    what: {
      zh: "「✨ New」「β Beta」「🔥 Popular」，到处是装饰性的小圆角标签。",
      en: "‘✨ New’, ‘β Beta’, ‘🔥 Popular’ — decorative little pills everywhere.",
    },
    why: {
      zh: "徽章本该标记状态，现在却被用来制造「热闹」和「可信」的假象。数量一多，每个都失去了信号价值。",
      en: "Badges should mark status; here they manufacture a fake sense of buzz and credibility. In bulk, each one stops meaning anything.",
    },
    fix: {
      zh: "只在真正表达状态时用徽章（比如版本、库存）。营销氛围不需要药丸。",
      en: "Use a badge only for real status (a version, stock). Marketing mood doesn't need pills.",
    },
    detect: ["rounded-full bg-*-100 text-*-700 badge", "emoji + label pills", "‘Beta/New/Hot’ tags in chrome"],
    demo: "badge-spam",
  },
  {
    id: "ai-svg-icon",
    tier: 1,
    group: "component",
    title: { en: "AI-drawn SVG icons", zh: "AI 生成的 SVG 图标" },
    what: {
      zh: "让模型「画个图标」，再把它给的东西直接用上：一个圆滚滚的色块加两颗点眼睛，一个用基本图形拼出来的小怪物，一个只是圆角方块加张脸的 logo。这种矢量图机器本来就画不好，却被拿去当了产品的标识。",
      en: "Asking a model to ‘draw an icon’ and shipping whatever comes back: a round blob with two dot eyes, a mascot built from primitive shapes, a logo that's a rounded square with a face. Vector art the machine can't really draw, used as the product's mark.",
    },
    why: {
      zh: "模型没有手，也不知道你的产品是什么，它画出的 SVG 只是对「可爱图标」的一次猜测：比例失衡、路径歪扭，一个放在哪儿都行的通用小怪物。它看起来就像一直没换掉的占位图。图标是产品给人的第一印象，不该是这么一张。",
      en: "A model has no hand and no idea what your product is, so its SVG is a guess at ‘cute icon’: off proportions, wobbly paths, a generic creature that could belong to anything. It looks like placeholder art that never got replaced. The icon is a product's first impression; it shouldn't be this.",
    },
    fix: {
      zh: "用一个真正的、高质量的图标：找设计师做，或者用最好的生图模型生成一个，再打磨到干净、贴合品牌为止。让模型随手画的粗糙 SVG，或者退而求其次摆一个首字母，都配不上产品的标识。",
      en: "Get a real, high-quality icon. Commission a designer, or generate one with the best image model and refine it until it's crisp and on brand. A crude SVG the model sketched, or a bare fallback letter, isn't a mark worth shipping.",
    },
    detect: ["hand-generated <svg> blob/mascot", "primitive shapes + dot eyes as a logo", "generic cartoon-creature app icon", "AI-drawn vector art shipped as the mark"],
    demo: "ai-svg-icon",
  },
  {
    id: "tinted-icon-tile",
    tier: 1,
    group: "component",
    title: { en: "Icon in a tint of itself", zh: "图标套一层同色半透明底" },
    what: {
      zh: "每个图标都放进一个圆角方块里，方块底色取图标颜色的半透明版：蓝图标配淡蓝，绿图标配淡绿。这就是默认的「图标容器」：text-{color} 图标加上一层 bg-{color}/10。",
      en: "Every icon gets wrapped in a rounded square filled with a see-through tint of the icon's own color — a blue icon on faint blue, a green one on faint green. The default ‘icon container’: bg-{color}/10 behind text-{color}.",
    },
    why: {
      zh: "这是随手一行的条件反射，不是决定：加内边距、加圆角、刷上图标颜色的 10%。方块和这层色都不带信息，图标本来就已经是图标了。每个字形都这么包一层，一页就变成一格格柔和的彩色方块。半透明是为了显得「柔和、现代」，又不必真的定下一个表面色。",
      en: "It's a one-line reflex, not a decision: pad it, round it, wash it in 10% of the icon's hue. The tile and the tint carry no information — the icon was already an icon. Wrap every glyph this way and the page becomes a grid of soft colored squares. The transparency is there to look ‘soft and modern’ without committing to a real surface color.",
    },
    fix: {
      zh: "让图标回归图标：继承文字颜色，不要容器。如果真需要容器（比如一个真正的按钮），就给它一个从调色板里选定的实心表面色，而不是一层跟图标同色的半透明底。",
      en: "Let an icon just be an icon: inherit the text color, no container. If something genuinely needs a container — a real button — give it one deliberate, opaque surface from your palette, not a see-through tint of the icon it holds.",
    },
    detect: ["bg-{color}-500/10 behind text-{color}-500 icon", "rounded tile tinted to match the icon", "translucent same-hue icon container", "every glyph wrapped in a soft colored square"],
    demo: "tinted-icon-tile",
  },
  // ── Layout ─────────────────────────────────────────────────────────────
  {
    id: "feature-grid",
    tier: 1,
    group: "layout",
    title: { zh: "全大写卡片网格", en: "The all-caps card grid" },
    what: {
      zh: "全大写标签加一个数字/图标，复制成一排排一模一样的卡片：功能网格、仪表盘指标卡都是它。",
      en: "An ALL-CAPS label plus a number or icon, copied into rows of interchangeable cards: feature grids and dashboard stat-cards alike.",
    },
    why: {
      zh: "它假装信息有结构，其实只是把一堆不相关的东西塞进同样的盒子里，凑满一屏。全大写的小标签，是「看起来做过设计」的默认套路。",
      en: "It fakes structure while stuffing unrelated things into identical boxes to fill the screen. The ALL-CAPS micro-label is the default costume for ‘looks designed’.",
    },
    fix: {
      zh: "先想清楚最重要的一件事，把它讲透。真要并列，就用真正的层级和对比，而不是一网格等权重的卡片。",
      en: "Decide the single most important thing and show it fully. If you must list, use real hierarchy and contrast, not a grid of equal-weight cards.",
    },
    detect: ["grid-cols-3 gap-8 cards", "UPPERCASE label + number ×6", "dashboard stat-card grid"],
    demo: "feature-grid",
  },

  // ── Evolved slop ─────────────────────────────────────────────────────────
  {
    id: "tasteful-terminal",
    tier: 2,
    group: "evolved",
    title: { zh: "「优雅终端」新型 slop", en: "The ‘tasteful terminal’" },
    what: {
      zh: "全站等宽字体、近黑背景、单一暖色点缀、ASCII 艺术，一种「看过 Vercel 博客的 AI」审美。",
      en: "Mono everywhere, a near-black background, one warm accent, ASCII art: the look of ‘an AI that read one Vercel blog post’.",
    },
    why: {
      zh: "它不难看，恰恰因为好看成了新的默认。当「黑客感终端风」变成一键套用的模板，它就和当年的蓝紫渐变一样，是在回避设计决策，只是换了件更潮的外套。",
      en: "It isn't ugly, that's the trap; it's polished enough to have become the new default. Once ‘hacker terminal’ is a one-click template, it dodges the design decision exactly like the indigo gradient did, just in cooler clothing.",
    },
    fix: {
      zh: "等宽字体留给代码，别拿来当界面外壳。ASCII 艺术、终端隐喻，只有为产品服务才值得用。真正的品味，是你的选择能被解释，而不是套了当下最安全的模板。",
      en: "Keep monospace for code, not as UI chrome. Use ASCII art and terminal metaphors only where they serve the product. Real taste is a choice you can explain, not reaching for this season's safest template.",
    },
    detect: ["mono font on all UI chrome", "ASCII-art hero banner", "near-black + single warm accent", "everything looks like a CLI"],
    demo: "tasteful-terminal",
  },
];

// Merge in the Japanese/Korean translations (kept in a separate file so the
// whole translation for a language is one isolated, reviewable block). English
// stays the fallback for anything not yet translated.
import { i18n } from "./catalogue.i18n";

const TEXT_FIELDS = ["title", "what", "why", "fix"] as const;

export const catalogue: Entry[] = rawEntries.map((e, i) => {
  const entry: Entry = { ...e, n: i + 1 };
  const t = i18n[e.id];
  if (t) {
    for (const f of TEXT_FIELDS) {
      if (t.ja?.[f]) entry[f] = { ...entry[f], ja: t.ja[f] };
      if (t.ko?.[f]) entry[f] = { ...entry[f], ko: t.ko[f] };
    }
  }
  return entry;
});

export const tierNote: Record<1 | 2, Bi> = {
  1: { en: "Classic slop", zh: "经典 slop", ja: "定番の slop", ko: "클래식 slop" },
  2: { en: "Evolved slop", zh: "进化型 slop", ja: "進化型 slop", ko: "진화형 slop" },
};
