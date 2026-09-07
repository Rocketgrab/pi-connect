"use client";

import { useEffect } from "react";

export function LightDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("light-document");
    return () => document.documentElement.classList.remove("light-document");
  }, []);
  return <>{children}</>;
}
