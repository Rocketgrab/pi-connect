import type { Lead } from "@/data/types";
import type { RankedLead } from "@/lib/ranking";
import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { Expand } from "@/components/Expand";
import { typeLabel } from "@/lib/acronyms";

const typeStyles: Record<Lead["type"], string> = {
  Insurer: "bg-navy-soft text-navy",
  MGA: "bg-green-soft text-green",
  Broker: "bg-accent-soft text-accent",
  Association: "bg-paper text-ink-soft border border-line",
  Event: "bg-gold-soft text-gold",
};

export function LeadCard({ lead }: { lead: RankedLead }) {
  return (
    <article className="rounded-xl border border-line bg-white p-5 sm:p-6 print-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="shrink-0 text-right">
            <p className="text-[0.78rem] uppercase tracking-[0.1em] text-ink-soft">Rank</p>
            <p className="text-[1.6rem] font-medium leading-none text-accent">{lead.rank}</p>
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink px-2.5 py-0.5 text-[0.82rem] font-medium text-paper">
                {lead.tier.label}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.82rem] font-medium ${typeStyles[lead.type]}`}
              >
                {typeLabel(lead.type)}
              </span>
            </div>
            <h2 className="text-[1.28rem] font-medium leading-snug text-ink">
              {lead.person}
            </h2>
            <p className="mt-1 text-[1.05rem] text-ink">
              <Expand>{lead.organisation}</Expand>
            </p>
            <p className="mt-0.5 text-[1rem] text-ink-soft">
              <Expand>{lead.role}</Expand>
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-lg border border-line bg-paper px-3 py-2">
          <ContactedCheckbox id={lead.id} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="impact-bar flex-1" aria-hidden>
          <span style={{ width: `${lead.impact}%` }} />
        </div>
        <p className="shrink-0 text-[0.92rem] text-ink-soft">
          Impact {lead.impact}/100
        </p>
      </div>
      <p className="mt-4 text-[0.98rem] uppercase tracking-[0.08em] text-ink-soft">
        <Expand>{lead.focus}</Expand>
      </p>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">
        <Expand>{lead.why}</Expand>
      </p>
      {lead.approach ? (
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">
          <span className="font-medium">What I’ll do. </span>
          <Expand>{lead.approach}</Expand>
        </p>
      ) : null}
      {lead.note ? (
        <p className="mt-3 text-[1rem] leading-relaxed text-accent">
          <Expand>{lead.note}</Expand>
        </p>
      ) : null}
      <dl className="mt-4 grid gap-2 text-[1.02rem] text-ink sm:grid-cols-2">
        {lead.email ? (
          <div>
            <dt className="text-ink-soft">Email</dt>
            <dd>
              <a className="break-all underline decoration-line underline-offset-2" href={`mailto:${lead.email}`}>
                {lead.email}
              </a>
            </dd>
          </div>
        ) : null}
        {lead.phone ? (
          <div>
            <dt className="text-ink-soft">Phone</dt>
            <dd>
              <a className="underline decoration-line underline-offset-2" href={`tel:${lead.phone.replace(/\s/g, "")}`}>
                {lead.phone}
              </a>
            </dd>
          </div>
        ) : null}
        {lead.address ? (
          <div className="sm:col-span-2">
            <dt className="text-ink-soft">Address</dt>
            <dd>{lead.address}</dd>
          </div>
        ) : null}
        {lead.website ? (
          <div className="sm:col-span-2">
            <dt className="text-ink-soft">Web</dt>
            <dd>
              <a
                className="break-all underline decoration-line underline-offset-2"
                href={lead.website}
                target="_blank"
                rel="noreferrer"
              >
                {lead.website.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
