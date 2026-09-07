import { LeadList } from "@/components/LeadList";
import { rankedLeads, tiers } from "@/lib/ranking";

export default function LeadsPage() {
  return (
    <div>
      <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
        {rankedLeads.length} people and desks, ranked by impact
      </p>
      <h1 className="mt-2 text-[2rem] font-medium leading-tight sm:text-[2.2rem]">
        Lead list
      </h1>
      <p className="mt-3 max-w-3xl text-[1.1rem] leading-relaxed text-ink">
        Work from the top. Rank 1 is the best return on an hour of your time:
        someone who appoints defence counsel on PI files, in Sydney, and is
        reachable now. Tick <span className="font-medium">Contacted</span> as
        you go; the tick stays in this browser.
      </p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => {
          const count = rankedLeads.filter((lead) => lead.tier.key === tier.key).length;
          return (
            <div key={tier.key} className="rounded-xl border border-line bg-white p-4">
              <dt className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{tier.label}</span>
                <span className="text-[0.95rem] text-ink-soft">
                  {count} · {tier.min}+
                </span>
              </dt>
              <dd className="mt-1 text-[0.98rem] leading-snug text-ink-soft">{tier.blurb}</dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-8">
        <LeadList />
      </div>
    </div>
  );
}
