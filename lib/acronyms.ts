import type { LeadType } from "@/data/types";

/**
 * Longest-first so "APIG" is not treated as containing "PI",
 * and "MGAs" wins over "MGA".
 */
const TERMS: Array<{ acronym: string; full: string }> = [
  { acronym: "BHSI", full: "Berkshire Hathaway Specialty Insurance" },
  { acronym: "APIG", full: "Australasian Professional Indemnity Group" },
  { acronym: "NIBA", full: "National Insurance Brokers Association" },
  { acronym: "AILA", full: "Australian Insurance Law Association" },
  { acronym: "AFCA", full: "Australian Financial Complaints Authority" },
  { acronym: "AFSL", full: "Australian Financial Services Licence" },
  { acronym: "ASIC", full: "Australian Securities and Investments Commission" },
  { acronym: "APRA", full: "Australian Prudential Regulation Authority" },
  { acronym: "APAC", full: "Asia Pacific" },
  { acronym: "E&PL", full: "executive and professional lines" },
  { acronym: "MGAs", full: "managing general agents" },
  { acronym: "MGA", full: "managing general agent" },
  { acronym: "WTW", full: "Willis Towers Watson" },
  { acronym: "UAC", full: "Underwriting Agencies Council" },
  { acronym: "PFR", full: "professional and financial risks" },
  { acronym: "ISR", full: "industrial special risks" },
  { acronym: "CPD", full: "continuing professional development" },
  { acronym: "SMEs", full: "small and medium-sized enterprises" },
  { acronym: "SME", full: "small and medium-sized enterprise" },
  { acronym: "TPA", full: "third-party administrator" },
  { acronym: "EGM", full: "executive general manager" },
  { acronym: "CLO", full: "chief legal officer" },
  { acronym: "CEO", full: "chief executive officer" },
  { acronym: "DBP", full: "Design and Building Practitioners" },
  { acronym: "ACL", full: "Australian Consumer Law" },
  { acronym: "AIG", full: "American International Group" },
  { acronym: "PSC", full: "PSC Insurance Group" },
  { acronym: "ANZ", full: "Australia and New Zealand" },
  { acronym: "D&O", full: "directors' and officers' liability" },
  { acronym: "ACT", full: "Australian Capital Territory" },
  { acronym: "NSW", full: "New South Wales" },
  { acronym: "MD", full: "managing director" },
  { acronym: "VP", full: "vice president" },
  { acronym: "PI", full: "professional indemnity" },
  { acronym: "FI", full: "financial institutions" },
  { acronym: "ML", full: "management liability" },
  { acronym: "DA", full: "delegated authority" },
];

const TOKEN = TERMS.map((term) => term.acronym.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

const PATTERN = new RegExp(`\\b(?:${TOKEN})\\b`, "g");

const LOOKUP = new Map(TERMS.map((term) => [term.acronym, term.full]));

function isProtected(text: string, start: number, end: number, match: string): boolean {
  const before = text.slice(0, start);
  const after = text.slice(end);

  if ((before.match(/\(/g) ?? []).length > (before.match(/\)/g) ?? []).length) {
    return true;
  }
  if (after.startsWith(" (")) return true;
  if (match === "NSW" && /^\s+\d{4}\b/.test(after)) return true;
  return false;
}

export function expandAcronyms(text: string): string {
  if (!text) return text;

  const holes: string[] = [];
  const masked = text.replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b|https?:\/\/[^\s)]+/g, (chunk) => {
    holes.push(chunk);
    return `\u0000${holes.length - 1}\u0000`;
  });

  const expanded = masked.replace(PATTERN, (match, offset: number, whole: string) => {
    if (isProtected(whole, offset, offset + match.length, match)) return match;
    const full = LOOKUP.get(match);
    return full ? `${match} (${full})` : match;
  });

  return expanded.replace(/\u0000(\d+)\u0000/g, (_, index) => holes[Number(index)]);
}

export const TYPE_LABELS: Record<LeadType | "Network" | "All", string> = {
  All: "All",
  Insurer: "Insurer",
  MGA: "MGA (managing general agent)",
  Broker: "Broker",
  Association: "Association",
  Event: "Event",
  Network: "Network",
};

export function typeLabel(type: LeadType | "Network" | "All"): string {
  return TYPE_LABELS[type];
}
