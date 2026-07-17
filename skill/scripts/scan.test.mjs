import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = join(dirname(fileURLToPath(import.meta.url)), "scan.mjs");

function withTempProject(run) {
  const project = mkdtempSync(join(tmpdir(), "kill-ai-slop-"));
  try {
    return run(project);
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
}

function scan(root, ...args) {
  return spawnSync(process.execPath, [scriptPath, root, ...args], {
    encoding: "utf8",
  });
}

function reportFor(root) {
  const result = scan(root, "--json");
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

function finding(report, id) {
  return report.findings.find((entry) => entry.id === id);
}

test("rejects a missing scan root instead of reporting a clean scan", () => {
  withTempProject((project) => {
    const control = "\u001b]52;c;not-a-clipboard\u0007";
    const result = scan(join(project, `missing-${control}`), "--json");
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Scan root must be an existing directory/);
    assert.equal(result.stderr.includes(control), false);
    assert.ok(result.stderr.includes("\\x1b]52;c;not-a-clipboard\\x07"));
    assert.equal(result.stdout, "");

    const file = join(project, "source.css");
    writeFileSync(file, "");
    const fileResult = scan(file, "--json");
    assert.notEqual(fileResult.status, 0);
    assert.match(fileResult.stderr, /Scan root must be an existing directory/);
  });
});

test("finds multiline patterns and documented runtime signals", () => {
  withTempProject((project) => {
    writeFileSync(
      join(project, "signals.tsx"),
      `<div className="from-indigo-500\n  to-violet-600" />\n<p>not just fast — it’s reliable</p>\n`,
    );
    writeFileSync(join(project, "Page.mdx"), `<div className="bg-clip-text text-transparent" />\n`);
    writeFileSync(
      join(project, "signals.css"),
      `.wash { background: bg-gradient-to-br from-emerald-500/10; }\n` +
        `.glow { box-shadow: 0 0 1rem #6366f1; }\n` +
        `.kicker { text-transform: uppercase; letter-spacing: 0.1em; }\n` +
        `.panel { transition: width 200ms ease; }\n` +
        `.steps::before { content: "step one"; }\n` +
        `.body { font-family: Geist, sans-serif; }\n`,
    );

    const report = reportFor(project);
    assert.equal(finding(report, "01")?.hits[0].line, 1);
    for (const id of ["02", "06", "10", "14", "26", "29", "32"]) {
      assert.ok(finding(report, id), `expected tell ${id} to be detected`);
    }
  });
});

test("skips the installed skill's own files", () => {
  withTempProject((project) => {
    const installedScript = join(
      project,
      ".claude",
      "skills",
      "kill-ai-slop",
      "scripts",
      "scan.mjs",
    );
    mkdirSync(dirname(installedScript), { recursive: true });
    copyFileSync(scriptPath, installedScript);

    const result = spawnSync(process.execPath, [installedScript, project, "--json"], {
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).filesScanned, 0);
  });
});

test("scans PHP and Twig templates", () => {
  withTempProject((project) => {
    writeFileSync(
      join(project, "header.php"),
      `<h1 class="bg-clip-text text-transparent"><?php echo esc_html($title); ?></h1>\n`,
    );
    writeFileSync(
      join(project, "card.twig"),
      `<div class="rounded-full backdrop-blur">{{ title }}</div>\n`,
    );

    const report = reportFor(project);
    assert.equal(report.filesScanned, 2);
    assert.ok(finding(report, "02"), "expected tell 02 in the PHP template");
    assert.ok(finding(report, "19"), "expected tell 19 in the Twig template");
  });
});

test("deslop-ignore directives suppress hits", () => {
  withTempProject((project) => {
    writeFileSync(
      join(project, "styles.css"),
      `.a { background: radial-gradient(circle, red, blue); } /* deslop-ignore */\n` +
        `/* deslop-ignore-next-line 06 */\n` +
        `.b { background: radial-gradient(circle, red, blue); }\n` +
        `/* deslop-ignore-next-line 01 */\n` +
        `.c { background: radial-gradient(circle, red, blue); }\n`,
    );
    writeFileSync(
      join(project, "ignored.css"),
      `/* deslop-ignore-file */\n.x { backdrop-filter: blur(10px); }\n`,
    );

    const report = reportFor(project);
    const atmosphere = finding(report, "06");
    assert.equal(atmosphere?.hits.length, 1); // only .c: its directive names another tell
    assert.equal(atmosphere.hits[0].line, 5);
    assert.equal(finding(report, "19"), undefined);
  });
});

test("--only, --skip and --exclude narrow the scan", () => {
  withTempProject((project) => {
    writeFileSync(
      join(project, "a.css"),
      `.x { background: radial-gradient(red, blue); backdrop-filter: blur(4px); }\n`,
    );
    mkdirSync(join(project, "legacy"));
    writeFileSync(join(project, "legacy", "b.css"), `.y { background: radial-gradient(red, blue); }\n`);

    const only = scan(project, "--json", "--only=6");
    assert.equal(only.status, 0, only.stderr);
    assert.deepEqual(JSON.parse(only.stdout).findings.map((f) => f.id), ["06"]);

    const skip = scan(project, "--json", "--skip=06");
    assert.equal(skip.status, 0, skip.stderr);
    const skipReport = JSON.parse(skip.stdout);
    assert.equal(skipReport.findings.some((f) => f.id === "06"), false);
    assert.ok(skipReport.findings.some((f) => f.id === "19"));

    const excluded = scan(project, "--json", "--exclude=legacy");
    assert.equal(excluded.status, 0, excluded.stderr);
    assert.equal(JSON.parse(excluded.stdout).filesScanned, 1);
  });
});

test("--rules loads extra tells (Russian example rules)", () => {
  withTempProject((project) => {
    writeFileSync(join(project, "copy.md"), `Это не просто сканер — это ваш новый помощник.\n`);

    const rulesPath = join(dirname(scriptPath), "rules.ru.mjs");
    const result = scan(project, "--json", `--rules=${rulesPath}`);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(finding(JSON.parse(result.stdout), "ru-14"));

    const badRules = join(project, "bad-rules.mjs");
    writeFileSync(badRules, `export default {};\n`);
    const bad = scan(project, "--json", `--rules=${badRules}`);
    assert.notEqual(bad.status, 0);
    assert.match(bad.stderr, /must export an array/);
  });
});

test("escapes control characters in human output", () => {
  withTempProject((project) => {
    const control = "\u001b]52;c;not-a-clipboard\u0007";
    writeFileSync(
      join(project, "unsafe.css"),
      `.x { background: linear-gradient(to bottom, red, blue); ${control} }`,
    );

    const result = scan(project, "--no-color");
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.includes(control), false);
    assert.ok(result.stdout.includes("\\x1b]52;c;not-a-clipboard\\x07"));

    const jsonResult = scan(project, "--json");
    assert.equal(jsonResult.status, 0, jsonResult.stderr);
    assert.doesNotThrow(() => JSON.parse(jsonResult.stdout));
  });
});
