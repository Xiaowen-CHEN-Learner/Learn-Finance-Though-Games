# Learn-Finance-Though-Games
Website: https://xiaowen-chen-learner.github.io/Learn-Finance-Though-Games/
1. Event Trading: Aims at provide insight of how events trigger price
2. Cognitive Bias: Help people understand the common biases
3. Gold Inflation Chart: Help understand US finance history in the past 100 years
4. SPY Macros: Help understand what happened in the last 20 years
5. Why gamblers lose: Help understand what gambling means
6. Poker: Help improve math & statistical understanding of poker

Dataset Sources: 

1. Download: investment_returns.csv (corrected and extended through 2026 YTD — see full provenance below)


# 1926–2026 YTD Investment Comparison
## Complete Source Documentation, Provenance, Corrections, and Methodology

**Companion dataset:** `investment_returns.csv` (repo root and `v2/data/`)  
**Coverage:** Calendar years 1926–2025 plus a 2026 year-to-date row  
**Columns:** Inflation, S&P 500, Housing, Bonds, and Gold  
**Documentation date:** September 11, 2026 (Bond and Gold columns re-sourced September 13, 2026 — see sections 6 and 9)

---

## 1. Purpose of the Dataset

The dataset is designed to answer the following question:

> If $100 were invested at the beginning of a year in a particular investment vehicle, how much would the investment gain or lose by the end of that year?

The CSV reports annual percentage returns or annual changes for five measures:

1. Inflation
2. S&P 500
3. Housing
4. Bonds
5. Gold

The historical data through 2025 originated from a compiled dataset credited to Brady Xue. The dataset was subsequently corrected and extended through 2026 YTD. The original dataset and the 2026 extension use different upstream sources, as documented below.

---

## 2. Original Historical Dataset, 1926–2025

### Dataset attribution

- **Dataset title:** 1926-2025 Investment Commodities Comparison by Year
- **Compiler:** Brady Xue
- **Update description supplied with the download:** Updated approximately two months before download
- **Original dataset page:** The specific download-page URL was not included in the supplied provenance text. It should be added here if available.

### Original dataset description

The supplied description states that the dataset brings together annual data on inflation, the S&P 500, housing, bonds, and gold to measure the one-year outcome of investing $100 at the beginning of each year.

### Upstream sources cited by the original dataset compiler

> **Superseded for Bonds and Gold.** The Bond and Gold columns below are the compiler's original citations, kept for the record. Since September 13, 2026 both columns come from different first-party sources, described in sections 6 and 9. Inflation, S&P 500, and Housing are unchanged.

#### Inflation

- **Source:** Macrotrends, U.S. Historical Inflation Rate by Year
- **URL:** https://www.macrotrends.net/datasets/2497/historical-inflation-rate-by-year

#### S&P 500

- **Source:** SlickCharts, S&P 500 Total Returns by Year
- **URL:** https://www.slickcharts.com/sp500/returns

#### Housing

- **Source:** Jordà-Schularick-Taylor Macrohistory Database
- **URL:** https://www.macrohistory.net/database/

#### Bonds

- **Source:** Jordà-Schularick-Taylor Macrohistory Database
- **URL:** https://www.macrohistory.net/database/

#### Gold

- **Source:** DataHub/GitHub Gold Prices annual dataset
- **URL:** https://github.com/datasets/gold-prices/blob/main/data/annual.csv

### Historical-source limitation

The original dataset provides source attribution by column, not a distinct source citation for every individual cell. Accordingly:

- All original 1926–2025 observations inherit the column-level source attribution listed above.
- The source documentation does not show the exact transformation, join, date alignment, or calculation applied to every original historical observation.
- The historical columns may use different economic concepts. For example, S&P 500 and bond figures may represent investment total returns, while housing may represent a change in a home-price index rather than a complete rental-property return.
- The Inflation column is presented using the convention in the supplied CSV, where inflation is shown as a negative effect on purchasing power.

---

