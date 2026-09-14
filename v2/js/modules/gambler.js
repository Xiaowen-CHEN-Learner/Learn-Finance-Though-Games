/*
 * Module 5: Gambler's Ruin. Mechanics unchanged from V1 (50/50 wager,
 * 10% of wealth staked per round, 1% expense ratio drag, ruin at 90%
 * loss). Math.random() here is intentional — it IS the lesson, not a
 * historical-data stand-in. Adds cumulative-cost tracking and a short
 * comprehension check that feeds the progression score.
 */
(function () {
    const START_WEALTH = 1000000;
    const RUIN_THRESHOLD = 100000;
    const COMPLETE_TRIALS = 30;

    let chart = null;
    let wealth = START_WEALTH, trials = 0, cumulativeExpense = 0;
    let historyX = [0], historyY = [START_WEALTH];
    let completed = false, checkAnswered = false;

    const CHECK = {
        q: 'Every bet in this game had true 50/50 odds. Why is it still a losing game over the long run?',
        opts: [
            'It isn\'t — over many trials a fair 50/50 game nets to about zero.',
            'Every wager paid a 1% expense ratio regardless of outcome, so the expected value of each bet was negative before the coin was even flipped.',
            'The odds were secretly worse than 50/50.',
        ],
        correct: 1,
        explain: 'Expected value per bet = 0.5×(+wager) + 0.5×(−wager) − 0.01×wager = −1% of the wager, guaranteed. Fair odds do not mean a fair game once costs are added — this is the same drag that fees and spreads impose on real trading.',
    };

    function initChart() {
        if (chart) return;
        const ctx = document.getElementById('gamblerChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: { labels: historyX, datasets: [{ label: 'Remaining Wealth ($)', data: historyY, borderColor: '#0f7ea3', backgroundColor: 'rgba(15,126,163,0.18)', fill: true, tension: 0.1 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                animation: App.reducedMotion ? false : {},
                scales: {
                    x: { title: { display: true, text: 'Number of Gambles' } },
                    y: { title: { display: true, text: 'Wealth ($)' }, beginAtZero: true },
                },
            },
        });
    }

    function updateStats() {
        document.getElementById('gamble-count').textContent = trials;
        document.getElementById('gambler-wealth').textContent = `Your Wealth: ${App.formatCurrency(wealth)}`;
        document.getElementById('gambler-costs').textContent = `Total costs paid: ${App.formatCurrency(cumulativeExpense)}`;
        if (chart) chart.update();
    }

    function play(times) {
        if (wealth <= RUIN_THRESHOLD || completed) return;
        const n = Math.min(times, COMPLETE_TRIALS - trials);
        for (let i = 0; i < n; i++) {
            if (wealth <= RUIN_THRESHOLD) break;
            const wager = wealth * 0.10;
            const expense = wager * 0.01;
            wealth -= expense;
            cumulativeExpense += expense;
            const win = Math.random() < 0.5;
            wealth += win ? wager : -wager;
            trials++;
            historyX.push(trials);
            historyY.push(wealth);
        }
        updateStats();
        if (wealth <= RUIN_THRESHOLD || trials >= COMPLETE_TRIALS) finish();
    }

    function finish() {
        if (completed) return;
        completed = true;
        document.getElementById('gambler-active').style.display = 'none';
        document.getElementById('gambler-ruined').style.display = 'block';
        const change = wealth - START_WEALTH;
        const costs = App.formatCurrency(cumulativeExpense);
        let message;
        if (wealth <= RUIN_THRESHOLD) {
            message = 'You lost 90% of your money! Math and expense ratios eventually win.';
        } else if (change < 0) {
            message = `After ${trials} trials you're down ${App.formatCurrency(-change)}. Expense ratios alone cost you ${costs}.`;
        } else {
            message = `After ${trials} trials you're up ${App.formatCurrency(change)} — that's luck, not an edge. You still paid ${costs} in expense ratios, and every bet had negative expected value.`;
        }
        document.getElementById('gambler-ruined-text').textContent = message;
        renderCheck();
    }

    function renderCheck() {
        const wrap = document.getElementById('gambler-check');
        wrap.innerHTML = `<div class="scenario-box"><p><strong>Quick check:</strong> ${CHECK.q}</p>
            <div class="options" id="gambler-check-opts">${CHECK.opts.map((o, i) => `<button data-i="${i}">${o}</button>`).join('')}</div>
            <div id="gambler-check-feedback" class="feedback"></div></div>`;
        wrap.querySelectorAll('#gambler-check-opts button').forEach(btn => {
            btn.addEventListener('click', () => answerCheck(Number(btn.dataset.i)));
        });
    }

    function answerCheck(i) {
        if (checkAnswered) return;
        checkAnswered = true;
        const correct = i === CHECK.correct;
        document.getElementById('gambler-check-opts').style.display = 'none';
        const fb = document.getElementById('gambler-check-feedback');
        fb.style.display = 'block';
        fb.classList.toggle('negative', !correct);
        fb.innerHTML = `<h3>${correct ? 'Correct.' : 'Not quite.'}</h3><p>${CHECK.explain}</p>`;
        App.recordModuleScore('gambler', correct ? 100 : 0);
    }

    function reset() {
        wealth = START_WEALTH; trials = 0; cumulativeExpense = 0;
        historyX = [0]; historyY = [START_WEALTH];
        completed = false; checkAnswered = false;
        document.getElementById('gambler-active').style.display = 'block';
        document.getElementById('gambler-ruined').style.display = 'none';
        document.getElementById('gambler-check').innerHTML = '';
        updateStats();
        if (chart) { chart.data.labels = historyX; chart.data.datasets[0].data = historyY; chart.update(); }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('btn-big').addEventListener('click', () => play(1));
        document.getElementById('btn-small').addEventListener('click', () => play(1));
        document.getElementById('btn-big-10').addEventListener('click', () => play(10));
        document.getElementById('btn-small-10').addEventListener('click', () => play(10));
        document.getElementById('gambler-reset-btn').addEventListener('click', reset);
    });

    window.Modules['tab-gambler'] = { onShow: initChart };
})();
