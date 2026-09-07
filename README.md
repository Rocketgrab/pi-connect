# Sydney professional indemnity playbook

A small website for business development in the Sydney professional indemnity market: insurers, underwriting agencies (MGAs), brokers, committees and events.

It is meant for the person who owns BD. Use it on a phone in a taxi, on a laptop, or print the pack and email the PDF.

## Pages

- **Summary** — strategy, top ten by impact, and what to do this week
- **Lead list** — names ranked by impact (0–100) with a Contacted checkbox (saved in the browser)
- **Contact information** — switchboards, emails, committees, events
- **Print pack** — browser Print or Save as PDF

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43141](http://localhost:43141).

## Notes

- Contacts were checked against public sources in September 2026. Confirm before first contact.
- Impact scores live in `data/leads.ts`; tiers and sort order in `lib/ranking.ts`. Edit the number to re-rank.
- The site is dark on screen and prints black on white.
- Direct emails are included only where they are published.
- Contacted ticks are stored in `localStorage` on that browser only.
