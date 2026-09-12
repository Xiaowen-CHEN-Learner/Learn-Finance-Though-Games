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
**Documentation date:** September 11, 2026

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

The completed dataset contains every calendar year from 1926 through 2025, followed by one 2026 YTD row.

---

## 4. Restored 1960 Row

The original downloaded CSV skipped directly from 1959 to 1961. The following row was restored:

| Year | Inflation | S&P 500 | Housing | Bonds | Gold |
|---:|---:|---:|---:|---:|---:|
| 1960 | -1.46% | 0.47% | 4.74% | 11.64% | 0.48% |

### Source treatment for 1960

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

## 6. Bond Additions, 2021–2026 YTD

### Full-year values for 2021–2025

- **Source:** Aswath Damodaran, New York University Stern School of Business, Historical Returns on Stocks, Bonds and Bills
- **Series:** U.S. 10-year Treasury bond annual total return
- **URL:** https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html

The bond return includes both coupon income and bond-price appreciation or depreciation. It is not the same as the quoted 10-year Treasury yield.

### Values added

| Year | Bond return |
|---:|---:|
| 2021 | -4.42% |
| 2022 | -17.83% |
| 2023 | 3.88% |
| 2024 | -1.64% |
| 2025 | 7.80% |

### 2026 YTD bond proxy

The annual NYU Stern series did not yet contain a 2026 observation. Therefore, the 2026 YTD continuation uses an investable intermediate-term Treasury proxy:

- **Fund:** iShares 7-10 Year Treasury Bond ETF
- **Ticker:** `IEF`
- **Measure:** NAV total return
- **Cutoff:** September 10, 2026
- **2026 YTD return:** -2.63%
- **URL:** https://www.ishares.com/us/products/239456/ishares-710-year-treasury-bond-etf

### Bond-series limitation

The 2021–2025 values use the NYU Stern 10-year Treasury methodology, while 2026 YTD uses the IEF 7-10 year Treasury ETF. IEF is a close, investable proxy, but it is not identical to the historical NYU series and includes fund expenses and portfolio-index mechanics.

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

## 9. Gold, 2026 YTD

### Sources

- **December 31, 2025 gold price:** https://goldprice.org/gold-price-today/2025-12-31
- **September 10, 2026 gold price:** https://goldprice.org/gold-price-today/2026-09-10

### Calculation

- December 31, 2025 closing price: $4,339.65 per ounce
- September 10, 2026 closing price: $4,393.91 per ounce
- Calculation: `(4,393.91 / 4,339.65) - 1 = 1.25%`, rounded
- **2026 YTD return:** 1.25%

### Interpretation

The calculation represents price appreciation only. It does not include storage, insurance, transaction costs, dealer spreads, management fees, or taxes.

---

## 10. Complete 2026 YTD Row

| Period | Inflation | S&P 500 | Housing | Bonds | Gold |
|---|---:|---:|---:|---:|---:|
| 2026 YTD | -3.37% | 12.67% | 0.18% | -2.63% | 1.25% |

---

## 11. 2026 YTD Cutoff Dates

The 2026 YTD row does not use a single common observation date. It uses the latest actual observation available for each measure when the dataset was updated:

| Measure | Observation cutoff |
|---|---|
| Housing | June 2026 |
| Inflation | August 2026 |
| Bonds | September 10, 2026 |
| Gold | September 10, 2026 |
| S&P 500 | September 11, 2026 |

Therefore, the 2026 YTD row is a latest-available snapshot, not a perfectly synchronized same-date comparison. Any chart, game, analysis, or publication using this row should display this limitation.

---

## 12. Source Map by Period and Column

| Period | Inflation | S&P 500 | Housing | Bonds | Gold |
|---|---|---|---|---|---|
| 1926–2020 | Macrotrends, as cited by Brady Xue | SlickCharts, as cited by Brady Xue | Macrohistory Database, as cited by Brady Xue | Macrohistory Database, as cited by Brady Xue | GitHub/DataHub annual gold series, as cited by Brady Xue |
| 2021–2025 | Original Brady Xue dataset | Original Brady Xue dataset | FRED Case-Shiller calculation added during update | NYU Stern 10-year Treasury returns added during update | Original Brady Xue dataset |
| 2026 YTD | BLS CPI-U calculation | ChartRow total return | FRED Case-Shiller calculation | iShares IEF NAV total return proxy | GoldPrice.org price calculation |

---

## 13. Data-Quality and Comparability Limitations

1. **Column-level historical sourcing:** The original 1926–2025 dataset cites upstream sources by column, rather than documenting every cell separately.
2. **Different investment concepts:** The columns do not all measure the same type of return. The S&P 500 and bonds may include income, while Housing and Gold primarily reflect price changes.
3. **Housing is not a complete property return:** Rental income and property ownership costs are excluded.
4. **Inflation uses a negative sign convention:** Negative values represent purchasing-power erosion rather than the conventional published inflation rate.
5. **Historical and extension methodologies differ:** The 2021–2026 additions use sources selected to complete missing observations, not necessarily the exact processing methodology used by the original compiler.
6. **2026 YTD dates differ:** The latest available observation date varies by column.
7. **Rounding:** Values in the CSV are generally rounded to two decimal places.
8. **No investment advice:** Historical returns do not guarantee future results, and the dataset does not account for taxes, costs, fees, liquidity, leverage, or individual circumstances.

---

## 14. Recommended Citation

Suggested citation for the completed dataset:

> Xue, Brady, compiler. *1926-2025 Investment Commodities Comparison by Year*. Historical data compiled from Macrotrends, SlickCharts, the Jordà-Schularick-Taylor Macrohistory Database, and the DataHub/GitHub Gold Prices dataset. Corrected to restore 1960 and extended through 2026 YTD using BLS CPI-U, ChartRow S&P 500 total return, S&P Cotality Case-Shiller data through FRED, iShares IEF NAV total return, and GoldPrice.org. Updated September 11, 2026.

---

## 15. URL Index

### Original historical sources

- Macrotrends Inflation: https://www.macrotrends.net/datasets/2497/historical-inflation-rate-by-year
- SlickCharts S&P 500 Returns: https://www.slickcharts.com/sp500/returns
- Macrohistory Database: https://www.macrohistory.net/database/
- Gold Prices Annual CSV: https://github.com/datasets/gold-prices/blob/main/data/annual.csv

### Correction and extension sources

- NYU Stern Historical Returns: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
- BLS CPI: https://www.bls.gov/cpi/
- BLS December 2025 CPI Release: https://www.bls.gov/news.release/archives/cpi_01132026.htm
- BLS Current CPI Table: https://www.bls.gov/news.release/cpi.t01.htm
- FRED Case-Shiller National Home Price Index: https://fred.stlouisfed.org/data/CSUSHPISA
- iShares IEF: https://www.ishares.com/us/products/239456/ishares-710-year-treasury-bond-etf
- ChartRow S&P 500 YTD Return: https://chartrow.com/sp500/ytd
- Gold Price, December 31, 2025: https://goldprice.org/gold-price-today/2025-12-31
- Gold Price, September 10, 2026: https://goldprice.org/gold-price-today/2026-09-10


2. Download: spy_historical.csv
	NASDAQ
	https://www.nasdaq.com/market-activity/etf/spy/historical?page=1&rows_per_page=10&timeline=y10

