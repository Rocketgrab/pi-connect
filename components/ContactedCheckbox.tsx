"use client";

import { useContacted } from "@/lib/contacted";

export function ContactedCheckbox({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const { ready, isContacted, setContacted } = useContacted();
  const checked = ready && isContacted(id);

  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        compact ? "text-[0.95rem]" : "text-[1.05rem]"
      }`}
    >
      <input
        type="checkbox"
        className="contacted-box"
        checked={checked}
        disabled={!ready}
        onChange={(e) => setContacted(id, e.target.checked)}
        aria-label="Contacted"
      />
      <span className={checked ? "text-ink-soft" : "text-ink"}>Contacted</span>
    </label>
  );
}
