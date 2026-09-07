import Link from "next/link";
import { events } from "@/data/leads";
import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { Expand } from "@/components/Expand";
import { rankedLeads } from "@/lib/ranking";

const instructNow = rankedLeads.filter((lead) => lead.tier.key === "instruct").length;
const topTen = rankedLeads.slice(0, 10);

const MOVES = [
  {
    title: "Claims people who instruct, not brand marketing",
    items: [
      "First meetings: Eleanor Bunting and Georgina Dalley (DUAL), Ananya Tiwari (Arch), Sonja Schoenborn (HDI Specialty), Ross Whalebelly / Madlin Tzortzis / Gabrielle Malouf (Chubb), Alison Kerr and Stephanie Morrison (Liberty), Ilona Horvath (QBE), Gareth Edwards (Berkley), Julie Morgan (AXA XL), Chloe Thomas (ProRisk), Yasa Lovell (SURA), Tom Hatton (360).",
      "Berkshire Hathaway Specialty is building a new Sydney PI claims team in 2026. Panel not settled. Get in early.",
    ],
  },
  {
    title: "MGAs as the growth channel",
    items: [
      "Priority desks: DUAL, SURA, Keystone, ProRisk, 360, MECON, High Street, Newline (Lloyd’s 1218, new Sydney branch).",
      "Join UAC as a business-services member. Exhibit at the next Sydney Market Exchange.",
    ],
  },
  {
    title: "Brokers, before the writ arrives",
    items: [
      "Ryan Neary (GSA Insurance Brokers), Brigid Allen and Dennis Dalati (Gallagher), Joe Hershewe (Bellrock), Wendy Ford and Julie Hamilton (Aon), Robert Krleski (Marsh), Sarah McPherson (WTW), Tank Insurance in Pyrmont.",
      "NIBA NSW committee brokers inside Steadfast, PSC, Howden and Lockton.",
    ],
  },
  {
    title: "Construction PI after Pafburn",
    items: [
      "Pitch dual capability: contract works / property damage and downstream professional defence.",
      "From July 2026, registered building practitioners in NSW need ‘adequate’ PI. Coverage disputes will follow.",
    ],
  },
  {
    title: "Teach, then ask for files",
    items: [
      "Host short CPD: statutory duty of care for consultants; ACL s 18 vs professional-services exclusions; s 5O peer-opinion defences; AFCA submissions for financial advisers.",
      "Lawcover primary panel is closed. Chase excess / top-up. Allied health via ProRisk and Keystone, not Avant in-house.",
    ],
  },
];

