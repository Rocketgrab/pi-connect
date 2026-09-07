import { leads } from "@/data/leads";
import type { Lead } from "@/data/types";

export type TierKey = "instruct" | "strong" | "meeting" | "warm";

export type Tier = {
  key: TierKey;
  label: string;
  min: number;
  blurb: string;
};

export const tiers: Tier[] = [
  {
    key: "instruct",
    label: "Instructs now",
    min: 80,
    blurb: "They appoint defence counsel on PI files this quarter. I contact these first.",
  },
  {
    key: "strong",
    label: "Strong",
    min: 60,
    blurb: "A real book of Sydney PI. I’ll get to them in the next 90 days.",
  },
  {
    key: "meeting",
    label: "Worth a meeting",
    min: 40,
    blurb: "Useful door or referrer. Indirect instructions — still worth my time.",
  },
  {
    key: "warm",
    label: "Keep warm",
    min: 0,
    blurb: "Low direct return. Newsletter and event hellos, no dedicated pitch from me.",
  },
];

export function tierFor(impact: number): Tier {
  return tiers.find((tier) => impact >= tier.min) ?? tiers[tiers.length - 1];
}

export type RankedLead = Lead & { rank: number; tier: Tier };

export const rankedLeads: RankedLead[] = [...leads]
  .sort((a, b) => b.impact - a.impact || a.organisation.localeCompare(b.organisation))
  .map((lead, index) => ({ ...lead, rank: index + 1, tier: tierFor(lead.impact) }));