## 3. Corrections and Additions Made to the Dataset

The following changes were made after the original download:

1. Restored the missing 1960 row.
2. Renumbered the first column sequentially after restoring 1960.
3. Filled missing Housing values for 2021–2025.
4. Filled missing Bond values for 2021–2025.
5. Added a complete 2026 YTD row for Inflation, S&P 500, Housing, Bonds, and Gold.
6. Preserved the remaining original historical values unless specifically identified as corrected or added.
7. **September 13, 2026:** Re-sourced the entire Bond column (1926–2025) so that it follows one 10-year Treasury methodology. See section 6.
8. **September 13, 2026:** Re-sourced the entire Gold column (1926–2026 YTD) from annual-average prices to year-end prices. See section 9.

The completed dataset contains every calendar year from 1926 through 2025, followed by one 2026 YTD row. Each year's Bond and Gold inputs (source, dates, prices) are recorded in `docs/sources/bond_gold_source_values.csv`.

---

## 4. Restored 1960 Row

The original downloaded CSV skipped directly from 1959 to 1961. The following row was restored:

| Year | Inflation | S&P 500 | Housing | Bonds | Gold |
|---:|---:|---:|---:|---:|---:|
| 1960 | -1.46% | 0.47% | 4.74% | 11.64% | 0.00% |

### Source treatment for 1960

The 1960 Gold value was restated from 0.48% to 0.00% on September 13, 2026, when the Gold column moved to year-end prices. Gold's official U.S. price was $35.00 at both year-end 1959 and year-end 1960 (section 9). The 1960 Bond value (11.64%) is NYU Stern's figure, which the whole Bond column now uses (section 6).

The restored values follow the conventions of the supplied long-run dataset. The 1960 bond-return cross-check is supported by the New York University Stern historical-return dataset listed below. However, because the original compiler's exact data-processing workbook or code was not supplied, the restored 1960 row should be understood as a reconstruction under the historical dataset's conventions rather than a verbatim recovery from the original downloadable file.

- **NYU Stern historical returns:** https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
- **U.S. Bureau of Labor Statistics CPI information:** https://www.bls.gov/cpi/
- **Macrohistory Database:** https://www.macrohistory.net/database/
- **SlickCharts S&P 500 returns:** https://www.slickcharts.com/sp500/returns
- **Gold annual data:** https://github.com/datasets/gold-prices/blob/main/data/annual.csv

---

## 5. Housing Additions, 2021–2026 YTD

### Source

- **Series:** S&P Cotality Case-Shiller U.S. National Home Price Index, Seasonally Adjusted
- **Publisher/source:** S&P Dow Jones Indices through the Federal Reserve Bank of St. Louis FRED service
- **FRED series ID:** `CSUSHPISA`
- **URL:** https://fred.stlouisfed.org/data/CSUSHPISA

### Calculation method

For 2021–2025, annual Housing returns were calculated from December-to-December index levels:

`Annual housing return = (December index / prior December index) - 1`

For 2026 YTD, the calculation uses December 2025 and the latest published 2026 observation available when the file was updated:

- December 2025 index: 331.288
- June 2026 index: 331.893
- Calculation: `(331.893 / 331.288) - 1 = 0.18%`, rounded

### Values added

| Year | Housing return |
|---:|---:|
| 2021 | 19.02% |
| 2022 | 5.75% |
| 2023 | 5.74% |
| 2024 | 4.04% |
| 2025 | 1.17% |
| 2026 YTD through June | 0.18% |

### Housing interpretation

The Housing return is a change in a national home-price index. It is not a full return on a directly owned rental property. It excludes rental income, imputed rent, leverage, mortgage interest, property taxes, insurance, maintenance, improvements, transaction costs, and other ownership expenses.

---

## 6. Bonds, 1926–2026 YTD (re-sourced September 13, 2026)

### Why the column was re-sourced

Before this change the Bond column combined three different series:

