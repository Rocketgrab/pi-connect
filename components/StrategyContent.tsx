import Link from "next/link";
import { events } from "@/data/leads";
import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { Expand } from "@/components/Expand";
import { rankedLeads } from "@/lib/ranking";

const instructNow = rankedLeads.filter((lead) => lead.tier.key === "instruct").length;
const topTen = rankedLeads.slice(0, 10);

const MOVES = [
  {
    title: "I go to the people who instruct, not brand marketing",
    body: "Panel work comes from heads of claims and financial-lines team leaders. Underwriters matter for wordings and for being known before a large reserve is set. My first meetings: Eleanor Bunting and Georgina Dalley (DUAL), Ananya Tiwari (Arch), Sonja Schoenborn (HDI Specialty), Ross Whalebelly / Madlin Tzortzis / Gabrielle Malouf (Chubb), Alison Kerr and Stephanie Morrison (Liberty), Ilona Horvath (QBE), Gareth Edwards (Berkley), Julie Morgan (AXA XL), Chloe Thomas (ProRisk), Yasa Lovell (SURA) and Tom Hatton (360). Berkshire Hathaway Specialty is building a new Sydney PI claims team in 2026 and has not settled its panel — I want to be in that conversation early.",
  },
  {
    title: "MGAs are where I can actually grow",
    body: "Domestic insurers have tightened appetite. A large share of SME and mid-market PI now sits with Lloyd’s coverholders and managing general agents who appoint their own lawyers. DUAL, SURA, Keystone, ProRisk, 360, MECON, High Street and Newline (Lloyd’s 1218, new Sydney branch) are more open than a two-year QBE panel tender. I’ll join UAC as a business-services member and exhibit at the next Sydney Market Exchange.",
  },
  {
    title: "Brokers, before the writ arrives",
    body: "When an engineer or adviser is served, they call the broker first. Brokers notify, fight coverage, and often name preferred counsel. The brokers I want on side: Ryan Neary (GSA Insurance Brokers), Brigid Allen and Dennis Dalati (Gallagher), Joe Hershewe (Bellrock — a PI broker with its own claims team), Wendy Ford and Julie Hamilton (Aon), Robert Krleski (Marsh), Sarah McPherson (WTW), Tank Insurance in Pyrmont, plus NIBA NSW committee brokers inside Steadfast, PSC, Howden and Lockton.",
  },
  {
    title: "Construction PI after Pafburn is my opening",
    body: "The High Court’s Pafburn decision made the DBP Act duty non-delegable and switched off proportionate liability for those claims. Builders’ insurers pay first, then recover against consultants’ PI. That multiplies files. I’ll pitch what we already do: contract works / property damage and the downstream professional defence. From July 2026, registered building practitioners in NSW also need ‘adequate’ PI — coverage disputes will follow, and I want those files.",
  },
  {
    title: "I teach, then I ask for files",
    body: "I’ll host short CPD for brokers: statutory duty of care for consultants; ACL s 18 versus professional-services exclusions; s 5O peer-opinion defences; AFCA submissions for financial advisers. Lawcover’s primary solicitor panel is closed — I’ll chase excess / top-up markets instead. Allied health via ProRisk and Keystone is a better medical door than Avant’s in-house team.",
  },
];

