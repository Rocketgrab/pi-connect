import Link from "next/link";
import { events } from "@/data/leads";
import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { rankedLeads } from "@/lib/ranking";

const instructNow = rankedLeads.filter((lead) => lead.tier.key === "instruct").length;
const topTen = rankedLeads.slice(0, 10);

export default function SummaryPage() {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
          Concise strategy · September 2026
        </p>
        <h1 className="mt-2 max-w-3xl text-[2rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
          How to bring in professional indemnity work in Sydney
        </h1>
        <p className="mt-4 max-w-3xl text-[1.12rem] leading-relaxed text-ink">
          This playbook is for the person running business development: a short
          plan, a live lead list with a contacted tick, switchboard details, and
          a print pack you can email and print. It is written for a Sydney
          insurance-defence practice chasing PI and related property-damage
          instructions — not for a general corporate pitch.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">Leads</p>
          <p className="mt-1 text-[2rem] font-medium">{rankedLeads.length}</p>
          <p className="text-[1.02rem] text-ink-soft">{instructNow} instruct counsel now</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">This week</p>
          <p className="mt-1 text-[1.35rem] font-medium leading-snug">APIG conference</p>
          <p className="text-[1.02rem] text-ink-soft">Thursday 10 September, Wentworth</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">Who pays</p>
          <p className="mt-1 text-[1.35rem] font-medium leading-snug">Claims managers</p>
          <p className="text-[1.02rem] text-ink-soft">Brokers open the door; claims instruct</p>
        </div>
      </section>

      <section className="rounded-xl border border-accent/30 bg-accent-soft/60 p-6">
        <h2 className="text-[1.4rem] font-medium">Do this first</h2>
        <p className="mt-3 text-[1.08rem] leading-relaxed">
          The Australasian Professional Indemnity Group national conference is
          <strong> Thursday 10 September 2026</strong> at the Sofitel Sydney
          Wentworth. It is the one room that concentrates PI claims managers,
          underwriters and specialty brokers. Gala dinner tables are sold out.
          Call Cecelia Haddad on 0411 264 948 or email
          cecelia@marketingelements.com.au for a conference ticket, shared pass
          or dinner waitlist. Go to book follow-up coffees, not to pitch from
          the floor.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[1.5rem] font-medium">The plan, in five moves</h2>
        <ol className="space-y-4">
          {[
            {
              title: "Instructing claims people, not brand marketing",
              body: "Panel work comes from heads of claims and financial-lines team leaders. Underwriters matter for wordings and being known before a large reserve is set. Start with Eleanor Bunting and Georgina Dalley (DUAL), Ananya Tiwari (Arch), Sonja Schoenborn (HDI Specialty), Ross Whalebelly / Madlin Tzortzis / Gabrielle Malouf (Chubb), Alison Kerr and Stephanie Morrison (Liberty), Ilona Horvath (QBE), Gareth Edwards (Berkley), Chloe Thomas (ProRisk), Yasa Lovell (SURA) and Tom Hatton (360).",
            },
            {
              title: "Treat MGAs as the growth channel",
              body: "Domestic insurers have tightened appetite. A large share of SME and mid-market PI now sits with Lloyd’s coverholders and managing general agents who appoint their own lawyers. DUAL, SURA, Keystone, ProRisk, 360, MECON and High Street are more open than a two-year QBE panel tender. Join UAC as a business-services member and exhibit at the next Sydney Market Exchange.",
            },
            {
              title: "Use brokers before the writ arrives",
              body: "When an engineer or adviser is served, they call the broker first. Brokers notify, fight coverage, and often name preferred counsel. Priority brokers: Ryan Neary (GSA), Wendy Ford and Julie Hamilton (Aon), Robert Krleski (Marsh), Dennis Dalati and Brigid Allen (Gallagher), Sarah McPherson (WTW), Tank Insurance in Pyrmont, plus NIBA NSW committee brokers inside Steadfast, PSC, Howden and Lockton.",
            },
            {
              title: "Lead with construction PI after Pafburn",
              body: "The High Court’s Pafburn decision made the DBP Act duty non-delegable and switched off proportionate liability for those claims. Builders’ insurers pay first, then recover against consultants’ PI. That multiplies files. Pitch dual capability: contract works / property damage and downstream professional defence. From July 2026, registered building practitioners in NSW also need ‘adequate’ PI — coverage disputes will follow.",
            },
            {
              title: "Teach, then ask for files",
              body: "Host short CPD for brokers: statutory duty of care for consultants; ACL s 18 versus professional-services exclusions; s 5O peer-opinion defences; AFCA submissions for financial advisers. Lawcover’s primary solicitor panel is closed — chase excess / top-up markets instead. Allied health via ProRisk and Keystone is a better medical door than Avant’s in-house team.",
            },
          ].map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-line bg-white p-5 sm:p-6"
            >
              <p className="text-[0.9rem] font-medium uppercase tracking-[0.1em] text-accent">
                {index + 1}
              </p>
              <h3 className="mt-1 text-[1.22rem] font-medium">{item.title}</h3>
              <p className="mt-2 text-[1.08rem] leading-relaxed text-ink">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.5rem] font-medium">Top ten by impact</h2>
          <Link href="/leads" className="text-[1.02rem] underline decoration-line underline-offset-2">
            Full ranked list
          </Link>
        </div>
        <p className="max-w-3xl text-[1.08rem] leading-relaxed text-ink">
          Impact is a 0–100 score for return on an hour of your time: does the
          person appoint defence counsel, how many PI files do they control, and
          can you reach them from Sydney this quarter. Claims heads at MGAs and
          financial-lines insurers score highest; association staff and
          national executives score lowest.
        </p>
        <ol className="overflow-hidden rounded-xl border border-line bg-white">
          {topTen.map((lead) => (
            <li
              key={lead.id}
              className="flex items-start gap-4 border-t border-line p-4 first:border-t-0 sm:items-center"
            >
              <span className="w-8 shrink-0 text-[1.3rem] font-medium text-accent">
                {lead.rank}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[1.1rem] font-medium leading-snug">
                  {lead.person}{" "}
                  <span className="font-normal text-ink-soft">· {lead.organisation}</span>
                </p>
                <p className="text-[0.98rem] text-ink-soft">{lead.role}</p>
              </div>
              <span className="hidden shrink-0 text-[0.95rem] text-ink-soft sm:block">
                {lead.impact}
              </span>
              <div className="shrink-0">
                <ContactedCheckbox id={lead.id} compact />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-[1.5rem] font-medium">Before you email: who moved</h2>
        <p className="max-w-3xl text-[1.08rem] leading-relaxed text-ink">
          Names verified against public sources in September 2026. These are
          the ones most likely to be wrong in an older address book.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>
            HDI: Kosta Biris left as Head of Claims in December 2024. Use Sonja
            Schoenborn (Specialty financial lines) and Vikash Raman (HDI Global
            liability / financial lines).
          </li>
          <li>
            DUAL: Eleanor Bunting and Georgina Dalley appoint on claims. Daniel
            Brown is Head of Financial Lines. Kerryn Symes is NSW Manager, a
            relationship contact rather than a claims appointer.
          </li>
          <li>
            Arch: Aisling Hegarty is the national PI underwriting lead, based in
            Melbourne since February 2026. Sydney claims sit with Ananya Tiwari.
          </li>
          <li>
            Keystone: Jessica Kettle runs PI (jessica@ksua.com.au). John King
            and Jon Willmott remain directors; the book is national from
            Melbourne.
          </li>
          <li>
            Lawcover’s primary solicitors’ panel is closed to new firms; the
            open door is excess / top-up markets and the law-practice managers
            who buy them.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">90-day cadence</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="min-w-full text-left text-[1.05rem]">
            <thead className="bg-paper-2 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">This week</td>
                <td className="px-4 py-3">
                  APIG conference. Target 8–10 follow-up coffees with claims
                  managers named on the lead list.
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Weeks 2–4</td>
                <td className="px-4 py-3">
                  Meetings with DUAL claims, Arch, HDI, Chubb financial lines,
                  Liberty PFR, SURA, ProRisk, GSA and Tank. Offer one CPD date
                  each.
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">October</td>
                <td className="px-4 py-3">
                  NIBA Convention 18–20 October on the Gold Coast if budget
                  allows. Otherwise a Sydney table at the next NIBA NSW lunch
                  via Adam Hines’ committee.
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Ongoing</td>
                <td className="px-4 py-3">
                  APIG NSW seminars, AILA twilights, Consult Australia liability
                  roundtable, UAC 2027 Sydney Exchange booking. Tick contacted
                  as you go.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">Near events</h2>
        <ul className="mt-4 grid gap-3">
          {events
            .filter((event) => event.status === "This week" || event.status === "Upcoming")
            .map((event) => (
              <li key={event.id} className="rounded-xl border border-line bg-white p-5">
                <p className="text-[0.85rem] uppercase tracking-[0.1em] text-accent">
                  {event.status}
                </p>
                <p className="mt-1 text-[1.2rem] font-medium">{event.name}</p>
                <p className="text-[1.02rem] text-ink-soft">
                  {event.when} · {event.where}
                </p>
                <p className="mt-2 text-[1.05rem] leading-relaxed">{event.why}</p>
              </li>
            ))}
        </ul>
      </section>

      <p className="text-[1.08rem]">
        Open the{" "}
        <Link href="/leads" className="underline decoration-line underline-offset-2">
          lead list
        </Link>{" "}
        to start ticking names, or go straight to the{" "}
        <Link href="/print" className="underline decoration-line underline-offset-2">
          print pack
        </Link>
        .
      </p>
    </div>
  );
}
