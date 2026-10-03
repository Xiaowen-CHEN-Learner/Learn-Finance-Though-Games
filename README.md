# Learn Finance Through Games

Interactive, browser-based learning tools for exploring financial decisions, market events, cognitive biases, and probability.

**[Open the v2 demo](https://xiaowen-chen-learner.github.io/Learn-Finance-Though-Games/v2/)** · **[Technical guide](v2/README.md)** · **[Data provenance](DATA_PROVENANCE.md)**

## Project description

This project translates finance concepts into experiences that users can explore rather than only read about. It combines a static web interface, JavaScript learning modules, and historical-data resources.

**Author:** Xavier Chen · Finance research and applied technology  
**Status:** Educational prototype. Modules and underlying datasets have documented limitations; the app is not a brokerage, trading service, or investment recommendation tool.

## Learning modules

| Module | Learning focus | Source |
| --- | --- | --- |
| Event trading | Explore how event scenarios relate to market decisions | [trading.js](v2/js/modules/trading.js) |
| Cognitive bias | Recognize common decision-making biases | [bias.js](v2/js/modules/bias.js) |
| Historical growth comparison | Compare historical asset and inflation series with attention to their different definitions | [growth.js](v2/js/modules/growth.js) |
| SPY and macro events | Explore an equity-market timeline and event context | [spy.js](v2/js/modules/spy.js) |
| Gambling probability | Explore why repeated bets and game structure matter | [gambler.js](v2/js/modules/gambler.js) |
| Poker probability | Practice probability and statistical reasoning | [poker.js](v2/js/modules/poker.js) |

## Tech stack

HTML, CSS, JavaScript, CSV data, and GitHub Pages. The `v2/` directory separates styling, application logic, learning modules, and data. This repository is a static application; no backend service or package-manager build is required for the local serving approach below.

## Installation

Clone the repository and serve its files locally using Python 3:

```bash
git clone https://github.com/Xiaowen-CHEN-Learner/Learn-Finance-Though-Games.git
cd Learn-Finance-Though-Games
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, `py -m http.server 8000 --bind 127.0.0.1` is an alternative when the Python launcher is installed.

Open `http://localhost:8000/v2/` in a browser. Serving over HTTP, rather than opening an HTML file directly, allows relative data requests to work normally. Internet access may still be required for any external resources referenced by the page. These are local serving instructions, not a claim that all modules have passed a full browser test.

## Usage

Choose a learning module, interact with its controls, and compare the resulting outcomes. Read the corresponding module source and data notes when interpreting a chart or simulation. Historical sequences and simulated outcomes should not be interpreted as forecasts.

## Repository map

```text
v2/
  index.html             # Current demo entry point
  css/styles.css         # Interface styling
  js/app.js              # Application logic
  js/market-data.js      # Market/event data resources
  js/modules/            # Individual learning modules
  data/                  # CSV resources
DATA_PROVENANCE.md       # Original source documentation, preserved in full
 docs/decisions/         # Existing source-review and remediation notes
 docs/sources/           # Recorded source inputs
```

The root also retains the earlier app version and data copies. They have not been removed or changed by this documentation reorganization.

## Data and methodology

The previous README is preserved verbatim in [DATA_PROVENANCE.md](DATA_PROVENANCE.md), including attribution, corrections, calculations, and limitations. Read it before reusing the datasets. Existing [decision records](docs/decisions/) and [source inputs](docs/sources/) provide additional context.

The dataset documentation distinguishes price changes from total returns, identifies series changes and proxies, and explains its inflation sign convention. This README reorganization does not independently revalidate the financial data or update the historical snapshots.

## Development priorities

- Add a screenshot and a concise walkthrough for each module.
- Test calculations against small, documented examples and check missing-data handling.
- Review keyboard accessibility, mobile layouts, and error messages.
- Make observed data, event interpretation, and simulated scenarios visibly distinct.
- Reconcile duplicated data resources before changing the application structure.

## Contributing

Open an issue describing the module, expected behaviour, and reproduction steps. Improvements to financial explanations, accessibility, data provenance, and testing are welcome. Do not submit restricted market data or personal account information.

## Author and contact

[Xavier Chen on LinkedIn](https://www.linkedin.com/in/xiaowen-chen/) · [GitHub portfolio](https://github.com/Xiaowen-CHEN-Learner)

## License and responsible use

No project-wide license is currently included. Source datasets and third-party material retain their applicable rights and restrictions.

Educational use only. Not investment advice.