- 1926–1959 and 1961–2020 came from the Jordà-Schularick-Taylor (JST) Macrohistory Database, USA `bond_tr`. JST uses a longer-duration government bond (e.g. 2011: 25.34%, 2014: 24.39%).
- 1960 was the NYU Stern 10-year figure (JST gives 13.14%).
- 2021–2025 were NYU Stern 10-year figures, because JST Release 6 ends in 2020.

The column therefore switched bond duration twice, and the README didn't say so. JST R6 also publishes the same value, 11.87%, for both 2019 and 2020; Stern's 10-year returns for those years are 9.64% and 11.33%.

### Source, 1928–2025 (98 years)

- **Source:** Aswath Damodaran, New York University Stern School of Business, *Historical Returns on Stocks, Bonds and Bills: 1928–2025*
- **Series:** "US T. Bond (10-year)", sheet "Returns by year"
- **Method (as stated by the source):** 10-year constant-maturity Treasury yields from FRED. Each year's return reprices a par bond issued at the prior year-end yield using the new year-end yield, and adds the coupon.
- **URL:** https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
- **File:** https://pages.stern.nyu.edu/~adamodar/pc/datasets/histretSP.xls, retrieved September 13, 2026, SHA-256 `28b8110916a15a4dcc11c87c6422510704608ddedcdfa67a1298abdc22e49c69`
- **Rounding:** returns converted to percent and rounded half-up to two decimals

### Source, 1926–1927 (2 years)

Stern's series begins in 1928. For 1926 and 1927 the column keeps the JST values (5.29% and 3.72%):

- **Source:** Òscar Jordà, Moritz Schularick, and Alan M. Taylor, Macrohistory Database, Release 6, USA `bond_tr`
- **URL:** https://www.macrohistory.net/database/
- **File:** `JSTdatasetR6.xlsx`, retrieved September 13, 2026, SHA-256 `c1bb91fe56ea50d4f27af5c0fc897d481e89ae38ce41eaecab62134c9354981d`

The column therefore changes series between 1927 and 1928. JST's bond has a longer duration than Stern's constant-maturity 10-year bond.

The bond return includes both coupon income and bond-price appreciation or depreciation. It is not the same as the quoted 10-year Treasury yield.

### Selected values after re-sourcing

| Year | Previous value | Current value |
|---:|---:|---:|
| 1934 | 10.88% | 7.96% |
| 1982 | 36.34% | 32.81% |
| 2011 | 25.34% | 16.04% |
| 2019 | 11.87% | 9.64% |
| 2020 | 11.87% | 11.33% |
| 2021–2025 | unchanged | -4.42%, -17.83%, 3.88%, -1.64%, 7.80% |

92 of 100 annual values changed. The previous and current value for every year can be compared with `git diff` on `investment_returns.csv`.

### 2026 YTD bond proxy

The annual NYU Stern series did not yet contain a 2026 observation. Therefore, the 2026 YTD continuation uses an investable intermediate-term Treasury proxy:

- **Fund:** iShares 7-10 Year Treasury Bond ETF
- **Ticker:** `IEF`
- **Measure:** NAV total return
- **Cutoff:** September 10, 2026
- **2026 YTD return:** -2.63%
- **URL:** https://www.ishares.com/us/products/239456/ishares-710-year-treasury-bond-etf

### Bond-series limitation

The 1928–2025 values use the NYU Stern 10-year Treasury methodology, while 2026 YTD uses the IEF 7-10 year Treasury ETF. IEF is a close, investable proxy, but it is not identical to the historical NYU series and includes fund expenses and portfolio-index mechanics.

---

## 7. Inflation, 2026 YTD

### Sources

- **December 2025 CPI release:** https://www.bls.gov/news.release/archives/cpi_01132026.htm
- **August 2026 CPI-U table:** https://www.bls.gov/news.release/cpi.t01.htm

### Calculation

- December 2025 CPI-U: 324.054
- August 2026 CPI-U: 334.980
- CPI change: `(334.980 / 324.054) - 1 = 3.37%`, rounded

