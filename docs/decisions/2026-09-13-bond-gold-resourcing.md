# ADR: Re-source the Bond and Gold columns of investment_returns.csv

- **Date:** 2026-09-13
- **Status:** Accepted (decided by Michael Kiernan)
- **Files affected:** `investment_returns.csv`, `v2/data/investment_returns.csv`, `market-data.js`, `v2/js/market-data.js`, `README.md` (sections 3, 4, 6, 9–15), `v2/README.md`, `docs/sources/bond_gold_source_values.csv`

## Context

A full review of the repository compared both columns against first-party source files:

- **Bond.** 94 of the 95 values for 1926–2020 match the JST Macrohistory Database R6 USA `bond_tr`, a longer-duration government bond series. The exception is 1960, which uses NYU Stern's 10-year figure (11.64% vs. JST 13.14%). 2021–2025 were also Stern 10-year, because JST R6 ends in 2020. The column therefore switched bond duration twice without documentation. JST itself publishes 11.87% for both 2019 and 2020.
- **Gold.** 98 of the 100 values for 1926–2025 match the DataHub `gold-prices` annual file, which measures annual-average price changes (World Bank data from 1960). 1960 was a year-end figure, and 1961 was a 1959→1961 two-year change. The 2026 YTD value was point-to-point from GoldPrice.org, which is not a first-party source. The README defines every column as start-of-year to end-of-year.

## Options considered

| Column | Option | Values changed |
|---|---|---|
| Bond | **A. Rebase 1928–2025 to NYU Stern 10-year (JST for 1926–27)** | 92 |
| Bond | B. Keep JST through 2020, fix 1960, document the 2021 series change | 1 |
| Gold | **A. Year-end prices: U.S. official price through 1967, LBMA Gold Price PM from 1968** | 92 |
| Gold | B. Annual average throughout; restate 2026 YTD on that basis (+33.09%) | 3 |
| Gold | C. Fix 1960–61 only; document the basis break | 2 |

## Decision

Bond option A and Gold option A.

- Bond: one methodology for 98 of 100 years. Stern publishes its own calculation from FRED 10-year constant-maturity yields and updates it every year, so future years come from the same series.
- Gold: matches the dataset's start-to-end-of-year definition and the other columns, and uses the first-party benchmark administrator (LBMA). Pre-1968 values use the U.S. official price as documented by Federal Reserve History.

## Consequences

- Growth of $100 from 1926 to 2026 YTD, as plotted in module 3: Bonds $8,203 (previously $10,082); Gold $21,215 (previously $16,967).
- A series change remains between 1927 (JST) and 1928 (Stern), and at 2026 YTD (IEF proxy). Both are documented in README sections 6 and 13.
- Gold is 0.00% in every year from 1926 to 1967 except 1934 (+69.33%), because the official price was fixed by law. Documented in README section 9.
- The source files are hashed (SHA-256) in the README. Per-year inputs are in `docs/sources/bond_gold_source_values.csv`.
- Revisit if JST publishes a release extending past 2020 with a 10-year series, or if Stern revises its historical methodology.
