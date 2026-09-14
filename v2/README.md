# Learn Finance Through Games — V2

A modernized, standalone version of the platform. V1 (`../index.html` at the repo root) is untouched and still runnable independently for side-by-side comparison.

## Run it

No build step, no server required — open the file directly:

```
v2/index.html
```

(Double-click it, or `xdg-open v2/index.html` / drag it into a browser.) It loads Chart.js from a CDN and Inter from Google Fonts; both degrade to system fonts / no chart styling gracefully if offline, but the app works fully offline otherwise — all game logic and data are local files.

## Structure

```
v2/
  index.html          markup + ARIA tablist shell
  css/styles.css       design tokens (colors, spacing, radii, shadows) + components
  js/app.js             tab navigation, localStorage progression system, shared helpers
  js/market-data.js     copy of the root data bundle (not regenerated — same source values)
  js/modules/*.js       one file per learning module
  data/*.csv             copies of the source datasets, for reference/download from the footer
```

## Data integrity

All historical data comes from the same two source datasets used at the repo root — copied here, not regenerated or altered:
- `data/investment_returns.csv` — 1926–2025 annual returns (S&P 500, housing, bonds, gold, inflation), plus a 2026 year-to-date row. The 1960 row, previously missing, has been restored via sourced reconstruction, and housing/bond are filled through 2025. On September 13, 2026 the Bond column was re-sourced to NYU Stern 10-year Treasury returns (1928–2025; JST Macrohistory for 1926–27), and the Gold column to year-end prices (U.S. official price through 1967, LBMA Gold Price PM from 1968), with per-year inputs in `../docs/sources/bond_gold_source_values.csv`. The 2026 row mixes each column's own latest observation date rather than one common cutoff — see the root `README.md` for full provenance and per-column sourcing.
- `data/spy_historical.csv` — daily SPY closing prices, September 2016 – September 9, 2026. The chart samples this to month-end closes; this is stated on the chart itself, along with the fact these are raw closing prices (not adjusted-close, not total return).

Randomness (`Math.random()`) is used in exactly one place: the Gambler's Ruin module, where it's the intentional subject of the lesson. Nowhere else does the app generate or simulate market data.

## Progression system

Stored in `localStorage` under the key `lfg_v2_progress`:

```json
{
  "version": 1,
  "modules": {
    "<trading|bias|growth|spy|gambler|poker>": {
      "bestScore": 0,
      "attempts": 0,
      "lastScore": 0,
      "updatedAt": "ISO date string"
    }
  }
}
```

No personal or identifying data is stored. A level (Retail Investor → Junior Analyst → Analyst → Portfolio Manager → Chief Investment Officer) is computed from how many modules have a recorded attempt and the average of each module's best score — never from risk-taking or portfolio size alone. "Reset progress" in the header clears this key. If the stored value is missing or unparseable, the app silently falls back to a fresh default state rather than erroring.

## Module scoring, briefly

- **Trading:** score = capital-preservation (how far the portfolio dipped below its starting value at its worst point), reported separately from a "risk posture" label and the realized outcome — explicitly framed as hindsight, not something knowable at decision time.
- **Bias:** score = % correct on your *first* answer to each question. You can go back and re-answer after reading the explanation, but that doesn't change the score.
- **Poker:** score = % correct (one answer per hand).
- **Growth / SPY:** passive/informational; credited 100 each time the module is opened.
- **Gambler's Ruin:** after ruin or 30 trials, a short comprehension check asks *why* a fair-odds game still loses money (the expense-ratio drag). A correct answer scores 100, a wrong one 0. The end-of-round message reflects whether you actually finished up or down. 10x bets stop at the 30-trial limit.

## Known limitations

- No automated test suite; QA was static analysis plus a scripted jsdom walkthrough of every tab and interaction (see handoff notes in the PR/commit description) — not a pixel-level visual check in a real browser.
- `localStorage` can be unavailable for `file://` documents in some browser/security configurations (opaque-origin restrictions). The app already handles this — progress just won't persist across reloads in that case, with a console warning rather than a crash.
- Poker images from V1 (`placehold.co`) were replaced with a local CSS panel rather than kept as external placeholder images.
- No dark-mode toggle — out of scope for this pass.
