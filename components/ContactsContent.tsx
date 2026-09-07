import { ContactedCheckbox } from "@/components/ContactedCheckbox";
import { Expand } from "@/components/Expand";
import { events, organisations } from "@/data/leads";
import { typeLabel } from "@/lib/acronyms";

export function ContactsContent() {
  return (
    <div>
      <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
        Switchboards, people, committees
      </p>
      <h1 className="mt-2 text-[2rem] font-medium leading-tight sm:text-[2.2rem]">
        Who I call
      </h1>
      <p className="mt-3 max-w-3xl text-[1.1rem] leading-relaxed text-ink">
        I’ve only put a direct email here where it sits on a public claims
        sheet, team page or association site. Where it isn’t published, I’ll
        use the switchboard and ask for the claims or <Expand>PI</Expand> lead
        by title.
      </p>

      <section className="mt-10">
        <h2 className="text-[1.45rem] font-medium">Committees and annual rooms</h2>
        <ul className="mt-4 grid gap-3">
          {events.map((event) => (
            <li key={event.id} className="rounded-xl border border-line bg-white p-5 print-card">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[0.85rem] uppercase tracking-[0.1em] text-ink-soft">
                    {event.status}
                  </p>
                  <p className="mt-1 text-[1.18rem] font-medium">
                    <Expand>{event.name}</Expand>
                  </p>
                  <p className="text-[1.02rem] text-ink-soft">
                    {event.when}
                    <br />
                    {event.where}
                  </p>
                  <p className="mt-2 text-[1.05rem] leading-relaxed">
                    <Expand>{event.why}</Expand>
                  </p>
                  {event.contact ? (
                    <p className="mt-2 text-[1.02rem]">{event.contact}</p>
                  ) : null}
                  {event.website ? (
                    <p className="mt-2 text-[1.02rem]">
                      <a
                        className="break-all underline decoration-line underline-offset-2"
                        href={event.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {event.website.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 rounded-lg border border-line bg-paper px-3 py-2 no-print">
                  <ContactedCheckbox id={`event-${event.id}`} compact />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="text-[1.45rem] font-medium">Organisations</h2>
        {organisations.map((org) => (
          <article key={org.id} className="rounded-xl border border-line bg-white p-5 sm:p-6 print-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[0.85rem] uppercase tracking-[0.1em] text-ink-soft">
                  {typeLabel(org.type)}
                </p>
                <h3 className="mt-1 text-[1.28rem] font-medium">
                  <Expand>{org.name}</Expand>
                </h3>
              </div>
              <div className="shrink-0 rounded-lg border border-line bg-paper px-3 py-2 no-print">
                <ContactedCheckbox id={org.id} compact />
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-[1.05rem] sm:grid-cols-2">
              {org.sydneyAddress ? (
                <div className="sm:col-span-2">
                  <dt className="text-ink-soft">Sydney</dt>
                  <dd>{org.sydneyAddress}</dd>
                </div>
              ) : null}
              {org.phone ? (
                <div>
                  <dt className="text-ink-soft">Phone</dt>
                  <dd>
                    <a href={`tel:${org.phone.replace(/\s/g, "")}`}>{org.phone}</a>
                  </dd>
                </div>
              ) : null}
              {org.email ? (
                <div>
                  <dt className="text-ink-soft">Email</dt>
                  <dd>
                    <a href={`mailto:${org.email}`}>{org.email}</a>
                  </dd>
                </div>
              ) : null}
              {org.website ? (
                <div className="sm:col-span-2">
                  <dt className="text-ink-soft">Web</dt>
                  <dd>
                    <a href={org.website} target="_blank" rel="noreferrer">
                      {org.website.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {org.people.map((person) => (
                <li key={`${org.id}-${person.name}`} className="py-3">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-[1.02rem] text-ink-soft">
                    <Expand>{person.role}</Expand>
                  </p>
                  <p className="mt-1 text-[1.02rem]">
                    {person.email ? (
                      <a className="mr-4 underline decoration-line underline-offset-2" href={`mailto:${person.email}`}>
                        {person.email}
                      </a>
                    ) : null}
                    {person.phone ? <span>{person.phone}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
            {org.notes ? (
              <p className="mt-3 text-[1.02rem] text-ink-soft">
                <Expand>{org.notes}</Expand>
              </p>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
}
