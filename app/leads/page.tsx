import { LeadList } from "@/components/LeadList";
import { leads } from "@/data/leads";

export default function LeadsPage() {
  return (
    <div>
      <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
        {leads.length} people and desks
      </p>
      <h1 className="mt-2 text-[2rem] font-medium leading-tight sm:text-[2.2rem]">
        Lead list
      </h1>
      <p className="mt-3 max-w-3xl text-[1.1rem] leading-relaxed text-ink">
        Tick <span className="font-medium">Contacted</span> as you go. The tick
        stays in this browser so two people on the same laptop can share one
        list. Priority 1 is this month. Filter by insurer, MGA, broker,
        association or event.
      </p>
      <div className="mt-8">
        <LeadList />
      </div>
    </div>
  );
}