export function StrategyContent({ forPrint = false }: { forPrint?: boolean }) {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
          My notes · September 2026
        </p>
        <h1 className="mt-2 max-w-3xl text-[2rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
          How I’m bringing in PI work in Sydney
        </h1>
        <p className="mt-4 max-w-3xl text-[1.12rem] leading-relaxed text-ink">
          Working notes for the next 90 days. Claims managers instruct. Brokers
          open the door. I’m chasing <Expand>PI</Expand> and related
          property-damage files — not a general corporate pitch. I’ve ranked
          every name by return on an hour of my time, and I’ll tick Contacted as
          I go.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">On my list</p>
          <p className="mt-1 text-[2rem] font-medium">{rankedLeads.length}</p>
          <p className="text-[1.02rem] text-ink-soft">{instructNow} can instruct me now</p>
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
        <h2 className="text-[1.4rem] font-medium">Thursday: I need to be in the room</h2>
        <p className="mt-3 text-[1.08rem] leading-relaxed">
          The <Expand>APIG</Expand> national conference is{" "}
          <strong>Thursday 10 September 2026</strong> at the Sofitel Sydney
          Wentworth. It is the one room that concentrates the <Expand>PI</Expand>{" "}
          claims managers, underwriters and specialty brokers I actually need.
          Gala dinner tables are sold out. I’ll call Cecelia Haddad on 0411 264
          948 or email cecelia@marketingelements.com.au for a conference ticket,
          a shared pass or the dinner waitlist. I’m going to book follow-up
          coffees, not to pitch from the floor.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[1.5rem] font-medium">How I’m going to do this</h2>
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
              <p className="mt-2 text-[1.08rem] leading-relaxed text-ink">
                <Expand>{item.body}</Expand>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.5rem] font-medium">My top ten</h2>
          {forPrint ? null : (
            <Link href="/leads" className="text-[1.02rem] underline decoration-line underline-offset-2">
              Full ranked list
            </Link>
          )}
        </div>
        <p className="max-w-3xl text-[1.08rem] leading-relaxed text-ink">
          I scored each name 0–100 on return on an hour of my time: do they
          appoint defence counsel, how many <Expand>PI</Expand> files do they
          control, and can I reach them from Sydney this quarter. Claims heads
          at <Expand>MGAs</Expand> and financial-lines insurers sit at the top;
          association staff and national executives sit at the bottom.
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
        <h2 className="text-[1.5rem] font-medium">Before I email: who has moved</h2>
        <p className="max-w-3xl text-[1.08rem] leading-relaxed text-ink">
          I checked names against public sources in September 2026. These are
          the ones most likely to be wrong in an older address book of mine.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          <li>
            <Expand>
              HDI: Kosta Biris left as Head of Claims in December 2024. I’ll use
              Sonja Schoenborn (Specialty financial lines) and Vikash Raman (HDI
              Global liability / financial lines).
            </Expand>
          </li>
          <li>
            <Expand>
              DUAL: Eleanor Bunting and Georgina Dalley appoint on claims. Daniel
              Brown is Head of Financial Lines. Kerryn Symes is NSW Manager — a
              relationship contact, not a claims appointer.
            </Expand>
          </li>
          <li>
            <Expand>
              Arch: Aisling Hegarty is the national PI underwriting lead, based in
              Melbourne since February 2026. Sydney claims sit with Ananya Tiwari.
            </Expand>
          </li>
          <li>
            <Expand>
              Keystone: Jessica Kettle runs PI (jessica@ksua.com.au). John King
              and Jon Willmott remain directors; the book is national from
              Melbourne.
            </Expand>
          </li>
          <li>
            Lawcover’s primary solicitors’ panel is closed to new firms. I’ll go
            after excess / top-up markets and the law-practice managers who buy
            them.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">My next 90 days</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="min-w-full text-left text-[1.05rem]">
            <thead className="bg-paper-2 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">What I’ll do</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">This week</td>
                <td className="px-4 py-3">
                  <Expand>
                    APIG conference. I’ll leave with 8–10 follow-up coffees with
                    claims managers on this list.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Weeks 2–4</td>
                <td className="px-4 py-3">
                  <Expand>
                    Meetings with DUAL claims, Arch, HDI, Chubb financial lines,
                    Liberty PFR, SURA, ProRisk, GSA and Tank. I’ll offer one CPD
                    date each.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">October</td>
                <td className="px-4 py-3">
                  <Expand>
                    AILA National Conference in Adelaide 14–16 October: the
                    claims heads on this list will be there, so I’ll book coffees
                    before I fly. NIBA Convention 18–20 October on the Gold Coast
                    only if the budget allows; otherwise a Sydney table at the
                    next NIBA NSW lunch via Adam Hines’ committee.
                  </Expand>
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 align-top font-medium">Ongoing</td>
                <td className="px-4 py-3">
                  <Expand>
                    APIG NSW seminars, AILA twilights, Consult Australia liability
                    roundtable, UAC 2027 Sydney Exchange booking. I’ll tick
                    contacted as I go.
                  </Expand>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">What’s coming up</h2>
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
          I’ll work the{" "}
          <Link href="/leads" className="underline decoration-line underline-offset-2">
            lead list
          </Link>{" "}
          from the top, or print the whole pack from{" "}
          <Link href="/print" className="underline decoration-line underline-offset-2">
            Print pack
          </Link>
          .
        </p>
      )}
    </div>
  );
}
