// Example --rules module: Russian AI-copywriting tells.
//
//   node scan.mjs <root> --rules=path/to/rules.ru.mjs
//
// Each entry has the same shape as a core tell in scan.mjs. Patterns may be
// RegExp or plain strings (strings are compiled case-insensitive). `copy: true`
// means the tell also reads prose (.md), not only code. Use this file as the
// template for your own language- or stack-specific rules.
//
// Note: JavaScript's \b is ASCII-only and never matches next to Cyrillic
// letters — write plain substrings or explicit boundaries instead.
export default [
  { id: "ru-14", group: "copy", name: "русский AI-слог", fix: "скажите конкретную вещь",
    copy: true,
    patterns: [
      /не просто .{1,40}?[—–-]\s*это/iu,
      /попрощайтесь с|забудьте о том|представьте себе мир/iu,
      /молниеносн|бесшовн|безупречн|революционн|беспрецедентн/iu,
      /раскройте (?:весь )?потенциал/iu,
      /выведите .{1,30} на новый уровень/iu,
      /в считанные секунды/iu,
    ] },
];
