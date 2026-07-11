/*
  Before → after demos. Each entry rebuilds a slop tell in plain HTML (`before`)
  and its clean counterpart (`after`). Styles live in styles/demos.css, scoped
  under `.demo-<id>`. Demo copy is illustrative and kept short/neutral.

  The `after` panes are held to the same rules the site and skill enforce:
  one accent, no gradient chrome, hierarchy from scale + space, mono for code
  only, no decorative emoji/badges.
*/

export const demos: Record<string, { before: string; after: string }> = {
  "status-dot-glow": {
    before: `<div class="scene slop">
        <span class="pill"><i class="live"></i>Where modern teams plan work</span>
      </div>`,
    after: `<div class="scene clean">
        <p class="tag">Where modern teams plan work</p>
      </div>`,
  },

  "indigo-violet-gradient": {
    before: `
      <div class="card slop-grad">
        <p class="ey">✨ AI-POWERED</p>
        <h5>Deploys on git push</h5>
        <p class="sub">Connect a repo; every commit to main ships.</p>
        <button class="btn grad">Get started →</button>
      </div>`,
    after: `
      <div class="card clean">
        <p class="ey">Continuous deploy</p>
        <h5>Deploys on git push</h5>
        <p class="sub">Connect a repo; every commit to main ships.</p>
        <button class="btn solid">Get started</button>
      </div>`,
  },

  "gradient-text": {
    before: `<h5 class="grad-head">Your changelog, automated</h5>
      <p class="sub">It writes release notes from merged PRs.</p>`,
    after: `<h5 class="solid-head">Your changelog, automated</h5>
      <p class="sub">It writes release notes from merged PRs.</p>`,
  },

  "warm-cozy-palette": {
    before: `
      <div class="card amber">
        <span class="tile">◐</span>
        <h5>Your cozy workspace</h5>
        <p class="sub">Warm, friendly, and human.</p>
        <button class="btn amber-btn">Start cooking</button>
      </div>`,
    after: `
      <div class="card neutral">
        <span class="dot"></span>
        <h5>Your workspace</h5>
        <p class="sub">Opens with a hotkey, syncs in the background.</p>
        <button class="btn solid">Open workspace</button>
      </div>`,
  },

  "default-semantic-palette": {
    before: `<div class="sem sem-slop">
        <span class="c info">Info</span>
        <span class="c success">Success</span>
        <span class="c warning">Warning</span>
        <span class="c error">Error</span>
        <span class="c new">New</span>
      </div>`,
    after: `<div class="sem sem-clean">
        <span class="c"><i class="d"></i>Info</span>
        <span class="c"><i class="d warn"></i>Warning</span>
        <span class="c"><i class="d"></i>New</span>
        <span class="c"><i class="d ok"></i>Success</span>
        <span class="c"><i class="d err"></i>Error</span>
      </div>`,
  },

  "serif-emphasis": {
    before: `<h5 class="mix">Opens in <em>200ms</em>, not 2 seconds.</h5>`,
    after: `<h5 class="one">Opens in <b>200ms</b>, not 2 seconds.</h5>`,
  },

  "serif-body-misuse": {
    before: `
      <div class="panel serif">
        <div class="row"><span>Monthly revenue</span><b>$48,210</b></div>
        <div class="row"><span>Active users</span><b>1,204</b></div>
        <div class="row"><span>Churn</span><b>2.1%</b></div>
      </div>`,
    after: `
      <div class="panel sans">
        <div class="row"><span>Monthly revenue</span><b>$48,210</b></div>
        <div class="row"><span>Active users</span><b>1,204</b></div>
        <div class="row"><span>Churn</span><b>2.1%</b></div>
      </div>`,
  },

  "decorative-text-lines": {
    before: `<h5 class="dl-slop">The <s>last</s> editor you'll <u>ever</u> <mark>need</mark>.</h5>`,
    after: `<h5 class="dl-clean">A fast, keyboard-first editor.</h5>`,
  },

  "highlighted-keywords": {
    before: `<p class="para hl">Our <span>revolutionary</span> platform helps
      <span>ambitious</span> teams move <span>faster</span> with
      <span>AI-native</span> workflows built for <span>scale</span>.</p>`,
    after: `<p class="para">A project tracker for engineering teams.
      It syncs with GitHub and updates issues from your commits — no manual
      status changes.</p>`,
  },

  "ai-copy-tics": {
    before: `<div class="copyblock tics">
        <p>It's not just an editor — it's a movement.</p>
        <p>Say goodbye to friction. Hello to flow.</p>
        <p>Fast. Beautiful. Yours.</p>
      </div>`,
    after: `<div class="copyblock plain">
        <p>A code editor. It opens in under a second and uses about half the
        memory of Electron-based editors.</p>
        <p>Written in Rust, free while in beta.</p>
      </div>`,
  },

  "emoji-everywhere": {
    before: `<div class="list emoji">
        <p class="h">🚀 Why you'll love it</p>
        <ul>
          <li>⚡ Blazing fast performance</li>
          <li>🔒 Secure by default</li>
          <li>🎉 Delightful to use</li>
        </ul>
      </div>`,
    after: `<div class="list plain">
        <p class="h">Why teams pick it</p>
        <ul>
          <li>Cold start under 200&thinsp;ms</li>
          <li>Encrypted at rest, no config</li>
          <li>Keyboard-first, no mouse needed</li>
        </ul>
      </div>`,
  },

  "left-border-callout": {
    before: `<div class="calls">
        <div class="call c1"><b>Fast</b> Cold start in 200&thinsp;ms.</div>
        <div class="call c2"><b>Secure</b> Encrypted at rest.</div>
        <div class="call c3"><b>Flexible</b> Works with your stack.</div>
        <div class="call c4"><b>Open</b> MIT-licensed.</div>
      </div>`,
    after: `<ul class="plainlist">
        <li><b>Fast.</b> Cold start in 200&thinsp;ms.</li>
        <li><b>Secure.</b> Encrypted at rest.</li>
        <li><b>Flexible.</b> Works with your stack.</li>
        <li><b>Open.</b> MIT-licensed.</li>
      </ul>`,
  },

  "pastel-icon-tiles": {
    before: `<div class="tiles">
        <div class="feat"><span class="ic i1">◆</span><b>Fast</b><span>Lightning quick.</span></div>
        <div class="feat"><span class="ic i2">◇</span><b>Secure</b><span>Safe by design.</span></div>
        <div class="feat"><span class="ic i3">○</span><b>Simple</b><span>Easy to use.</span></div>
      </div>`,
    after: `<ul class="plainfeat">
        <li><b>Fast</b> — cold start in 180&thinsp;ms, measured on a 2020 laptop.</li>
        <li><b>Secure</b> — data encrypted at rest with a key only you hold.</li>
        <li><b>Simple</b> — one binary, no config file, no account.</li>
      </ul>`,
  },

  "over-rounded-glass": {
    before: `<div class="glassbg">
        <div class="glass">
          <h5>Pro plan</h5>
          <p class="sub">Everything, unlocked.</p>
          <button class="pill">Upgrade now</button>
        </div>
      </div>`,
    after: `<div class="flatbg">
        <div class="flat">
          <h5>Pro plan</h5>
          <p class="sub">Unlimited projects and history.</p>
          <button class="btn solid">Upgrade — $8/mo</button>
        </div>
      </div>`,
  },

  "oversized-shadow": {
    before: `<div class="sha slop">
        <div class="card">
          <p class="h">Panel</p>
          <p class="s">a room-sized shadow, floating in fog</p>
        </div>
      </div>`,
    after: `<div class="sha clean">
        <div class="card">
          <p class="h">Panel</p>
          <p class="s">a hairline and a tight contact shadow</p>
        </div>
      </div>`,
  },

  "badge-spam": {
    before: `<div class="titlebar spam">
        <h5>Dashboard</h5>
        <span class="pill p1">✨ New</span>
        <span class="pill p2">🔥 Popular</span>
        <span class="pill p3">β Beta</span>
        <span class="pill p4">PRO</span>
      </div>`,
    after: `<div class="titlebar tidy">
        <h5>Dashboard</h5>
        <span class="ver">v2.1</span>
      </div>`,
  },

  "feature-grid": {
    before: `<div class="fgrid">
        <div class="fc"><span class="ic">◆</span><b>FAST</b><span>Very fast.</span></div>
        <div class="fc"><span class="ic">◇</span><b>SECURE</b><span>Very safe.</span></div>
        <div class="fc"><span class="ic">○</span><b>SIMPLE</b><span>Very easy.</span></div>
        <div class="fc"><span class="ic">△</span><b>SCALABLE</b><span>Grows with you.</span></div>
        <div class="fc"><span class="ic">□</span><b>FLEXIBLE</b><span>Your way.</span></div>
        <div class="fc"><span class="ic">▽</span><b>SMART</b><span>AI inside.</span></div>
      </div>`,
    after: `<div class="onepoint">
        <p class="lead">It replaces your standups.</p>
        <p class="body">Every morning it reads yesterday's commits and PRs and
        writes the team a three-line summary. No meeting, no form to fill.</p>
      </div>`,
  },


  "nested-radius": {
    before: `<div class="rc slop">
        <div class="outer"><div class="inner"><span>nested block</span></div></div>
        <p class="cap">inner 18px inside outer 18px — corners fight</p>
      </div>`,
    after: `<div class="rc clean">
        <div class="outer"><div class="inner"><span>nested block</span></div></div>
        <p class="cap">inner 7px = 18px − 11px gap — concentric</p>
      </div>`,
  },

  /* An original "premium dark SaaS" overview panel — the atmosphere-gradient
     tell applied to our own invented UI (not a clone of any real product): a
     glowing near-black page holding a glass card whose surface is a top-lighter
     gradient, with gradient stat tiles, a gradient bar chart, a glassy segmented
     control, and a glowing gradient CTA. before wears the whole atmosphere;
     after keeps the identical layout but flattens every surface to Linear's real
     dark stack (flat page, flat card, hairline + tight shadow, one accent). */
  "atmosphere-gradient": {
    before: `<div class="page slop">
        <div class="card">
          <div class="chead">
            <div class="htxt">
              <p class="ttl">Overview</p>
              <p class="csub">Last 30 days</p>
            </div>
            <div class="seg">
              <span>7d</span><span>30d</span><span class="on">90d</span>
            </div>
          </div>
          <div class="tiles">
            <div class="tile">
              <p class="tl">Revenue</p>
              <p class="tv">$48.2k</p>
              <span class="delta">▲ 12.4%</span>
            </div>
            <div class="tile">
              <p class="tl">Active users</p>
              <p class="tv">3,914</p>
              <span class="delta">▲ 5.1%</span>
            </div>
          </div>
          <div class="chart">
            <i style="--h:34%"></i><i style="--h:52%"></i><i style="--h:41%"></i><i style="--h:68%"></i><i style="--h:55%"></i><i style="--h:84%" class="hi"></i><i style="--h:63%"></i>
          </div>
          <div class="cfoot">
            <span class="upd">Updated 2m ago</span>
            <button class="btn">Export report</button>
          </div>
        </div>
      </div>`,
    after: `<div class="page clean">
        <div class="card">
          <div class="chead">
            <div class="htxt">
              <p class="ttl">Overview</p>
              <p class="csub">Last 30 days</p>
            </div>
            <div class="seg">
              <span>7d</span><span>30d</span><span class="on">90d</span>
            </div>
          </div>
          <div class="tiles">
            <div class="tile">
              <p class="tl">Revenue</p>
              <p class="tv">$48.2k</p>
              <span class="delta">▲ 12.4%</span>
            </div>
            <div class="tile">
              <p class="tl">Active users</p>
              <p class="tv">3,914</p>
              <span class="delta">▲ 5.1%</span>
            </div>
          </div>
          <div class="chart">
            <i style="--h:34%"></i><i style="--h:52%"></i><i style="--h:41%"></i><i style="--h:68%"></i><i style="--h:55%"></i><i style="--h:84%" class="hi"></i><i style="--h:63%"></i>
          </div>
          <div class="cfoot">
            <span class="upd">Updated 2m ago</span>
            <button class="btn">Export report</button>
          </div>
        </div>
      </div>`,
  },

  "ai-svg-icon": {
    before: `<div class="ic slop">
        <div class="tile">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 12 C47 12 54 23 51 39 C49 50 43 55 32 55 C21 55 15 49 13 38 C10 23 18 12 32 12 Z" fill="#eb4d4d"/>
            <circle cx="25.5" cy="33" r="3.4" fill="#141414"/>
            <circle cx="39" cy="33" r="3.4" fill="#141414"/>
            <ellipse cx="24" cy="55" rx="4.5" ry="3.2" fill="#c53d3d"/>
            <ellipse cx="40" cy="55" rx="4.5" ry="3.2" fill="#c53d3d"/>
          </svg>
        </div>
        <p class="cap">generated blob mascot</p>
      </div>`,
    after: `<div class="ic clean">
        <img class="shot" src="/demo/clean-icon.png" alt="" width="78" height="78" decoding="async" />
        <p class="cap">designed, or generated with care</p>
      </div>`,
  },

  "tinted-icon-tile": {
    before: `<div class="icons slop">
        <span class="ib b"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.6a1 1 0 0 1 .8-.4h6a1 1 0 0 1 .8.4L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.3"/></svg></span>
        <span class="ib g"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 4 14h6l-1 7 9-11h-6z"/></svg></span>
        <span class="ib a"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
      </div>`,
    after: `<div class="icons clean">
        <span class="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.6a1 1 0 0 1 .8-.4h6a1 1 0 0 1 .8.4L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.3"/></svg></span>
        <span class="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 4 14h6l-1 7 9-11h-6z"/></svg></span>
        <span class="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
      </div>`,
  },

  "mono-hue-alert": {
    before: `<div class="alerts slop">
        <div class="al err">Relay connection closed (4401)</div>
        <div class="al warn">Relay needs a valid account token</div>
        <div class="al ok">✓ Installed</div>
      </div>`,
    after: `<div class="alerts clean">
        <div class="al"><i class="d err"></i><span><b>Error.</b> Relay connection closed (4401)</span></div>
        <div class="al"><i class="d warn"></i><span><b>Warning.</b> Relay needs a valid account token</span></div>
        <div class="al"><i class="d ok"></i><span><b>Installed</b></span></div>
      </div>`,
  },

  /* Three invented marketing sections, each wearing a tracked-uppercase kicker
     that just restates its heading — the least defensible form of the tell.
     after: the same sections carried by the headings alone. */
  "section-kicker": {
    before: `<div class="secs slop">
        <div class="sec"><p class="kick">✦ Features</p><p class="hd">What it does</p><p class="bd">Reads your diff and drafts review comments.</p></div>
        <div class="sec"><p class="kick">✦ Testimonials</p><p class="hd">What users say</p><p class="bd">“It halved our review queue.”</p></div>
        <div class="sec"><p class="kick">✦ Pricing</p><p class="hd">What it costs</p><p class="bd">$8 per seat. Free for open source.</p></div>
      </div>`,
    after: `<div class="secs clean">
        <div class="sec"><p class="hd">What it does</p><p class="bd">Reads your diff and drafts review comments.</p></div>
        <div class="sec"><p class="hd">What users say</p><p class="bd">“It halved our review queue.”</p></div>
        <div class="sec"><p class="hd">What it costs</p><p class="bd">$8 per seat. Free for open source.</p></div>
      </div>`,
  },

  /* An invented on-call product. before: the whole vague pitch at display size,
     tracking crushed, filling the pane. after: the point in three words, the
     specifics at body size. */
  "oversized-hero-headline": {
    before: `<div class="hero slop">
        <h5 class="big">We help modern teams resolve incidents faster than ever before</h5>
      </div>`,
    after: `<div class="hero clean">
        <h5>Pages the right engineer</h5>
        <p class="sub">It maps alerts to code owners and routes each incident to whoever shipped the change.</p>
      </div>`,
  },

  /* Identical cards; only the motion differs. before: transition-all with an
     overshoot bezier — grows, lifts, casts a bigger shadow (and idles with a
     periodic bounce so the tell reads without a pointer). after: the surface
     answers in 140ms and nothing moves. */
  "springy-hover": {
    before: `<div class="hv slop">
        <div class="jcard"><p class="h">Changelog</p><p class="s">What shipped this week</p></div>
        <p class="cap">hover — it jumps at you</p>
      </div>`,
    after: `<div class="hv clean">
        <div class="jcard"><p class="h">Changelog</p><p class="s">What shipped this week</p></div>
        <p class="cap">hover — the surface answers, nothing moves</p>
      </div>`,
  },

  "fake-stat-trio": {
    before: `<div class="stats slop">
        <div class="st"><b>10k+</b><span>Developers</span></div>
        <div class="st"><b>99.9%</b><span>Uptime</span></div>
        <div class="st"><b>24/7</b><span>Support</span></div>
      </div>`,
    after: `<div class="stats clean">
        <p class="real"><b>1,847</b> CI runs yesterday, median 3m 12s — from the public status page.</p>
      </div>`,
  },

  /* before: ghost ordinals stapled to unordered marketing nouns. after: numbers
     where the order is real — the actual setup sequence. */
  "numbered-sections": {
    before: `<div class="nums slop">
        <div class="sec"><span class="no">01</span><div><p class="hd">Collaborate</p><p class="bd">Work together in real time.</p></div></div>
        <div class="sec"><span class="no">02</span><div><p class="hd">Innovate</p><p class="bd">Move fast, break nothing.</p></div></div>
        <div class="sec"><span class="no">03</span><div><p class="hd">Scale</p><p class="bd">Grow without limits.</p></div></div>
      </div>`,
    after: `<div class="nums clean">
        <p class="hd">Set up in three steps</p>
        <ol>
          <li><code>brew install relay</code></li>
          <li><code>relay init</code> in your repo</li>
          <li>Push — every PR gets a preview</li>
        </ol>
      </div>`,
  },

  /* A billing panel. before: three surfaces deep, each with its own border,
     radius, shadow, and shrinking padding. after: one surface; rows separated
     by hairlines. */
  "nested-cards": {
    before: `<div class="nest slop">
        <div class="c1"><p class="t">Billing</p>
          <div class="c2"><p class="t">Current plan</p>
            <div class="c3"><p class="t">Pro — $8/mo</p><p class="s">Renews May 3</p></div>
          </div>
        </div>
      </div>`,
    after: `<div class="nest clean">
        <div class="c1"><p class="t">Billing</p>
          <div class="row"><span>Plan</span><b>Pro — $8/mo</b></div>
          <div class="row"><span>Renews</span><b>May 3</b></div>
        </div>
      </div>`,
  },

  /* A usage panel, same three facts twice. before: title, rows, and meta all
     within a pixel of each other, hierarchy left to gray. after: someone
     decided what matters — one number big, the rest demoted. */
  "flat-type-hierarchy": {
    before: `<div class="fth slop">
        <p class="a">Usage this month</p>
        <p class="b">API calls: 48,210 (+12% vs May)</p>
        <p class="b">Bandwidth: 1.9 TB of 4 TB used</p>
        <p class="b">Next invoice: $86 on Aug 1</p>
      </div>`,
    after: `<div class="fth clean">
        <p class="lbl">API calls this month</p>
        <p class="num">48,210</p>
        <p class="meta">+12% vs May · 1.9 TB bandwidth · next invoice $86 on Aug 1</p>
      </div>`,
  },

  /* A settings panel, same rows twice. before: one grid gap for everything, so
     "Danger zone" floats exactly as close to the previous group's email row as
     to its own row. after: headings hug their rows; groups pushed apart. */
  "monotone-spacing": {
    before: `<div class="msp slop">
        <p class="h">Profile</p>
        <p class="r">Name — Sasha Ito</p>
        <p class="r">Email — sasha@relay.dev</p>
        <p class="h">Danger zone</p>
        <p class="r">Delete workspace — removes all data</p>
      </div>`,
    after: `<div class="msp clean">
        <div class="grp">
          <p class="h">Profile</p>
          <p class="r">Name — Sasha Ito</p>
          <p class="r">Email — sasha@relay.dev</p>
        </div>
        <div class="grp">
          <p class="h">Danger zone</p>
          <p class="r">Delete workspace — removes all data</p>
        </div>
      </div>`,
  },

  /* Font choices shown as the tokens that encode them: the stock pairing vs a
     stack with a reason attached (this site's own choice — yours may differ). */
  "overused-font": {
    before: `<div class="ff slop">
        <pre><code>--font-display: "Space Grotesk";
--font-body: "Inter";</code></pre>
        <p class="cap">the pairing on every AI page</p>
      </div>`,
    after: `<div class="ff clean">
        <pre><code>/* a tool should dress like the OS */
--font: ui-sans-serif, system-ui;</code></pre>
        <p class="cap">chosen for a reason — yours may differ</p>
      </div>`,
  },

  "tasteful-terminal": {
    before: `<div class="term">
        <pre class="ascii">  /\\_/\\    ___ _ __
 ( o.o )   $ open source</pre>
        <p class="ey">$ OPEN&thinsp;·&thinsp;SOURCE&thinsp;·&thinsp;RUNS&thinsp;LOCAL</p>
        <p class="hh">A_local-first_task_runner</p>
        <div class="btns"><span>$ get started</span><span>$ read docs</span></div>
      </div>`,
    after: `<div class="designed">
        <p class="ey">Open source · runs locally</p>
        <h5>A local-first task runner</h5>
        <p class="sub">No account, works offline. Your data never leaves the machine.</p>
        <div class="btns"><button class="btn solid">Get started</button><code>brew install runner</code></div>
      </div>`,
  },
};
