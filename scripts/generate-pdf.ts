/**
 * Writes a simple Helvetica PDF that PDF.js and print dialogs can open.
 * Chrome's Skia print-to-pdf of the dark site renders as a blank page in
 * the preview viewer.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { events, organisations } from "../data/leads";
import { PLAN } from "../data/plan";
import { expandAcronyms, typeLabel } from "../lib/acronyms";
import { rankedLeads, tiers } from "../lib/ranking";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BLACK = rgb(0.07, 0.07, 0.07);
const GREY = rgb(0.32, 0.32, 0.32);
const RULE = rgb(0.75, 0.75, 0.75);
const WHITE = rgb(1, 1, 1);

function pdfSafe(text: string): string {
  return expandAcronyms(text)
    .replaceAll("\u2013", "-")
    .replaceAll("\u2014", "-")
    .replaceAll("\u2018", "'")
    .replaceAll("\u2019", "'")
    .replaceAll("\u201C", '"')
    .replaceAll("\u201D", '"')
    .replaceAll("\u00A0", " ");
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const safe = pdfSafe(text).replace(/\s+/g, " ").trim();
  if (!safe) return [];
  const words = safe.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    if (font.widthOfTextAtSize(word, size) <= width) {
      current = word;
      continue;
    }
    let chunk = "";
    for (const ch of word) {
      const trial = chunk + ch;
      if (font.widthOfTextAtSize(trial, size) <= width) {
        chunk = trial;
      } else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    current = chunk;
  }
  if (current) lines.push(current);
  return lines;
}

class Writer {
  doc!: PDFDocument;
  font!: PDFFont;
  bold!: PDFFont;
  page!: PDFPage;
  y = 0;
  pageNo = 0;

  async init() {
    this.doc = await PDFDocument.create();
    this.doc.registerFontkit(fontkit);
    this.doc.setTitle("Sydney PI BD checklist");
    this.doc.setAuthor("Sydney PI BD checklist");
    this.doc.setSubject("Plan, ranked leads, committees, events and switchboards");
    this.doc.setCreator("Sydney PI BD checklist");
    const here = dirname(fileURLToPath(import.meta.url));
    this.font = await this.doc.embedFont(readFileSync(join(here, "fonts", "LiberationSans-Regular.ttf")), {
      subset: false,
    });
    this.bold = await this.doc.embedFont(readFileSync(join(here, "fonts", "LiberationSans-Bold.ttf")), {
      subset: false,
    });
    this.newPage();
  }

  newPage() {
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.pageNo += 1;
    this.page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: WHITE,
    });
    this.page.drawText("Sydney PI BD checklist", {
      x: MARGIN,
      y: PAGE_HEIGHT - 28,
      size: 9,
      font: this.font,
      color: GREY,
    });
    const label = `September 2026  ·  ${this.pageNo}`;
    this.page.drawText(label, {
      x: PAGE_WIDTH - MARGIN - this.font.widthOfTextAtSize(label, 9),
      y: PAGE_HEIGHT - 28,
      size: 9,
      font: this.font,
      color: GREY,
    });
    this.page.drawLine({
      start: { x: MARGIN, y: PAGE_HEIGHT - 36 },
      end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 36 },
      thickness: 0.5,
      color: RULE,
    });
    this.y = PAGE_HEIGHT - 56;
  }

  ensure(height: number) {
    if (this.y - height < 40) this.newPage();
  }

  gap(n: number) {
    this.y -= n;
  }

  heading(text: string, size = 18) {
    const lines = wrap(text, this.bold, size, CONTENT_WIDTH);
    this.ensure(lines.length * (size + 4) + 8);
    for (const line of lines) {
      this.page.drawText(line, { x: MARGIN, y: this.y, size, font: this.bold, color: BLACK });
      this.y -= size + 4;
    }
    this.y -= 6;
  }

  kicker(text: string) {
    const line = pdfSafe(text).toUpperCase();
    this.ensure(16);
    this.page.drawText(line, { x: MARGIN, y: this.y, size: 9, font: this.bold, color: GREY });
    this.y -= 16;
  }

  body(text: string, opts?: { indent?: number; size?: number; bold?: boolean; color?: "black" | "grey" }) {
    const size = opts?.size ?? 10.5;
    const font = opts?.bold ? this.bold : this.font;
    const indent = opts?.indent ?? 0;
    const color = opts?.color === "grey" ? GREY : BLACK;
    const width = CONTENT_WIDTH - indent;
    const lines = wrap(text, font, size, width);
    const leading = size + 3.5;
    for (const line of lines) {
      this.ensure(leading);
      this.page.drawText(line, { x: MARGIN + indent, y: this.y, size, font, color });
      this.y -= leading;
    }
  }

  bullet(text: string) {
    const size = 10.5;
    const lines = wrap(text, this.font, size, CONTENT_WIDTH - 14);
    const leading = size + 3.5;
    this.ensure(leading);
    this.page.drawText("•", { x: MARGIN, y: this.y, size, font: this.font, color: BLACK });
    for (const [i, line] of lines.entries()) {
      if (i > 0) this.ensure(leading);
      this.page.drawText(line, { x: MARGIN + 14, y: this.y, size, font: this.font, color: BLACK });
      this.y -= leading;
    }
    this.y -= 2;
  }

  rule() {
    this.ensure(12);
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE_WIDTH - MARGIN, y: this.y },
      thickness: 0.4,
      color: RULE,
    });
    this.y -= 10;
  }
}

async function main() {
  const w = new Writer();
  await w.init();
  const instructNow = rankedLeads.filter((lead) => lead.tier.key === "instruct").length;

  w.kicker(PLAN.kicker);
  w.heading(PLAN.title, 22);
  w.body(PLAN.intro, { size: 12 });
  w.gap(10);
  w.body(`Leads: ${rankedLeads.length}. ${instructNow} instruct counsel now.`, { bold: true });
  w.body(`This week: ${PLAN.thisWeek.title}. ${PLAN.thisWeek.detail}.`);
  w.body(`Who pays: ${PLAN.whoPays.title}. ${PLAN.whoPays.detail}.`);
  w.gap(8);

  w.heading(PLAN.thursdayTitle, 16);
  for (const line of PLAN.thursday) w.bullet(line);

  w.heading(PLAN.movesTitle, 16);
  PLAN.moves.forEach((move, index) => {
    w.body(`${index + 1}. ${move.title}`, { bold: true, size: 12 });
    w.gap(2);
    for (const item of move.items) w.bullet(item);
    w.gap(6);
  });

  w.heading("Top ten", 16);
  w.body(PLAN.topTenBlurb);
  w.gap(4);
  for (const lead of rankedLeads.slice(0, 10)) {
    w.body(
      `${lead.rank}. ${lead.person}  ·  ${lead.organisation}  ·  ${lead.role}  ·  ${lead.impact}`,
    );
  }

  w.gap(8);
  w.heading(PLAN.beforeEmailTitle, 16);
  for (const line of PLAN.beforeEmail) w.bullet(line);

  w.heading(PLAN.ninetyDaysTitle, 16);
  for (const row of PLAN.ninetyDays) {
    w.body(row.when, { bold: true });
    w.body(row.todo);
    w.gap(4);
  }

  w.heading("Upcoming", 16);
  for (const event of events.filter((item) => item.status === "This week" || item.status === "Upcoming")) {
    w.body(`${event.status}: ${event.name}`, { bold: true });
    w.body(`${event.when} · ${event.where}`, { color: "grey", size: 10 });
    w.body(event.why);
    w.gap(6);
  }

  w.newPage();
  w.kicker(`${rankedLeads.length} people and desks, ranked by impact`);
  w.heading("Lead list", 20);
  w.body("Work from the top. Rank 1 appoints defence counsel on PI files, in Sydney, reachable now.");
  w.gap(4);
  for (const tier of tiers) {
    const count = rankedLeads.filter((lead) => lead.tier.key === tier.key).length;
    w.body(`${tier.label} (${tier.min}+): ${count}. ${tier.blurb}`, { size: 10 });
  }
  w.gap(8);

  for (const lead of rankedLeads) {
    const block = [
      `Rank ${lead.rank}  ·  ${lead.tier.label}  ·  ${typeLabel(lead.type)}  ·  Impact ${lead.impact}/100`,
      lead.person,
      `${lead.organisation} — ${lead.role}`,
      lead.focus,
      lead.why,
      lead.approach ? `Next step. ${lead.approach}` : "",
      lead.note ?? "",
      [
        lead.email ? `Email ${lead.email}` : "",
        lead.phone ? `Phone ${lead.phone}` : "",
      ]
        .filter(Boolean)
        .join("  ·  "),
      lead.address ? `Address ${lead.address}` : "",
      lead.website ? `Web ${lead.website.replace(/^https?:\/\//, "")}` : "",
    ].filter(Boolean) as string[];

    const estimated = block.reduce((sum, line) => sum + wrap(line, w.font, 10.5, CONTENT_WIDTH).length * 14, 0) + 20;
    w.ensure(Math.min(estimated, 200));
    w.rule();
    w.body(block[0], { size: 9, color: "grey", bold: true });
    w.body(block[1], { size: 13, bold: true });
    for (const line of block.slice(2)) w.body(line);
    w.gap(6);
  }

  w.newPage();
  w.kicker("Switchboards, people, committees");
  w.heading("Contacts", 20);
  w.body(
    "Direct emails only where they sit on a public claims sheet, team page or association site. Otherwise: switchboard, ask for the claims or PI lead by title.",
  );

  w.heading("Committees and annual rooms", 16);
  for (const event of events) {
    w.body(`${event.status}: ${event.name}`, { bold: true, size: 12 });
    w.body(`${event.when} · ${event.where}`, { color: "grey", size: 10 });
    w.body(event.why);
    if (event.contact) w.body(event.contact);
    if (event.website) w.body(event.website.replace(/^https?:\/\//, ""), { color: "grey", size: 10 });
    w.gap(8);
  }

  w.heading("Organisations", 16);
  for (const org of organisations) {
    w.body(`${typeLabel(org.type)}  ·  ${org.name}`, { bold: true, size: 12 });
    if (org.sydneyAddress) w.body(org.sydneyAddress);
    const switchboard = [org.phone ? `Phone ${org.phone}` : "", org.email ? `Email ${org.email}` : ""]
      .filter(Boolean)
      .join("  ·  ");
    if (switchboard) w.body(switchboard);
    if (org.website) w.body(org.website.replace(/^https?:\/\//, ""), { color: "grey", size: 10 });
    for (const person of org.people) {
      const bits = [
        person.name,
        person.role,
        person.email,
        person.phone,
      ].filter(Boolean);
      w.bullet(bits.join(" — "));
    }
    if (org.notes) w.body(org.notes, { size: 10, color: "grey" });
    w.gap(8);
  }

  const bytes = await w.doc.save();
  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sydney-pi-checklist.pdf");
  writeFileSync(out, bytes);
  console.log(`Wrote ${out} (${bytes.length} bytes, ${w.pageNo} pages)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
