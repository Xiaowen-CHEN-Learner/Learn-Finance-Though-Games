/*
 * Module 3: Asset Price History (key: growth). Uses only window.INVESTMENT_RETURNS
 * from market-data.js (1926-2025 plus a 2026 YTD row; see README for
 * sourcing/corrections). Compounding is calculated client-side from the
 * real annual return rows; no prices are invented.
 */
(function () {
    let chart = null;
    const SPECS = [
        ['sp500', 'S&P 500', '#0077b6'],
        ['housing', 'Housing', '#8e44ad'],
        ['bond', 'Bonds', '#00a676'],
        ['gold', 'Gold', '#a87a12'],
        ['inflation', 'Cash purchasing power', '#607d8b'],
    ];
    const EVENTS = {
        1934: 'Gold Reserve Act revalues gold from $20.67 to $35 per ounce',
        1971: 'End of US dollar convertibility into gold',
        1980: 'Inflation and gold cycle peak',
        2008: 'Global Financial Crisis',
        2020: 'COVID-19 shock and policy response',
    };
    const visible = new Set(SPECS.map(s => s[0]));

    function compoundSeries(key) {
        let value = 100;
        return window.INVESTMENT_RETURNS.map(row => {
            const rate = row[key];
            if (rate === null || rate === undefined) return null;
            value *= (1 + rate / 100);
            return Number(value.toFixed(2));
        });
    }

    function onShow() {
        App.recordModuleScore('growth', 100);
        render();
    }

    function render() {
        if (chart) return;
        const years = window.INVESTMENT_RETURNS.map(r => r.year);
        const ctx = document.getElementById('goldChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: SPECS.map(([key, label, color]) => ({
                    key, label,
                    data: compoundSeries(key),
                    borderColor: color, backgroundColor: color,
                    pointBackgroundColor: years.map(y => EVENTS[y] ? '#c0392b' : color),
                    pointRadius: years.map(y => EVENTS[y] ? 6 : 1.5),
                    pointHoverRadius: 7,
                    spanGaps: false,
                    borderWidth: key === 'sp500' ? 3 : 2,
                    tension: 0.15,
                    animation: App.reducedMotion ? false : undefined,
                })),
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                animation: App.reducedMotion ? false : {},
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: c => `${c.dataset.label}: $${c.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                            afterBody: items => { const y = items[0]?.label; return EVENTS[y] ? `EVENT: ${EVENTS[y]}` : ''; },
                        },
                    },
                },
                scales: {
                    x: { title: { display: true, text: 'Year' } },
                    y: { type: 'logarithmic', title: { display: true, text: 'Growth of $100 (log scale)' }, ticks: { callback: v => '$' + Number(v).toLocaleString() } },
                },
            },
        });

        const legend = document.getElementById('growth-legend');
        legend.innerHTML = SPECS.map(([key, label, color]) =>
            `<button class="legend-chip" type="button" data-key="${key}" aria-pressed="true">
                <span class="swatch" style="background:${color}"></span>${label}
            </button>`
        ).join('');
        legend.querySelectorAll('.legend-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const key = chip.dataset.key;
                const ds = chart.data.datasets.find(d => d.key === key);
                const idx = chart.data.datasets.indexOf(ds);
                const nowHidden = !chart.getDatasetMeta(idx).hidden;
                chart.getDatasetMeta(idx).hidden = nowHidden;
                chip.setAttribute('aria-pressed', String(!nowHidden));
                chart.update();
            });
        });
    }

    window.Modules['tab-growth'] = { onShow };
})();
