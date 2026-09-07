"use client";

import { useMemo, useState } from "react";
import type { LeadType } from "@/data/types";
import { LeadCard } from "@/components/LeadCard";
import { rankedLeads, tiers, type TierKey } from "@/lib/ranking";
import { useContacted } from "@/lib/contacted";

const types: Array<"All" | LeadType> = ["All", "Insurer", "MGA", "Broker", "Association"];

const selectClass =
  "w-full rounded-md border border-line bg-paper px-3 py-3 text-[1.08rem] text-ink outline-none focus:border-accent";

export function LeadList() {
  const { ready, isContacted } = useContacted();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | LeadType>("All");
  const [tier, setTier] = useState<"All" | TierKey>("All");
  const [status, setStatus] = useState<"All" | "Open" | "Contacted">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rankedLeads
      .filter((lead) => (type === "All" ? true : lead.type === type))
      .filter((lead) => (tier === "All" ? true : lead.tier.key === tier))
      .filter((lead) => {
        if (!ready || status === "All") return true;
        const done = isContacted(lead.id);
        return status === "Contacted" ? done : !done;
      })
      .filter((lead) => {
        if (!q) return true;
        const hay = [
          lead.person,
          lead.organisation,
          lead.role,
          lead.focus,
          lead.why,
          lead.email ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
  }, [query, type, tier, status, ready, isContacted]);

  const contactedOnPage = filtered.filter((lead) => ready && isContacted(lead.id)).length;

  return (
    <div>
      <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
        <label className="block text-[1.02rem]">
          <span className="mb-1 block text-ink-soft">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, firm, PI, claims…"
            className={selectClass}
          />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "All" | LeadType)}
              className={selectClass}
            >
              {types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Impact tier</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as "All" | TierKey)}
              className={selectClass}
            >
              <option value="All">All</option>
              {tiers.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label} ({item.min}+)
                </option>
              ))}
            </select>
          </label>
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "All" | "Open" | "Contacted")}
              className={selectClass}
            >
              <option value="All">All</option>
              <option value="Open">Not contacted</option>
              <option value="Contacted">Contacted</option>
            </select>
          </label>
        </div>
        <p className="mt-4 text-[1.02rem] text-ink-soft">
          Showing {filtered.length} of {rankedLeads.length} leads, highest impact first
          {ready ? ` · ${contactedOnPage} ticked contacted on this view` : null}
        </p>
      </div>
      <div className="mt-5 grid gap-4">
        {filtered.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-[1.08rem] text-ink-soft">
            No leads match those filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
