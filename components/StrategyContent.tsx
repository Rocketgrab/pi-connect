import Link from "next/link";
import { events } from "@/data/leads";
import { PLAN } from "@/data/plan";
import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { Expand } from "@/components/Expand";
import { rankedLeads } from "@/lib/ranking";

const instructNow = rankedLeads.filter((lead) => lead.tier.key === "instruct").length;
const topTen = rankedLeads.slice(0, 10);

export function StrategyContent({ forPrint = false }: { forPrint?: boolean }) {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
          {PLAN.kicker}
        </p>
        <h1 className="mt-2 max-w-3xl text-[2rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
          {PLAN.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[1.12rem] leading-relaxed text-ink">
          {PLAN.intro}
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
            <Expand>{PLAN.thisWeek.title}</Expand>
          </p>
          <p className="text-[1.02rem] text-ink-soft">{PLAN.thisWeek.detail}</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[0.9rem] uppercase tracking-[0.1em] text-ink-soft">Who pays</p>
          <p className="mt-1 text-[1.35rem] font-medium leading-snug">{PLAN.whoPays.title}</p>
          <p className="text-[1.02rem] text-ink-soft">{PLAN.whoPays.detail}</p>
        </div>
      </section>

      <section className="rounded-xl border border-accent/30 bg-accent-soft/60 p-6">
        <h2 className="text-[1.4rem] font-medium">{PLAN.thursdayTitle}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          {PLAN.thursday.map((line) => (
            <li key={line}>
              <Expand>{line}</Expand>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[1.5rem] font-medium">{PLAN.movesTitle}</h2>
        <ol className="space-y-4">
          {PLAN.moves.map((item, index) => (
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
          <Expand>{PLAN.topTenBlurb}</Expand>
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
        <h2 className="text-[1.5rem] font-medium">{PLAN.beforeEmailTitle}</h2>
        <ul className="list-disc space-y-2 pl-6 text-[1.08rem] leading-relaxed">
          {PLAN.beforeEmail.map((line) => (
            <li key={line}>
              <Expand>{line}</Expand>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[1.5rem] font-medium">{PLAN.ninetyDaysTitle}</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="min-w-full text-left text-[1.05rem]">
            <thead className="bg-paper-2 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">To-do</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.ninetyDays.map((row) => (
                <tr key={row.when} className="border-t border-line">
                  <td className="px-4 py-3 align-top font-medium">{row.when}</td>
                  <td className="px-4 py-3">
                    <Expand>{row.todo}</Expand>
                  </td>
                </tr>
              ))}
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
