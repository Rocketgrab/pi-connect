const pdfHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sydney-pi-checklist.pdf`;

export function PrintControls() {
  return (
    <div className="shrink-0">
      <a
        href={pdfHref}
        className="inline-block cursor-pointer rounded-md bg-accent px-5 py-3 text-[1.08rem] font-medium text-ink"
      >
        Download PDF
      </a>
      <p className="mt-2 max-w-xs text-[0.95rem] leading-snug text-ink-soft">
        Opens a PDF of the full pack — plan, every lead, then contacts.
        To print this page instead, press Ctrl+P (Cmd+P on a Mac).
      </p>
    </div>
  );
}
