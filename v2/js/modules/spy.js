/*
 * Module 4: SPY Macro Events. Uses only window.SPY_MONTHLY from
 * market-data.js, a month-end sample of the supplied daily Nasdaq
 * "Close/Last" series (2016-09-12 through 2026-09-09). These are raw
 * closing prices, NOT adjusted-close and NOT total-return (no dividend
 * reinvestment implied). Event markers annotate points; they never
 * change the plotted price.
 */
(function () {
    let chart = null;
    const EVENTS = {
        '2016-11': { text: 'US election and post-election reflation rally', type: 'positive' },
        '2018-02': { text: 'Volatility shock / Volmageddon', type: 'negative' },
        '2018-03': { text: 'US-China trade tensions escalate', type: 'negative' },
        '2018-12': { text: 'Fed tightening and global-growth fears', type: 'negative' },
        '2019-01': { text: 'Fed policy pivot toward patience', type: 'positive' },
        '2019-08': { text: 'Trade-war escalation and yield-curve inversion fears', type: 'negative' },
        '2020-03': { text: 'COVID-19 global market crash', type: 'negative' },
        '2020-04': { text: 'Massive Fed and fiscal-policy support drives recovery', type: 'positive' },
        '2020-11': { text: 'COVID-19 vaccine announcements', type: 'positive' },
        '2021-11': { text: 'Omicron variant and Fed tightening expectations', type: 'negative' },
        '2022-02': { text: 'Russia-Ukraine war begins', type: 'negative' },
        '2022-03': { text: 'Federal Reserve rate-hike cycle begins', type: 'negative' },
        '2022-06': { text: 'Inflation shock and aggressive Fed tightening', type: 'negative' },
        '2022-11': { text: 'Cooling inflation and ChatGPT launch begin new market narratives', type: 'neutral' },
        '2023-03': { text: 'Silicon Valley Bank and regional-banking crisis', type: 'negative' },
        '2023-05': { text: 'Generative-AI and semiconductor rally accelerates', type: 'positive' },
        '2023-11': { text: 'Disinflation and Fed rate-pause optimism', type: 'positive' },
        '2024-08': { text: 'Yen carry-trade unwind and US recession scare', type: 'negative' },
        '2024-09': { text: 'Federal Reserve begins rate-cut cycle', type: 'positive' },
        '2024-11': { text: 'US election and policy repricing', type: 'neutral' },
        '2025-04': { text: 'Sweeping US tariff announcement triggers global selloff', type: 'negative' },
        '2025-05': { text: 'US-China tariff truce drives relief rally', type: 'positive' },
        '2025-09': { text: 'Federal Reserve resumes rate cuts', type: 'positive' },
        '2026-01': { text: 'AI optimism pushes S&P 500 above 7,000', type: 'positive' },
        '2026-03': { text: 'Iran conflict, oil-price surge and inflation fears', type: 'negative' },
        '2026-08': { text: 'Strong AI-driven earnings support record-high equity market', type: 'positive' },
    };

    function onShow() {
        App.recordModuleScore('spy', 100);
        render();
    }

    function render() {
        if (chart) return;
        const rows = window.SPY_MONTHLY;
        const labels = rows.map(r => r.month);
        const prices = rows.map(r => r.close);
        const colors = labels.map(m => EVENTS[m] ? (EVENTS[m].type === 'positive' ? '#1e8e5a' : EVENTS[m].type === 'negative' ? '#c0392b' : '#1c2733') : 'rgba(15,126,163,0.18)');
        const names = labels.map(m => EVENTS[m]?.text || null);

        const ctx = document.getElementById('spyChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'SPY Month-End Close ($)',
                    data: prices,
                    borderColor: '#0a1f3d',
                    backgroundColor: 'rgba(15,126,163,0.12)',
                    pointBackgroundColor: colors,
                    pointRadius: labels.map(m => EVENTS[m] ? 7 : 1.5),
                    pointHoverRadius: 8,
                    fill: true, tension: 0.12, borderWidth: 2,
                }],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                animation: App.reducedMotion ? false : {},
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: c => `Close: $${c.parsed.y.toFixed(2)}`,
                            afterLabel: c => names[c.dataIndex] ? `EVENT: ${names[c.dataIndex]}` : '',
                        },
                    },
                },
                scales: {
                    x: { title: { display: true, text: 'Month' }, ticks: { maxTicksLimit: 14 } },
                    y: { title: { display: true, text: 'SPY closing price ($)' } },
                },
            },
        });

        const first = rows[0], last = rows[rows.length - 1];
        document.getElementById('spy-source-note').innerHTML =
            `<strong>Source:</strong> Nasdaq daily SPY history, sampled to month-end close. ` +
            `Range: ${first.date} to ${last.date}. The final month (${last.month}) is partial — data ends ${last.date}, not month-end. ` +
            `Prices shown are raw closing prices, not adjusted-close and not total return (no dividend reinvestment).`;
    }

    window.Modules['tab-spy'] = { onShow };
})();
