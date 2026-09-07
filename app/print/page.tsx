"use client";

import { ContactsContent } from "@/components/ContactsContent";
import { LeadsContent } from "@/components/LeadsContent";
import { StrategyContent } from "@/components/StrategyContent";

export default function PrintPage() {
  return (
    <div>
      <div className="no-print mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.85rem] uppercase tracking-[0.14em] text-accent">
            Email and print
          </p>
          <h1 className="mt-2 text-[2rem] font-medium leading-tight">Print pack</h1>
          <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed">
            Full pack: plan, every lead with next steps, then committees,
            events and switchboards. Print or save as PDF. Contacted ticks from
            this browser show on the list.
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

      <StrategyContent forPrint />

      <section className="print-break mt-12">
        <LeadsContent printable />
      </section>

      <section className="print-break mt-12">
        <ContactsContent />
      </section>
    </div>
  );
}
