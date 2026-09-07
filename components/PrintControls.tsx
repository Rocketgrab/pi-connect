"use client";

import { useState } from "react";

function isEmbedded(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function printNow() {
  if (isEmbedded()) {
    const opened = window.open(window.location.href, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.print();
    }
    return;
  }
  window.print();
}

export function PrintControls() {
  const [hint, setHint] = useState(false);

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => {
          setHint(true);
          printNow();
        }}
        className="cursor-pointer rounded-md bg-accent px-5 py-3 text-[1.08rem] font-medium text-ink"
      >
        Print or save PDF
      </button>
      <p className="mt-2 max-w-xs text-[0.95rem] leading-snug text-ink-soft">
        {hint
          ? "If nothing opened, press Ctrl+P (Cmd+P on a Mac) and choose Save as PDF."
          : "Opens the print dialog. Choose Save as PDF to email the pack."}
      </p>
    </div>
  );
}
