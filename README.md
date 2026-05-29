# Part 91 → Part 135 Transition

An interactive study site for the experienced **Part 91** pilot moving into the
**Part 135** world (multi-engine turbine / turbojet, on-demand and commuter
operations). Built for both the **line pilot** and the **check airman**.

**Live site:** _enable GitHub Pages (see below) — it will be served at_
`https://<your-username>.github.io/<repo-name>/`

---

## What's inside

- **Study Guide** — the mental model first (how Parts 61/67/91/119/135 + OpSpecs
  stack), then a section-by-section review of each part.
- **Diagrams** — textbook figures: the regulatory stack, the cert tree &
  experience floor, a 12-month currency calendar, the IFR weather/alternate
  decision flow, the 135.267 duty/rest timeline, and the Part 119 scope map.
- **POA Builder** — a printable **Plan of Action** generator for required
  company checks (§135.293 competency/knowledge, §135.297 IPC, §135.299 line
  check). Fill in pilot, aircraft, date, and check airman, then print or save a
  clean PDF with checklist items and signature lines.
- **Currency Calculator** — enter last-completed dates and get next-due dates
  with the calendar-month rule applied, color-coded, and printable per pilot.
- **Study Tools** — flashcards (21), a 10-question quiz, and study methods.
- **Regulations** — the full **verbatim eCFR text** of the 17 key sections, with
  the high-impact numbers and rules highlighted, live search, and a TOC.

## Regulation validity & the daily auto-check

The banner at the top of every page shows the date the quoted regulations were
**valid from** (the baseline), plus when the site last checked for changes.

- The baseline and last-checked state live in [`data/status.json`](data/status.json).
- A scheduled **GitHub Action**
  ([`.github/workflows/check-ecfr.yml`](.github/workflows/check-ecfr.yml)) runs
  daily, queries the public **eCFR Versioner API** for the latest amendment date
  of each tracked section, compares it to the baseline, and commits an updated
  `status.json`.
- The on-page **Refresh** button re-fetches the committed `status.json` (with a
  cache-bust), so the banner reflects the latest automated check without a
  rebuild. (GitHub Pages is static, so there is no live backend — the Action is
  what does the checking.)

If a tracked section is amended after the baseline, the banner turns to a
**"changes detected"** state listing the section(s) and amendment date(s).

## Enabling GitHub Pages

1. Push this repo to GitHub (it must be **public**, or you need GitHub Pages on a
   paid plan for private repos).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
5. Wait ~1 minute; your site appears at
   `https://<your-username>.github.io/<repo-name>/`.

To let the daily Action commit `status.json`, make sure **Settings → Actions →
General → Workflow permissions** is set to **Read and write permissions**.

## Local preview

```bash
cd part135site         # or the repo root if files are at top level
python3 -m http.server 8137
# open http://localhost:8137/
```

## Project structure

```
index.html              # single-page app shell
css/style.css           # custom teal "instrument-panel" theme, light/dark, print
js/app.js               # nav, POA builder, currency calc, flashcards, quiz, regs, refresh
data/content.js         # POA templates, flashcards, quiz, currency items
data/regs.json          # 17 verbatim sections w/ highlight markup (generated)
data/status.json        # reg-validity baseline + latest check result (auto-updated)
diagrams/               # 6 textbook figures (PNG)
assets/favicon.svg      # logo
scripts/check_ecfr.py   # the daily eCFR amendment checker
.github/workflows/      # the scheduled Action
```

## Disclaimer

This is a **study aid** built from 14 CFR Parts 61, 67, 91, 119 & 135. It is
**not** a substitute for the regulations, your company OpSpecs / GOM, or guidance
from your POI. Always verify against the current eCFR.
