# Sydney professional indemnity BD checklist

Working list for the Sydney professional indemnity market: insurers, managing
general agents (MGAs), brokers, committees and events.

Use it on a phone, on a laptop, or print the pack and email the PDF.

## Pages

- **Plan** — strategy, top ten, and this week
- **Leads** — names ranked by impact (0–100) with a Contacted checkbox (saved in the browser)
- **Contacts** — switchboards, emails, committees, events
- **Print** — the full plan, every lead card, and the full contact directory, ready to Print or Save as PDF

Industry acronyms are written as `PI (professional indemnity)` throughout.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43141](http://localhost:43141).

## Publish a site you can send

This project builds as a static site (`out/` after `npm run build`). A GitHub
Actions workflow deploys that folder to GitHub Pages on every push to `main`.

1. Create a public GitHub repository for this project (in Cursor, use the
   **Create repo** control if you have not already).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Merge or push this branch to `main`.
4. The live URL will be `https://<your-github-username>.github.io/<repo-name>/`.

Until that is live, send the print pack: open `/print`, choose **Print or save PDF**,
and email the PDF.

## Notes

- Contacts were checked against public sources in September 2026. Confirm before first contact.
- Impact scores live in `data/leads.ts`; tiers and sort order in `lib/ranking.ts`. Edit the number to re-rank.
- Acronym expansions live in `lib/acronyms.ts`.
- The site is dark on screen and prints black on white.
- Direct emails are included only where they are published.
- Contacted ticks are stored in `localStorage` on that browser only.