export function StrategyContent({ forPrint = false }: { forPrint?: boolean }) {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
          Checklist · September 2026
        </p>
        <h1 className="mt-2 max-w-3xl text-[2rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
          Sydney PI — to-do
        </h1>
        <p className="mt-4 max-w-3xl text-[1.12rem] leading-relaxed text-ink">
          Next 90 days. Claims managers instruct. Brokers open the door. Names
          ranked by return on an hour. Tick Contacted as each one is done.
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
          <p className="mt-1 text-[1.35rem] font-medium leading-snug">
            <Expand>APIG</Expand> conference
          </p>
          <p className="text-[1.02rem] text-ink-soft">Thursday 10 September, Wentworth</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">Who pays</p>
          <p className="mt-1 text-[1.35rem] font-medium leading-snug">Claims managers</p>
          <p className="text-[1.02rem] text-ink-soft">Brokers open the door; claims instruct</p>
        </div>
      </section>

      <section className="rounded-xl border border-accent/30 bg-accent-soft/60 p-6">
        <h2 className="text-[1.4rem] font-medium">Thursday</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>
            <Expand>APIG</Expand> national conference, Sofitel Sydney Wentworth.
            The <Expand>PI</Expand> claims, underwriting and specialty-broker
            room.
          </li>
          <li>
            Call Cecelia Haddad — 0411 264 948 /
            cecelia@marketingelements.com.au — ticket, shared pass or dinner
            waitlist. Dinner sold out.
          </li>
          <li>Book follow-up coffees. No pitch from the floor.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[1.5rem] font-medium">Five moves</h2>
        <ol className="space-y-4">
          {MOVES.map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-line bg-white p-5 sm:p-6"
            >
              <p className="text-[0.9rem] font-medium uppercase tracking-[0.1em] text-accent">
                {index + 1}
              </p>
              <h3 className="mt-1 text-[1.22rem] font-medium">
                <Expand>{item.title}</Expand>
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed text-ink">
                {item.items.map((line) => (
                  <li key={line}>
                    <Expand>{line}</Expand>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.5rem] font-medium">Top ten</h2>
          {forPrint ? null : (
            <Link href="/leads" className="text-[1.02rem] underline decoration-line underline-offset-2">
              Full ranked list
            </Link>
          )}
        </div>
        <p className="max-w-3xl text-[1.08rem] leading-relaxed text-ink">
          Score is 0–100: appoints defence counsel, volume of{" "}
          <Expand>PI</Expand> files, reachable from Sydney this quarter.{" "}
          <Expand>MGAs</Expand> and financial-lines claims heads first;
          association staff last.
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
                  <span className="font-normal text-ink-soft">
                    · <Expand>{lead.organisation}</Expand>
                  </span>
                </p>
                <p className="text-[0.98rem] text-ink-soft">
                  <Expand>{lead.role}</Expand>
                </p>
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
        <h2 className="text-[1.5rem] font-medium">Before first email</h2>
        <ul className="list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>
            <Expand>
              HDI: do not email Kosta Biris (left December 2024). Use Sonja
              Schoenborn (Specialty financial lines) and Vikash Raman (HDI Global
              liability / financial lines).
            </Expand>
          </li>
          <li>
            <Expand>
              DUAL claims: Eleanor Bunting and Georgina Dalley. Daniel Brown is
              Head of Financial Lines. Kerryn Symes is NSW Manager, not a claims
              appointer.
            </Expand>
          </li>
          <li>
            <Expand>
              Arch: Aisling Hegarty (national PI underwriting) is Melbourne-based.
              Sydney claims: Ananya Tiwari.
            </Expand>
          </li>
          <li>
            <Expand>
              Keystone PI: Jessica Kettle (jessica@ksua.com.au). King and
              Willmott remain directors.
            </Expand>
          </li>
          <li>
            Lawcover primary panel is closed. Chase excess / top-up and the
            practice managers who buy it.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">90 days</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="min-w-full text-left text-[1.05rem]">
            <thead className="bg-paper-2 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">To-do</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">This week</td>
                <td className="px-4 py-3">
                  <Expand>
                    APIG conference. 8–10 follow-up coffees with claims managers
                    on this list.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Weeks 2–4</td>
                <td className="px-4 py-3">
                  <Expand>
                    Meetings: DUAL claims, Arch, HDI, Chubb financial lines,
                    Liberty PFR, SURA, ProRisk, GSA, Tank. Offer one CPD date
                    each.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">October</td>
                <td className="px-4 py-3">
                  <Expand>
                    AILA National Conference, Adelaide 14–16 October — book
                    coffees before flying. NIBA Convention 18–20 October (Gold
                    Coast) only if budget allows; otherwise next NIBA NSW lunch
                    via Adam Hines’ committee.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Ongoing</td>
                <td className="px-4 py-3">
                  <Expand>
                    APIG NSW seminars, AILA twilights, Consult Australia liability
                    roundtable, UAC 2027 Sydney Exchange booking. Tick contacted.
                  </Expand>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">Upcoming</h2>
        <ul className="mt-4 grid gap-3">
          {events
            .filter((event) => event.status === "This week" || event.status === "Upcoming")
            .map((event) => (
              <li key={event.id} className="rounded-xl border border-line bg-white p-5">
                <p className="text-[0.85rem] uppercase tracking-[0.1em] text-accent">
                  {event.status}
                </p>
                <p className="mt-1 text-[1.2rem] font-medium">
                  <Expand>{event.name}</Expand>
                </p>
                <p className="text-[1.02rem] text-ink-soft">
                  {event.when} · {event.where}
                </p>
                <p className="mt-2 text-[1.05rem] leading-relaxed">
                  <Expand>{event.why}</Expand>
                </p>
              </li>
            ))}
        </ul>
      </section>

      {forPrint ? null : (
        <p className="text-[1.08rem]">
          <Link href="/leads" className="underline decoration-line underline-offset-2">
            Lead list
          </Link>
          {" · "}
          <Link href="/print" className="underline decoration-line underline-offset-2">
            Print pack
          </Link>
        </p>
      )}
    </div>
  );
}