The CSV uses a negative sign to represent the loss of purchasing power from inflation:

- **2026 YTD Inflation entry:** -3.37%

### Interpretation warning

This sign convention is not the conventional way inflation rates are normally reported. A conventional CPI presentation would show positive 3.37% inflation over the period. The dataset records negative 3.37% to reflect the purchasing-power effect on $100.

---

## 8. S&P 500, 2026 YTD

- **Source:** ChartRow, S&P 500 YTD Return
- **URL:** https://chartrow.com/sp500/ytd
- **Measure:** Total return with dividends reinvested
- **Cutoff:** September 11, 2026 market close
- **2026 YTD return:** 12.67%

### Interpretation

This figure is a total return, not merely the change in the S&P 500 price index. It assumes reinvestment of distributions and does not deduct investor-specific taxes, trading costs, or advisory fees.

---

## 9. Gold, 1926–2026 YTD (re-sourced September 13, 2026)

### Why the column was re-sourced

The original Gold column (DataHub/GitHub `gold-prices` annual file, which uses World Bank annual averages from 1960 on) measured the change in the **annual-average** price. That doesn't match this dataset's stated purpose in section 1: $100 invested at the start of a year and valued at its end. The other columns measure start-to-end of year, and so did the previous 2026 YTD gold value, which was point-to-point. Two further errors in the original column:

- 1960 had been filled with a year-end-based figure (0.48%) inside an otherwise average-based column.
- The original 1961 value (-0.28%) was really the two-year change from 1959 to 1961, because the source file has no 1960 row.

### Method

`Gold return for year Y = (year-end price Y / year-end price Y-1) - 1`, rounded half-up to two decimals.

| Period | Year-end price used | Source |
|---|---|---|
| 1925–1933 | $20.67 per troy ounce, the U.S. official gold price | Federal Reserve History, "Gold Reserve Act of 1934": https://www.federalreservehistory.org/essays/gold-reserve-act |
| 1934–1967 | $35.00 per troy ounce, the U.S. official price set by presidential proclamation on January 31, 1934, the day after the Gold Reserve Act was signed | Same source |
| 1968–2025 | The last LBMA Gold Price PM (USD) fixing published in each calendar year | LBMA (London Bullion Market Association), https://www.lbma.org.uk/prices-and-data/lbma-precious-metal-prices ; data file `https://prices.lbma.org.uk/json/gold_pm.json`, retrieved September 13, 2026, SHA-256 `1055e6f4e1ddf107d8c34591f97e9130dec2fa1339a73143d5ac8ba56fe67467` |
| 2026 YTD | LBMA Gold Price PM, 2025-12-30 ($4,367.80) to 2026-09-11 ($4,386.25) | Same LBMA file |

Each year's start and end dates and prices are listed in `docs/sources/bond_gold_source_values.csv`.

### Treatment notes

- **1933–1934 revaluation.** The U.S. left the fixed $20.67 price in the spring of 1933, but the legal price did not change until January 31, 1934. Under the year-end official-price rule, the whole revaluation shows up in 1934 (+69.33%) and 1933 shows 0.00%. Treat it as a change in the official price, not a return an American investor could have earned. Federal Reserve History notes that the program "which began in 1933, first restricted the private use of gold."
- **Pre-1968 values are official prices, not market prices.** From 1934 to 1967 the official price was fixed, so the column shows 0.00% for those years. Free-market prices outside the U.S. could differ somewhat.
- **1967–1968 transition.** LBMA's published series begins on 1968-04-01. The London gold market closed on March 15, 1968 and reopened on April 1 under a two-tier system: official transactions stayed at $35, while the private market price floated (LBMA, "March 1968 and the London Gold Fixing": https://www.lbma.org.uk/wonders-of-gold/items/march-1968-and-the-london-gold-fixing). The 1968 return is measured from the $35.00 official price at year-end 1967 to the LBMA PM fixing on 1968-12-31 ($41.90): +19.71%.
- **Choice of fixing.** LBMA publishes AM and PM fixings. This column always uses the last PM fixing of the year. When no PM fixing is held on December 31 (common because of the shortened year-end trading day), the last PM fixing before it is used, e.g. 2024-12-30 and 2025-12-30. NYU Stern's gold year-end prices mix AM, PM, and averaged values, so this column's values will differ slightly from Stern's (e.g. 2025: 67.41% here vs. 66.22% at Stern).

