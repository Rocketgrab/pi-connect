"use client";

import { useMemo, useState } from "react";
import { leads } from "@/data/leads";
import type { LeadType, Priority } from "@/data/types";
import { LeadCard } from "@/components/LeadCard";
import { useContacted } from "@/lib/contacted";

const types: Array<"All" | LeadType> = [
  "All",
  "Insurer",
  "MGA",
  "Broker",
  "Association",
  "Event",
];

export function LeadList() {
  const { ready, isContacted } = useContacted();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | LeadType>("All");
  const [priority, setPriority] = useState<"All" | Priority>("All");
  const [status, setStatus] = useState<"All" | "Open" | "Contacted">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((lead) => (type === "All" ? true : lead.type === type))
      .filter((lead) => (priority === "All" ? true : lead.priority === priority))
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
      })
      .sort((a, b) => a.priority - b.priority || a.organisation.localeCompare(b.organisation));
  }, [query, type, priority, status, ready, isContacted]);

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
            className="w-full rounded-md border border-line bg-paper px-3 py-3 text-[1.08rem] outline-none focus:border-navy"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "All" | LeadType)}
              className="w-full rounded-md border border-line bg-paper px-3 py-3 text-[1.08rem]"
            >
              {types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Priority</span>
            <select
              value={priority === "All" ? "All" : String(priority)}
              onChange={(e) =>
                setPriority(e.target.value === "All" ? "All" : (Number(e.target.value) as Priority))
              }
              className="w-full rounded-md border border-line bg-paper px-3 py-3 text-[1.08rem]"
            >
              <option value="All">All</option>
              <option value="1">P1 — this month</option>
              <option value="2">P2 — next 90 days</option>
              <option value="3">P3 — keep warm</option>
            </select>
          </label>
          <label className="text-[1.02rem]">
            <span className="mb-1 block text-ink-soft">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "All" | "Open" | "Contacted")}
              className="w-full rounded-md border border-line bg-paper px-3 py-3 text-[1.08rem]"
            >
              <option value="All">All</option>
              <option value="Open">Not contacted</option>
              <option value="Contacted">Contacted</option>
            </select>
          </label>
        </div>
        <p className="mt-4 text-[1.02rem] text-ink-soft">
          Showing {filtered.length} of {leads.length} leads
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
