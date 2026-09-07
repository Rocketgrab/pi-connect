"use client";

import { useState } from "react";

const pdfHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sydney-pi-checklist.pdf`;

export function PrintControls() {
  const [error, setError] = useState("");

  async function savePdf() {
    setError("");
    try {
      const response = await fetch(pdfHref);
      if (!response.ok) throw new Error("Could not fetch the PDF.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "sydney-pi-checklist.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Save failed. Use the Print pack page, or press Ctrl+P.");
    }
  }

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => void savePdf()}
        className="inline-block cursor-pointer rounded-md bg-accent px-5 py-3 text-[1.08rem] font-medium text-ink"
      >
        Download PDF
      </button>
      <p className="mt-2 max-w-xs text-[0.95rem] leading-snug text-ink-soft">
        Saves a black-on-white PDF of the full pack. This page is the same
        content if a preview window cannot show PDFs. To print, press Ctrl+P
        (Cmd+P on a Mac).
      </p>
      {error ? <p className="mt-2 max-w-xs text-[0.95rem] text-accent">{error}</p> : null}
    </div>
  );
}
