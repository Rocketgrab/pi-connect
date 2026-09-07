"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Summary" },
  { href: "/leads", label: "Lead list" },
  { href: "/contacts", label: "Contact information" },
  { href: "/print", label: "Print pack" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print border-b border-line bg-paper-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <p className="text-[0.78rem] uppercase tracking-[0.16em] text-accent">
            Sydney · Professional indemnity
          </p>
          <p className="truncate text-[1.25rem] font-medium text-ink">
            Business development playbook
          </p>
        </Link>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md border border-line px-3 text-[1rem] md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-[1.02rem] ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-paper"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {open ? (
        <nav className="border-t border-line px-5 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-[1.1rem]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
