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
        '2016-11': { text: 'US election', type: 'neutral' },
        '2018-02': { text: 'Volatility shock', type: 'negative' },
        '2020-03': { text: 'COVID-19 market crash', type: 'negative' },
        '2020-11': { text: 'Vaccine announcements', type: 'positive' },
        '2022-03': { text: 'Federal Reserve rate-hike cycle begins', type: 'negative' },
        '2022-11': { text: 'ChatGPT launch and generative-AI adoption cycle', type: 'neutral' },
        '2023-11': { text: 'Disinflation and rate-pause optimism', type: 'positive' },
    };

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

        App.recordModuleScore('spy', 100);
    }

    window.Modules['tab-spy'] = { onShow: render };
})();
