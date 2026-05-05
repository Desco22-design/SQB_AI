// SQB Mahalla — Yil loyihasi prezentatsiyasi
// O'zbekcha (lotin), 9 slayd, korporativ-zamonaviy uslub

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inch
pres.title = "SQB Mahalla — Mintaqaviy Tahlil Tizimi";
pres.author = "SQB Bank";
pres.company = "Ўзсаноатқурилишбанк";
pres.subject = "Yil loyihasi taqdimoti";

// ===== Brand palette =====
const C = {
  navy: "003D7A",        // primary
  navyDark: "00264D",
  cyan: "00B5E2",        // accent
  gold: "F59E0B",        // highlight
  white: "FFFFFF",
  light: "F8FAFC",
  gray: "6B7280",
  dark: "1F2937",
  line: "E5E7EB",
};

const FONT = "Calibri";
const FONT_BOLD = "Calibri";

const LOGO = path.resolve(__dirname, "..", "SQB Logo Main short 1.png");

// ===== Helper: page footer + side accent bar =====
function decorate(slide, pageNum, totalPages) {
  // Left vertical accent bar
  slide.addShape("rect", { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addShape("rect", { x: 0.18, y: 0, w: 0.06, h: 7.5, fill: { color: C.cyan }, line: { color: C.cyan } });

  // Footer bar
  slide.addShape("line", { x: 0.6, y: 7.10, w: 12.2, h: 0, line: { color: C.line, width: 0.75 } });
  slide.addText("SQB Mahalla  |  Mintaqaviy tahlil tizimi", {
    x: 0.6, y: 7.15, w: 8, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.gray,
  });
  slide.addText(`${pageNum} / ${totalPages}`, {
    x: 11.6, y: 7.15, w: 1.2, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.gray, align: "right",
  });
}

// =============================================================
// SLIDE 1 — Title
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  // Big navy block on the right
  s.addShape("rect", { x: 7.4, y: 0, w: 5.93, h: 7.5, fill: { color: C.navy }, line: { color: C.navy } });
  // Accent diagonal (cyan rectangle bottom-right)
  s.addShape("rect", { x: 7.4, y: 6.6, w: 5.93, h: 0.9, fill: { color: C.cyan }, line: { color: C.cyan } });
  // Gold thin line
  s.addShape("rect", { x: 0.6, y: 6.4, w: 0.6, h: 0.06, fill: { color: C.gold }, line: { color: C.gold } });

  // Logo
  s.addImage({ path: LOGO, x: 0.6, y: 0.55, w: 1.0, h: 1.0 });

  // Eyebrow
  s.addText("YIL LOYIHASI  •  2026", {
    x: 0.6, y: 1.85, w: 6.4, h: 0.35,
    fontSize: 12, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4,
  });

  // Title
  s.addText("SQB Mahalla", {
    x: 0.6, y: 2.25, w: 6.8, h: 1.2,
    fontSize: 60, fontFace: FONT, color: C.navy, bold: true,
  });

  // Subtitle
  s.addText("Mintaqaviy tahlil tizimi va\nAI biznes maslahatchi", {
    x: 0.6, y: 3.55, w: 6.8, h: 1.4,
    fontSize: 26, fontFace: FONT, color: C.dark, bold: false, lineSpacingMultiple: 1.15,
  });

  // Tagline
  s.addText("Sun'iy intellekt yordamida mintaqalar va\nmahallalarni rivojlantirish platformasi", {
    x: 0.6, y: 5.05, w: 6.8, h: 1.0,
    fontSize: 14, fontFace: FONT, color: C.gray, italic: true, lineSpacingMultiple: 1.3,
  });

  // Right side: project info on navy
  s.addText("Loyiha:", { x: 7.85, y: 1.0, w: 5.0, h: 0.4, fontSize: 12, fontFace: FONT, color: C.cyan, bold: true, charSpacing: 3 });
  s.addText("Minтақавий таҳлил тизими", { x: 7.85, y: 1.35, w: 5.0, h: 0.5, fontSize: 22, fontFace: FONT, color: C.white, bold: true });

  s.addText("Qamrov:", { x: 7.85, y: 2.3, w: 5.0, h: 0.4, fontSize: 12, fontFace: FONT, color: C.cyan, bold: true, charSpacing: 3 });
  s.addText("Butun O'zbekiston bo'yicha\n14 viloyat  •  200+ tuman", { x: 7.85, y: 2.65, w: 5.0, h: 0.85, fontSize: 18, fontFace: FONT, color: C.white, lineSpacingMultiple: 1.2 });

  s.addText("Buyurtmachi:", { x: 7.85, y: 3.55, w: 5.0, h: 0.4, fontSize: 12, fontFace: FONT, color: C.cyan, bold: true, charSpacing: 3 });
  s.addText("SQB Bank\nO'zsanoatqurilishbank", { x: 7.85, y: 3.9, w: 5.0, h: 0.9, fontSize: 18, fontFace: FONT, color: C.white, bold: true, lineSpacingMultiple: 1.15 });

  s.addText("sqb-mahalla.uz", { x: 7.85, y: 6.7, w: 5.0, h: 0.5, fontSize: 16, fontFace: FONT, color: C.white, bold: true });
}

// =============================================================
// SLIDE 2 — Muammo (Problem)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 2, 9);

  // Section eyebrow
  s.addText("01  •  MUAMMO", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });

  // Title
  s.addText("Mintaqaviy rivojlanishdagi to'rt asosiy to'siq", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85,
    fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });

  // Subtitle
  s.addText("Bugungi kunda hokimiyatlar va tadbirkorlar quyidagi muammolarga duch kelmoqda:", {
    x: 0.6, y: 1.7, w: 12.2, h: 0.4, fontSize: 13, fontFace: FONT, color: C.gray, italic: true,
  });

  const problems = [
    { n: "01", title: "Tarqoq ma'lumotlar", text: "Iqtisodiy ko'rsatkichlar 5+ turli davlat manbalarida (stat.uz, MB, soliq, kadastr, hokimiyat) tarqoq holda" },
    { n: "02", title: "Tahlil sustligi", text: "Qo'lda hisoblash uzoq vaqt oladi va xato ehtimoli yuqori — qaror qabul qilish kechikadi" },
    { n: "03", title: "Yo'l xaritasining yo'qligi", text: "Mahalliy tadbirkor o'z hududida qaysi biznesni boshlashi kerakligini bilmaydi" },
    { n: "04", title: "Moliyaviy yetuk yechim yo'q", text: "Tadbirkor o'ziga mos kredit mahsulotini va shartlarini topishda qiynaladi" },
  ];

  const startX = 0.6, startY = 2.3, cardW = 5.95, cardH = 2.15, gapX = 0.3, gapY = 0.3;
  problems.forEach((p, i) => {
    const x = startX + (i % 2) * (cardW + gapX);
    const y = startY + Math.floor(i / 2) * (cardH + gapY);
    // Card background
    s.addShape("rect", { x, y, w: cardW, h: cardH, fill: { color: C.light }, line: { color: C.line, width: 0.75 } });
    // Number
    s.addText(p.n, { x: x + 0.25, y: y + 0.2, w: 1.0, h: 0.5, fontSize: 28, fontFace: FONT, color: C.cyan, bold: true });
    // Title
    s.addText(p.title, { x: x + 0.25, y: y + 0.8, w: cardW - 0.5, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true });
    // Text
    s.addText(p.text, { x: x + 0.25, y: y + 1.3, w: cardW - 0.5, h: 0.8, fontSize: 12, fontFace: FONT, color: C.dark, lineSpacingMultiple: 1.25 });
  });
}

