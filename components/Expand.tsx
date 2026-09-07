import type { ReactNode } from "react";
import { expandAcronyms } from "@/lib/acronyms";

function flatten(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  return "";
}

export function Expand({ children }: { children?: ReactNode }) {
  const text = flatten(children);
  if (!text) return null;
  return <>{expandAcronyms(text)}</>;
}
