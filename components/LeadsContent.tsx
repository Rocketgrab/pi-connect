import { Expand } from "@/components/Expand";
import { LeadList } from "@/components/LeadList";
import { rankedLeads, tiers } from "@/lib/ranking";

export function LeadsContent({
  printable = false,
}: {
  printable?: boolean;
}) {
  return (
    <div>
      <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
        {rankedLeads.length} people and desks, ranked by what they’re worth to me
      </p>
      <h1 className="mt-2 text-[2rem] font-medium leading-tight sm:text-[2.2rem]">
        My lead list
      </h1>
      <p className="mt-3 max-w-3xl text-[1.1rem] leading-relaxed text-ink">
        I work from the top. Rank 1 is the best return on an hour of my time:
        someone who appoints defence counsel on <Expand>PI</Expand> files, in
        Sydney, and is reachable now. I’ll tick{" "}
        <span className="font-medium">Contacted</span> as I go; it stays in this
        browser.
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
              <dd className="mt-1 text-[0.98rem] leading-snug text-ink-soft">
                <Expand>{tier.blurb}</Expand>
              </dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-8">
        <LeadList hideFilters={printable} />
      </div>
    </div>
  );
}