// =============================================================
// SLIDE 3 — Yechim (Solution)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 3, 9);

  s.addText("02  •  YECHIM", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });

  s.addText("Bitta platforma — barcha javoblar", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });

  // Big quote / promise box
  s.addShape("rect", { x: 0.6, y: 1.95, w: 12.2, h: 1.4, fill: { color: C.navy }, line: { color: C.navy } });
  s.addShape("rect", { x: 0.6, y: 1.95, w: 0.12, h: 1.4, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("SQB Mahalla — bu rasmiy davlat manbalaridagi ma'lumotlarni\nsun'iy intellekt yordamida yagona tahlil tizimiga jamlovchi platforma.", {
    x: 0.95, y: 2.05, w: 11.8, h: 1.2, fontSize: 18, fontFace: FONT, color: C.white, bold: true, lineSpacingMultiple: 1.3, italic: false,
  });

  // 3 pillar columns
  const pillars = [
    { icon: "📊", title: "Mintaqaviy tahlil", text: "Tuman va viloyat bo'yicha real vaqtli iqtisodiy ko'rsatkichlar dashboardi" },
    { icon: "🤖", title: "AI biznes maslahatchi", text: "Tadbirkorga shaxsiy biznes-g'oyalar va xavf bahosi taqdim etadi" },
    { icon: "🏦", title: "Bank integratsiyasi", text: "Kreditni avtomatik tanlash va onlayn ariza yuborish imkoniyati" },
  ];

  const px = 0.6, py = 3.7, pw = 4.0, ph = 3.1, pgap = 0.1;
  pillars.forEach((p, i) => {
    const x = px + i * (pw + pgap);
    s.addShape("rect", { x, y: py, w: pw, h: ph, fill: { color: C.light }, line: { color: C.line, width: 0.75 } });
    // Top accent
    s.addShape("rect", { x, y: py, w: pw, h: 0.12, fill: { color: C.cyan }, line: { color: C.cyan } });
    s.addText(p.icon, { x: x + 0.3, y: py + 0.35, w: 1.0, h: 0.9, fontSize: 44, fontFace: FONT });
    s.addText(p.title, { x: x + 0.3, y: py + 1.35, w: pw - 0.6, h: 0.5, fontSize: 19, fontFace: FONT, color: C.navy, bold: true });
    s.addText(p.text, { x: x + 0.3, y: py + 1.95, w: pw - 0.6, h: 1.05, fontSize: 12.5, fontFace: FONT, color: C.dark, lineSpacingMultiple: 1.3 });
  });
}

// =============================================================
// SLIDE 4 — Modul 1: Mintaqaviy tahlil dashboardi
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 4, 9);

  s.addText("03  •  MODUL 1", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("Mintaqaviy tahlil dashboardi", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });
  s.addText("Hokimiyatlar va bank rahbariyati uchun strategik qaror qabul qilish vositasi", {
    x: 0.6, y: 1.7, w: 12.2, h: 0.4, fontSize: 13, fontFace: FONT, color: C.gray, italic: true,
  });

  // Left side: 7 sections list
  s.addText("Tahlil bo'limlari (7 ta)", {
    x: 0.6, y: 2.3, w: 6.0, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true,
  });

  const sections = [
    "Tumanning umumiy holati",
    "Iqtisodiy faollik",
    "Infratuzilma",
    "Aholi va bandlik",
    "Mahalla tadbirkorligi va bank",
    "Imkoniyatlar",
    "Xulosa va reja",
  ];

  sections.forEach((sec, i) => {
    const y = 2.85 + i * 0.45;
    s.addShape("rect", { x: 0.6, y, w: 0.06, h: 0.32, fill: { color: C.cyan }, line: { color: C.cyan } });
    s.addText(`${String(i + 1).padStart(2, "0")}`, {
      x: 0.8, y, w: 0.5, h: 0.32, fontSize: 13, fontFace: FONT, color: C.gold, bold: true,
    });
    s.addText(sec, {
      x: 1.35, y, w: 5.0, h: 0.32, fontSize: 14, fontFace: FONT, color: C.dark,
    });
  });

  // Right side: AI conclusions box
  s.addShape("rect", { x: 7.0, y: 2.3, w: 5.8, h: 4.6, fill: { color: C.navy }, line: { color: C.navy } });
  s.addShape("rect", { x: 7.0, y: 2.3, w: 5.8, h: 0.5, fill: { color: C.cyan }, line: { color: C.cyan } });
  s.addText("SUN'IY INTELLEKT TAHLILI", {
    x: 7.2, y: 2.35, w: 5.4, h: 0.4, fontSize: 13, fontFace: FONT, color: C.white, bold: true, charSpacing: 3,
  });

  s.addText("AI har bir bo'lim uchun avtomatik:", {
    x: 7.2, y: 2.95, w: 5.4, h: 0.4, fontSize: 14, fontFace: FONT, color: C.cyan, bold: true,
  });

  const aiPoints = [
    "Ko'rsatkichlar dinamikasini tahlil qiladi",
    "Tendensiyalarni aniqlaydi",
    "Xulosalarni shakllantiradi",
    "Strategik tavsiyalarni ishlab chiqadi",
    "Boshqa mintaqalar bilan taqqoslaydi",
  ];

  aiPoints.forEach((pt, i) => {
    const y = 3.45 + i * 0.55;
    s.addText("→", { x: 7.2, y, w: 0.3, h: 0.4, fontSize: 16, fontFace: FONT, color: C.gold, bold: true });
    s.addText(pt, { x: 7.55, y, w: 5.0, h: 0.4, fontSize: 13.5, fontFace: FONT, color: C.white });
  });

  s.addText("Natija: hokim qo'lida — har doim yangilanadigan,\nfaktlarga asoslangan strategik hisobot", {
    x: 7.2, y: 6.25, w: 5.4, h: 0.6, fontSize: 11.5, fontFace: FONT, color: C.gold, italic: true, lineSpacingMultiple: 1.3,
  });
}