### Selected values after re-sourcing

| Year | Previous value (annual-average basis) | Current value (year-end basis) |
|---:|---:|---:|
| 1933 | 27.26% | 0.00% |
| 1934 | 31.75% | 69.33% |
| 1979 | 58.90% | 126.55% |
| 1980 | 98.26% | 15.19% |
| 2024 | 22.89% | 25.53% |
| 2025 | 44.16% | 67.41% |
| 2026 YTD | 1.25% (GoldPrice.org) | 0.42% (LBMA) |

92 of 101 values changed.

### Interpretation

The calculation represents price appreciation only. It does not include storage, insurance, transaction costs, dealer spreads, management fees, or taxes.

---

## 10. Complete 2026 YTD Row

| Period | Inflation | S&P 500 | Housing | Bonds | Gold |
|---|---:|---:|---:|---:|---:|
| 2026 YTD | -3.37% | 12.67% | 0.18% | -2.63% | 0.42% |

---

## 11. 2026 YTD Cutoff Dates

The 2026 YTD row does not use a single common observation date. It uses the latest actual observation available for each measure when the dataset was updated:

| Measure | Observation cutoff |
|---|---|
| Housing | June 2026 |
| Inflation | August 2026 |
| Bonds | September 10, 2026 |
| Gold | September 11, 2026 (LBMA PM fixing) |
| S&P 500 | September 11, 2026 |

Therefore, the 2026 YTD row is a latest-available snapshot, not a perfectly synchronized same-date comparison. Any chart, game, analysis, or publication using this row should display this limitation.

---

## 12. Source Map by Period and Column

| Period | Inflation | S&P 500 | Housing | Bonds | Gold |
|---|---|---|---|---|---|
| 1926–1927 | Macrotrends, as cited by Brady Xue | SlickCharts, as cited by Brady Xue | Macrohistory Database, as cited by Brady Xue | JST Macrohistory Database R6 `bond_tr` | U.S. official gold price $20.67 (Federal Reserve History) |
| 1928–1967 | Macrotrends, as cited by Brady Xue | SlickCharts, as cited by Brady Xue | Macrohistory Database, as cited by Brady Xue | NYU Stern 10-year Treasury return | U.S. official gold price: $20.67, then $35.00 from Jan 31, 1934 (Federal Reserve History) |
| 1968–2020 | Macrotrends, as cited by Brady Xue | SlickCharts, as cited by Brady Xue | Macrohistory Database, as cited by Brady Xue | NYU Stern 10-year Treasury return | LBMA Gold Price PM, last fixing of each year |
| 2021–2025 | Original Brady Xue dataset | Original Brady Xue dataset | FRED Case-Shiller calculation added during update | NYU Stern 10-year Treasury return | LBMA Gold Price PM, last fixing of each year |
| 2026 YTD | BLS CPI-U calculation | ChartRow total return | FRED Case-Shiller calculation | iShares IEF NAV total return proxy | LBMA Gold Price PM, 2025-12-30 to 2026-09-11 |
---

## 13. Data-Quality and Comparability Limitations

