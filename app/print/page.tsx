"use client";

import { events, organisations } from "@/data/leads";
import { useContacted } from "@/lib/contacted";
import { rankedLeads, tiers } from "@/lib/ranking";

export default function PrintPage() {
  const { ready, isContacted } = useContacted();
  const sorted = rankedLeads;

  return (
    <div>
      <div className="no-print mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
            Email and print
          </p>
          <h1 className="mt-2 text-[2rem] font-medium leading-tight">Print pack</h1>
          <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed">
            Use Print in the browser, or Save as PDF and attach it to an email.
            Contacted ticks from this browser will show on the list. Empty boxes
            print for handwritten notes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-ink px-5 py-3 text-[1.08rem] text-paper"
        >
          Print or save PDF
        </button>
      </div>

      <section>
        <h2 className="text-[1.6rem] font-medium">Sydney PI business development</h2>
        <p className="mt-2 text-[1rem] text-ink-soft">Briefing pack · September 2026</p>
        <p className="mt-4 text-[1.08rem] leading-relaxed">
          Goal: more professional indemnity defence files from Sydney insurers,
          underwriting agencies and brokers. Claims managers instruct. Brokers
          recommend. Associations get you in the room.
        </p>
        <h3 className="mt-6 text-[1.25rem] font-medium">This week</h3>
        <p className="mt-2 text-[1.08rem] leading-relaxed">
          APIG National Conference and Gala Dinner, Thursday 10 September 2026,
          Sofitel Sydney Wentworth. Cecelia Haddad, 0411 264 948,
          cecelia@marketingelements.com.au. Dinner sold out; ask for conference
          tickets or waitlist.
        </p>
        <h3 className="mt-6 text-[1.25rem] font-medium">Strategy</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>Meet claims appointers at DUAL, Arch, HDI, Chubb, Liberty, QBE, Berkley, SURA, ProRisk and 360.</li>
          <li>Work MGAs and Lloyd’s coverholders; they appoint their own counsel.</li>
          <li>Build broker advocacy relationships at GSA, Aon, Marsh, Gallagher, WTW and Tank.</li>
          <li>Pitch construction PI after Pafburn / DBP Act, plus s 5O and ACL s 18.</li>
          <li>Speak at APIG NSW, exhibit at UAC, teach CPD. Lawcover primary panel later; chase top-up now.</li>
        </ol>
        <h3 className="mt-6 text-[1.25rem] font-medium">Before you email: who moved</h3>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>HDI: Kosta Biris left as Head of Claims December 2024. Use Sonja Schoenborn and Vikash Raman.</li>
          <li>DUAL claims: Eleanor Bunting and Georgina Dalley. Kerryn Symes is NSW Manager, not a claims appointer.</li>
          <li>Arch: Aisling Hegarty (PI underwriting) is Melbourne-based; Sydney claims sit with Ananya Tiwari.</li>
          <li>Keystone PI contact is Jessica Kettle, jessica@ksua.com.au.</li>
          <li>Lawcover primary panel is closed; chase excess / top-up markets.</li>
        </ul>
        <h3 className="mt-6 text-[1.25rem] font-medium">How the list is ranked</h3>
        <p className="mt-2 text-[1.08rem] leading-relaxed">
          Each name has an impact score out of 100: does the person appoint
          defence counsel, how many PI files do they control, and how reachable
          are they from Sydney this quarter. The checklist runs highest first.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[1.08rem] leading-relaxed">
          {tiers.map((tier) => (
            <li key={tier.key}>
              <span className="font-medium">{tier.label}</span> ({tier.min}+): {tier.blurb}
            </li>
          ))}
        </ul>
      </section>

      <section className="print-break mt-10">
        <h2 className="text-[1.45rem] font-medium">Lead checklist, ranked by impact</h2>
        <p className="mt-1 text-[1rem] text-ink-soft">
          {sorted.length} names · tick contacted · leave a note in the margin
        </p>
        <div className="mt-4 space-y-0">
          {sorted.map((lead) => {
            const done = ready && isContacted(lead.id);
            return (
              <div key={lead.id} className="print-card flex gap-3">
                <input
                  type="checkbox"
                  className="contacted-box mt-1 shrink-0"
                  checked={done}
                  readOnly
                />
                <div className="min-w-0">
                  <p className="font-medium">
                    {lead.rank}. {lead.person} · {lead.organisation}
                  </p>
                  <p className="text-[0.98rem] text-ink-soft">
                    Impact {lead.impact} · {lead.tier.label} · {lead.role} · {lead.type} · {lead.focus}
                  </p>
                  <p className="mt-1 text-[1rem] leading-snug">{lead.why}</p>
                  <p className="mt-1 text-[0.98rem]">
                    {[lead.email, lead.phone, lead.address].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="print-break mt-10">
        <h2 className="text-[1.45rem] font-medium">Events and committees</h2>
        <div className="mt-4 space-y-0">
          {events.map((event) => (
            <div key={event.id} className="print-card">
              <p className="font-medium">
                {event.status} · {event.name}
              </p>
              <p className="text-[1rem]">
                {event.when} · {event.where}
              </p>
              <p className="mt-1 text-[1rem] leading-snug">{event.why}</p>
              {event.contact ? <p className="mt-1 text-[0.98rem]">{event.contact}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="print-break mt-10">
        <h2 className="text-[1.45rem] font-medium">Organisation directory</h2>
        <div className="mt-4 space-y-0">
          {organisations.map((org) => (
            <div key={org.id} className="print-card">
              <p className="font-medium">
                {org.name} · {org.type}
              </p>
              <p className="text-[1rem]">
                {[org.sydneyAddress, org.phone, org.email].filter(Boolean).join(" · ")}
              </p>
              <ul className="mt-2 text-[1rem]">
                {org.people.map((person) => (
                  <li key={person.name}>
                    {person.name}, {person.role}
                    {person.email ? ` · ${person.email}` : ""}
                    {person.phone ? ` · ${person.phone}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