// =============================================================
// SLIDE 5 — Modul 2: AI Biznes Maslahatchi (4 bosqich)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 5, 9);

  s.addText("04  •  MODUL 2", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("AI Biznes Maslahatchi — 4 bosqichli tizim", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });
  s.addText("Har bir tadbirkor uchun individual biznes-g'oya, risk bahosi va kredit yechimi", {
    x: 0.6, y: 1.7, w: 12.2, h: 0.4, fontSize: 13, fontFace: FONT, color: C.gray, italic: true,
  });

  const steps = [
    { n: "01", title: "Profil",        text: "Yosh, ta'lim, tajriba,\nhudud, oilaviy holat" },
    { n: "02", title: "Moliyaviy so'rov", text: "Boshlang'ich kapital,\nxarajatlar, garov" },
    { n: "03", title: "AI tahlil",     text: "6 qatlamli baholash:\nshaxs, bozor, risk..." },
    { n: "04", title: "Natija",        text: "3 biznes-g'oya +\nkredit + biznes-reja" },
  ];

  const sx = 0.6, sy = 2.4, sw = 2.95, sh = 2.6, sgap = 0.18;
  steps.forEach((st, i) => {
    const x = sx + i * (sw + sgap);
    // Card
    s.addShape("rect", { x, y: sy, w: sw, h: sh, fill: { color: C.white }, line: { color: C.navy, width: 1.5 } });
    // Number badge
    s.addShape("ellipse", { x: x + sw / 2 - 0.4, y: sy - 0.4, w: 0.8, h: 0.8, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText(st.n, { x: x + sw / 2 - 0.4, y: sy - 0.32, w: 0.8, h: 0.65, fontSize: 22, fontFace: FONT, color: C.white, bold: true, align: "center" });
    // Title
    s.addText(st.title, { x: x + 0.2, y: sy + 0.65, w: sw - 0.4, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, align: "center" });
    // Text
    s.addText(st.text, { x: x + 0.2, y: sy + 1.25, w: sw - 0.4, h: 1.2, fontSize: 12, fontFace: FONT, color: C.dark, align: "center", lineSpacingMultiple: 1.3 });

    // Arrow between cards
    if (i < steps.length - 1) {
      s.addText("→", { x: x + sw - 0.05, y: sy + sh / 2 - 0.3, w: 0.3, h: 0.5, fontSize: 28, fontFace: FONT, color: C.gold, bold: true, align: "center" });
    }
  });

  // Bottom highlight: outputs
  s.addShape("rect", { x: 0.6, y: 5.4, w: 12.2, h: 1.5, fill: { color: C.light }, line: { color: C.line, width: 0.75 } });
  s.addText("Har bir tadbirkor oladi:", {
    x: 0.85, y: 5.55, w: 11.7, h: 0.4, fontSize: 14, fontFace: FONT, color: C.navy, bold: true,
  });

  const outputs = [
    { title: "100 ballik ball", desc: "umumiy baho" },
    { title: "3 biznes-g'oya", desc: "risk darajasi bilan" },
    { title: "Foyda prognozi", desc: "oylik daromad" },
    { title: "Kredit shartlari", desc: "summa, foiz, muddat" },
    { title: "Ish o'rinlari", desc: "yaratilish potensiali" },
  ];

  outputs.forEach((o, i) => {
    const x = 0.85 + i * 2.36;
    s.addText(o.title, { x, y: 6.0, w: 2.3, h: 0.4, fontSize: 13.5, fontFace: FONT, color: C.cyan, bold: true });
    s.addText(o.desc, { x, y: 6.4, w: 2.3, h: 0.4, fontSize: 11, fontFace: FONT, color: C.gray });
  });
}

// =============================================================
// SLIDE 6 — Texnologiya va manbalar
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 6, 9);

  s.addText("05  •  TEXNOLOGIYA", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("Rasmiy ma'lumotlar + sun'iy intellekt", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });
  s.addText("Tahlil aniqligi 5 ta davlat manbasiga asoslanadi", {
    x: 0.6, y: 1.7, w: 12.2, h: 0.4, fontSize: 13, fontFace: FONT, color: C.gray, italic: true,
  });

  // Left: data sources
  s.addText("Rasmiy manbalar", {
    x: 0.6, y: 2.3, w: 6.0, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true,
  });

  const sources = [
    { n: "stat.uz",          d: "Davlat statistika qo'mitasi" },
    { n: "Markaziy bank",    d: "Moliyaviy ko'rsatkichlar" },
    { n: "Soliq qo'mitasi",  d: "Tadbirkorlik faolligi" },
    { n: "Kadastr agentligi", d: "Yer va mulk ma'lumotlari" },
    { n: "Hokimiyat",         d: "Mahalliy rejalar va loyihalar" },
  ];

  sources.forEach((src, i) => {
    const y = 2.85 + i * 0.7;
    s.addShape("rect", { x: 0.6, y, w: 6.0, h: 0.55, fill: { color: C.light }, line: { color: C.line, width: 0.5 } });
    s.addShape("rect", { x: 0.6, y, w: 0.08, h: 0.55, fill: { color: C.gold }, line: { color: C.gold } });
    s.addText(src.n, { x: 0.85, y: y + 0.05, w: 2.3, h: 0.45, fontSize: 14, fontFace: FONT, color: C.navy, bold: true });
    s.addText(src.d, { x: 3.2, y: y + 0.05, w: 3.3, h: 0.45, fontSize: 12, fontFace: FONT, color: C.dark });
  });

  // Right: AI capabilities
  s.addShape("rect", { x: 7.0, y: 2.3, w: 5.8, h: 4.5, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("AI imkoniyatlari", {
    x: 7.25, y: 2.5, w: 5.4, h: 0.5, fontSize: 18, fontFace: FONT, color: C.cyan, bold: true,
  });

  const aiCaps = [
    { t: "6 qatlamli tahlil",         d: "Shaxs • bozor • moliya • biznes-model • risk • biznes-reja" },
    { t: "Avtomatik xulosa",          d: "Ma'lumotlar dinamikasidan tendensiya va prognoz" },
    { t: "Mintaqaviy taqqoslash",     d: "Tumanlar va viloyatlar o'rtasida solishtiruv" },
    { t: "Risk skoring",              d: "Past / o'rta / yuqori darajalar bo'yicha tasniflash" },
    { t: "Tavsiya generatsiyasi",     d: "Strategik qarorlar uchun aniq amaliy tavsiyalar" },
  ];

  aiCaps.forEach((c, i) => {
    const y = 3.15 + i * 0.7;
    s.addText("●", { x: 7.25, y: y + 0.02, w: 0.25, h: 0.4, fontSize: 12, fontFace: FONT, color: C.gold, bold: true });
    s.addText(c.t, { x: 7.55, y, w: 5.1, h: 0.32, fontSize: 13.5, fontFace: FONT, color: C.white, bold: true });
    s.addText(c.d, { x: 7.55, y: y + 0.32, w: 5.1, h: 0.36, fontSize: 10.5, fontFace: FONT, color: "B8C7DB" });
  });
}

// =============================================================
// SLIDE 7 — Qamrov, foydalanuvchilar va sohalar
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 7, 9);

  s.addText("06  •  QAMROV", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("Kim foydalanadi va qaysi sohalarni qamraydi", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });

  // 3 user groups
  s.addText("Foydalanuvchilar", {
    x: 0.6, y: 1.85, w: 6.0, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true,
  });

  const users = [
    { icon: "🏛️", t: "Hokimiyatlar",    d: "Tuman va viloyat rahbariyati strategik qarorlar uchun" },
    { icon: "🏦", t: "SQB Bank xodimlari", d: "Kredit ekspertlari va mintaqaviy bo'limlar uchun" },
    { icon: "👥", t: "Tadbirkorlar",     d: "Mahallaning mavjud va bo'lajak ish boshlovchilari" },
  ];

  users.forEach((u, i) => {
    const y = 2.4 + i * 1.4;
    s.addShape("rect", { x: 0.6, y, w: 6.0, h: 1.25, fill: { color: C.light }, line: { color: C.line, width: 0.75 } });
    s.addShape("rect", { x: 0.6, y, w: 0.1, h: 1.25, fill: { color: C.cyan }, line: { color: C.cyan } });
    s.addText(u.icon, { x: 0.85, y: y + 0.2, w: 0.9, h: 0.9, fontSize: 36, fontFace: FONT });
    s.addText(u.t, { x: 1.85, y: y + 0.2, w: 4.6, h: 0.45, fontSize: 17, fontFace: FONT, color: C.navy, bold: true });
    s.addText(u.d, { x: 1.85, y: y + 0.7, w: 4.6, h: 0.5, fontSize: 12, fontFace: FONT, color: C.dark, lineSpacingMultiple: 1.25 });
  });

  // Right: 14 sectors
  s.addText("Qamralgan sohalar (14+)", {
    x: 7.0, y: 1.85, w: 5.8, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true,
  });

  const sectors = [
    "Oziq-ovqat ishlab chiqarish",
    "To'qimachilik",
    "Qurilish materiallari",
    "Chorvachilik",
    "Qishloq xo'jaligi",
    "Oziq-ovqatni qayta ishlash",
    "Mehmonxona xizmatlari",
    "Chakana savdo",
    "Transport",
    "Axborot texnologiyalari",
    "Ta'lim",
    "Go'zallik xizmatlari",
    "Mebel ishlab chiqarish",
    "Dorixonalar",
  ];

  // 2 columns
  const cols = 2, rowH = 0.42;
  sectors.forEach((sec, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 7.0 + col * 2.9;
    const y = 2.4 + row * rowH;
    s.addText("▸", { x, y, w: 0.25, h: rowH, fontSize: 12, fontFace: FONT, color: C.gold, bold: true });
    s.addText(sec, { x: x + 0.25, y, w: 2.6, h: rowH, fontSize: 11.5, fontFace: FONT, color: C.dark });
  });
}