1. **Column-level historical sourcing:** The original 1926–2025 dataset cites upstream sources by column, rather than documenting every cell separately.
2. **Different investment concepts:** The columns do not all measure the same type of return. The S&P 500 and bonds may include income, while Housing and Gold primarily reflect price changes.
3. **Housing is not a complete property return:** Rental income and property ownership costs are excluded.
4. **Inflation uses a negative sign convention:** Negative values represent purchasing-power erosion rather than the conventional published inflation rate.
5. **Historical and extension methodologies differ:** The 2021–2026 additions use sources selected to complete missing observations, not necessarily the exact processing methodology used by the original compiler.
6. **2026 YTD dates differ:** The latest available observation date varies by column.
7. **Bond series change at 1928:** 1926–1927 use JST's longer-duration government bond return; 1928 onward uses NYU Stern's 10-year constant-maturity Treasury return. The 2026 YTD bond value is an IEF (7–10 year) proxy.
8. **Gold before 1968 is an official price:** 1926–1967 gold returns come from the U.S. official price ($20.67, then $35.00), not a free-market price, so every year is 0.00% except the 1934 revaluation (+69.33%).
9. **Rounding:** Values in the CSV are generally rounded to two decimal places.
10. **No investment advice:** Historical returns do not guarantee future results, and the dataset does not account for taxes, costs, fees, liquidity, leverage, or individual circumstances.

---

## 14. Recommended Citation

Suggested citation for the completed dataset:

> Xue, Brady, compiler. *1926-2025 Investment Commodities Comparison by Year*. Historical data compiled from Macrotrends, SlickCharts, the Jordà-Schularick-Taylor Macrohistory Database, and the DataHub/GitHub Gold Prices dataset. Corrected to restore 1960 and extended through 2026 YTD using BLS CPI-U, ChartRow S&P 500 total return, S&P Cotality Case-Shiller data through FRED, and iShares IEF NAV total return. Bond column re-sourced from NYU Stern (Damodaran) 10-year Treasury returns (1928–2025) and the JST Macrohistory Database (1926–1927); Gold column re-sourced to year-end prices from the U.S. official gold price (1926–1967) and the LBMA Gold Price PM (1968–2026 YTD). Updated September 13, 2026.

---

## 15. URL Index

### Original historical sources

- Macrotrends Inflation: https://www.macrotrends.net/datasets/2497/historical-inflation-rate-by-year
- SlickCharts S&P 500 Returns: https://www.slickcharts.com/sp500/returns
- Macrohistory Database: https://www.macrohistory.net/database/
- Gold Prices Annual CSV (superseded September 13, 2026): https://github.com/datasets/gold-prices/blob/main/data/annual.csv

### Correction and extension sources

- NYU Stern Historical Returns: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
- BLS CPI: https://www.bls.gov/cpi/
- BLS December 2025 CPI Release: https://www.bls.gov/news.release/archives/cpi_01132026.htm
- BLS Current CPI Table: https://www.bls.gov/news.release/cpi.t01.htm
- FRED Case-Shiller National Home Price Index: https://fred.stlouisfed.org/data/CSUSHPISA
- iShares IEF: https://www.ishares.com/us/products/239456/ishares-710-year-treasury-bond-etf
- ChartRow S&P 500 YTD Return: https://chartrow.com/sp500/ytd

### Bond and Gold re-sourcing sources (September 13, 2026)

- NYU Stern Historical Returns spreadsheet: https://pages.stern.nyu.edu/~adamodar/pc/datasets/histretSP.xls
- JST Macrohistory Database, Release 6: https://www.macrohistory.net/database/
- LBMA Precious Metal Prices: https://www.lbma.org.uk/prices-and-data/lbma-precious-metal-prices
- LBMA Gold Price PM data file: https://prices.lbma.org.uk/json/gold_pm.json
- LBMA, March 1968 and the London Gold Fixing: https://www.lbma.org.uk/wonders-of-gold/items/march-1968-and-the-london-gold-fixing
- Federal Reserve History, Gold Reserve Act of 1934: https://www.federalreservehistory.org/essays/gold-reserve-act
- Per-year inputs: `docs/sources/bond_gold_source_values.csv`


2. Download: spy_historical.csv
	NASDAQ
	https://www.nasdaq.com/market-activity/etf/spy/historical?page=1&rows_per_page=10&timeline=y10