// =============================================================
// SLIDE 8 — Innovatsion afzalliklar
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  decorate(s, 8, 9);

  s.addText("07  •  AFZALLIKLAR", { x: 0.6, y: 0.45, w: 5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("Nima uchun bu loyiha — innovatsion?", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.85, fontSize: 30, fontFace: FONT, color: C.navy, bold: true,
  });
  s.addText("Bozorda mavjud yechimlardan farqlovchi 6 jihat", {
    x: 0.6, y: 1.7, w: 12.2, h: 0.4, fontSize: 13, fontFace: FONT, color: C.gray, italic: true,
  });

  const advantages = [
    { t: "Birinchi va yagona",          d: "O'zbekistondagi birinchi mintaqaviy AI tahlil platformasi" },
    { t: "Davlat manbalari",            d: "5 ta rasmiy manbadan integratsiya qilingan ma'lumotlar" },
    { t: "End-to-end yechim",           d: "Tahlildan kreditgacha bir platformada — ariza yuborish ham" },
    { t: "Real ish o'rinlari",          d: "Har bir biznes-g'oya uchun yaratiladigan o'rinlar hisoblanadi" },
    { t: "Mahalliy fokus",              d: "Har bir tuman va viloyat xususiyatlarini alohida hisobga oladi" },
    { t: "Respublika qamrovi",          d: "14 viloyat va 200+ tuman bo'yicha yagona platforma" },
  ];

  // 2 rows x 3 columns
  const ax = 0.6, ay = 2.3, aw = 4.0, ah = 2.25, agap = 0.1;
  advantages.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = ax + col * (aw + agap);
    const y = ay + row * (ah + agap);
    // Card
    s.addShape("rect", { x, y, w: aw, h: ah, fill: { color: C.white }, line: { color: C.line, width: 1 } });
    // Number badge
    s.addShape("rect", { x, y, w: 0.65, h: 0.65, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText(String(i + 1), { x, y: y + 0.06, w: 0.65, h: 0.55, fontSize: 22, fontFace: FONT, color: C.gold, bold: true, align: "center" });
    // Title
    s.addText(a.t, { x: x + 0.85, y: y + 0.1, w: aw - 1.0, h: 0.55, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
    // Divider
    s.addShape("rect", { x: x + 0.25, y: y + 0.85, w: 0.6, h: 0.05, fill: { color: C.cyan }, line: { color: C.cyan } });
    // Text
    s.addText(a.d, { x: x + 0.25, y: y + 1.0, w: aw - 0.5, h: 1.15, fontSize: 12, fontFace: FONT, color: C.dark, lineSpacingMultiple: 1.3 });
  });
}

// =============================================================
// SLIDE 9 — Ta'sir va yakun (Yil loyihasi sabablari)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Decorative
  s.addShape("rect", { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.cyan }, line: { color: C.cyan } });
  s.addShape("rect", { x: 0, y: 0, w: 13.333, h: 0.18, fill: { color: C.gold }, line: { color: C.gold } });

  // Logo
  s.addImage({ path: LOGO, x: 0.6, y: 0.55, w: 0.85, h: 0.85 });

  s.addText("YAKUN", { x: 1.7, y: 0.7, w: 4, h: 0.4, fontSize: 12, fontFace: FONT, color: C.gold, bold: true, charSpacing: 4 });
  s.addText("Yil loyihasi — kelajak bugundan", {
    x: 0.6, y: 1.6, w: 12.2, h: 1.0, fontSize: 36, fontFace: FONT, color: C.white, bold: true,
  });

  // Impact metrics row
  const impacts = [
    { n: "14",    d: "viloyat qamrovi" },
    { n: "200+",  d: "tuman va shahar" },
    { n: "5+",    d: "rasmiy davlat manbai" },
    { n: "14",    d: "iqtisodiy soha" },
    { n: "100",   d: "ballik AI baholash" },
  ];

  const ix = 0.6, iy = 2.9, iw = 2.43, ih = 1.5, igap = 0.1;
  impacts.forEach((m, i) => {
    const x = ix + i * (iw + igap);
    s.addShape("rect", { x, y: iy, w: iw, h: ih, fill: { color: C.navyDark }, line: { color: C.cyan, width: 0.5 } });
    s.addText(m.n, { x, y: iy + 0.15, w: iw, h: 0.7, fontSize: 36, fontFace: FONT, color: C.gold, bold: true, align: "center" });
    s.addText(m.d, { x: x + 0.1, y: iy + 0.95, w: iw - 0.2, h: 0.5, fontSize: 11, fontFace: FONT, color: C.white, align: "center", lineSpacingMultiple: 1.2 });
  });

  // Why "Yil loyihasi" — 3 reasons
  s.addText("Nega \"Yil loyihasi\"ga munosib?", {
    x: 0.6, y: 4.7, w: 12.2, h: 0.5, fontSize: 18, fontFace: FONT, color: C.cyan, bold: true,
  });

  const reasons = [
    { t: "Milliy miqyos",     d: "Butun O'zbekiston bo'yicha — 14 viloyat\nva 200+ tumanga xizmat qiladi" },
    { t: "Ijtimoiy ta'sir",   d: "Yangi ish o'rinlari va har bir mahalla\niqtisodiyotining rivoji" },
    { t: "Texnologik yetuk",  d: "Sun'iy intellekt + 5 ta rasmiy manbaning\nyagona integratsiyasi" },
  ];

  reasons.forEach((r, i) => {
    const x = 0.6 + i * 4.13;
    s.addShape("rect", { x, y: 5.3, w: 4.0, h: 1.55, fill: { color: C.navyDark }, line: { color: C.navyDark } });
    s.addShape("rect", { x, y: 5.3, w: 4.0, h: 0.07, fill: { color: C.gold }, line: { color: C.gold } });
    s.addText(r.t, { x: x + 0.2, y: 5.45, w: 3.7, h: 0.4, fontSize: 15, fontFace: FONT, color: C.white, bold: true });
    s.addText(r.d, { x: x + 0.2, y: 5.85, w: 3.7, h: 0.95, fontSize: 11.5, fontFace: FONT, color: "B8C7DB", lineSpacingMultiple: 1.3 });
  });

  // Footer
  s.addText("sqb-mahalla.uz", {
    x: 0.6, y: 7.05, w: 6, h: 0.4, fontSize: 14, fontFace: FONT, color: C.gold, bold: true,
  });
  s.addText("Rahmat!  •  Savollar uchun tayyormiz", {
    x: 6.6, y: 7.05, w: 6.6, h: 0.4, fontSize: 14, fontFace: FONT, color: C.white, italic: true, align: "right",
  });
}

// =============================================================
// Save
// =============================================================
pres
  .writeFile({ fileName: "SQB_Mahalla_Yil_Loyihasi.pptx" })
  .then((file) => console.log("✓ Tayyor:", file))
  .catch((err) => {
    console.error("Xatolik:", err);
    process.exit(1);
  });
