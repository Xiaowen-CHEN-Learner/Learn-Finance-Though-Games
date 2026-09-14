/*
 * Module 1: Event-Driven Trading.
 * Scenario content (dates, metrics, option multipliers, result text) is
 * unchanged from V1 — only presentation, risk tagging, and scoring are new.
 * "risk" tags on each option are added editorial metadata (low/medium/high),
 * not historical data.
 */
(function () {
    const gameData = [
        { date: "April 20, 2020", title: "The Negative Oil Contract", text: "WTI Crude Oil May contract just settled at -$37.63/barrel. Exxon Mobil (XOM) has dropped significantly. Do you buy?", metrics: ["XOM Price: $41.18", "XOM Div Yield: ~8.5%", "S&P VIX: 43.83", "US 10-Yr Yield: 0.61%"], options: [{ text: "Buy heavily (Oversold anomaly)", mult: 1.5, risk: "high" }, { text: "Buy slightly", mult: 1.1, risk: "medium" }, { text: "Avoid entirely (Fundamental destruction)", mult: 1.0, risk: "low" }], result: "The negative contract was a futures storage anomaly. Oil prices rapidly recovered. Buying heavily was the right fundamental and contrarian play." },
        { date: "Sept 15, 2008", title: "Lehman Brothers Bankruptcy", text: "Lehman Brothers officially files for Chapter 11 bankruptcy. Interbank lending has frozen. The S&P 500 is plunging.", metrics: ["SPX Price: ~1,192", "VIX: 31.70 (Rising fast)", "Fed Funds Rate: 2.00%", "TED Spread: Spiking to 300+ bps"], options: [{ text: "Buy the dip immediately (Value play)", mult: 0.60, risk: "high" }, { text: "Hold current positions", mult: 0.70, risk: "medium" }, { text: "Sell to Cash / Defensive rotation", mult: 0.95, risk: "low" }], result: "The systemic risk was real. Catching the 'falling knife' immediately after Lehman destroyed capital. The market bottomed much later." },
        { date: "March 9, 2009", title: "The Generational Bottom?", text: "The market is down over 50% from highs. Economic data is historically terrible, but the Fed has announced massive Quantitative Easing (QE1).", metrics: ["SPX Price: 676", "Unemployment: 8.5%", "Shiller P/E: 13.3", "VIX: 49.68"], options: [{ text: "Stay in Cash (Too risky)", mult: 1.0, risk: "low" }, { text: "Invest 50% (Dollar Cost Average)", mult: 1.3, risk: "medium" }, { text: "Go All In Equities", mult: 1.6, risk: "high" }], result: "This day marked the exact bottom of the Great Financial Crisis. Valuations were historically cheap and Fed liquidity provided a backstop." },
        { date: "June 1, 2012", title: "Facebook Botched IPO", text: "Facebook (META) IPOs at $38 but technical glitches plague the opening. The stock drops into the $20s over mobile monetization doubts.", metrics: ["FB Price: $27.72", "Forward P/E: 40x+", "Mobile Ad Rev: ~0%", "User Base: 900M+"], options: [{ text: "Short the stock", mult: 0.5, risk: "high" }, { text: "Avoid entirely", mult: 1.0, risk: "low" }, { text: "Buy the dip", mult: 2.0, risk: "high" }], result: "Facebook quickly solved its mobile ad model. The stock became one of the greatest tech performers of the decade." },
        { date: "Jan 27, 2021", title: "The Meme Stock Short Squeeze", text: "GameStop (GME) goes from $4 to over $300 driven by retail traders forcing a short squeeze. Fundamentals are detached.", metrics: ["GME Price: $347.51", "Short Interest: 140%", "P/E: N/A (Losing money)"], options: [{ text: "FOMO Buy at the top", mult: 0.3, risk: "high" }, { text: "Short it heavily", mult: 0.4, risk: "high" }, { text: "Stay away (Cash out)", mult: 1.0, risk: "low" }], result: "Buying the top wiped out retail. Shorting was equally dangerous due to unlimited risk. Staying away preserved capital." },
        { date: "Nov 2021", title: "Inflation 'Transitory' Narrative Cracks", text: "US CPI hits 6.8%. High-duration assets (unprofitable tech) look extremely vulnerable to rate hikes.", metrics: ["CPI: 6.8%", "Fed Funds Rate: 0.00 - 0.25%", "Nasdaq P/E: >35x"], options: [{ text: "Buy more Tech stocks", mult: 0.5, risk: "high" }, { text: "Hold standard 60/40", mult: 0.8, risk: "medium" }, { text: "Rotate to Value & Cash", mult: 1.2, risk: "low" }], result: "2022 saw aggressive rate hikes. Unprofitable tech dropped 50-80%. Rotating to Value protected capital." },
        { date: "Nov 30, 2022", title: "The AI Paradigm Shift", text: "OpenAI releases ChatGPT. Big tech companies instantly pivot to AI infrastructure. Semiconductor demand spikes.", metrics: ["NVDA Price: ~$160", "Interest Rates: Rising", "Market Sentiment: Bearish"], options: [{ text: "Short Tech", mult: 0.6, risk: "high" }, { text: "Wait and see", mult: 1.0, risk: "low" }, { text: "Invest heavily in AI infra", mult: 1.8, risk: "high" }], result: "The AI boom created an unprecedented capex cycle. NVDA went on to grow earnings exponentially." },
        { date: "March 1999", title: "Dot-Com Euphoria", text: "Any company adding '.com' to its name sees its stock triple on opening day.", metrics: ["Nasdaq P/E: >100x", "Retail participation: All-time high"], options: [{ text: "Go all in on .com", mult: 0.2, risk: "high" }, { text: "Hold stable Value stocks", mult: 1.1, risk: "low" }, { text: "Short the Nasdaq", mult: 0.8, risk: "high" }], result: "The bubble burst in 2000. Shorting was tough because irrationality lasted, but holding value stocks preserved capital." },
        { date: "August 5, 2011", title: "US Credit Downgrade", text: "S&P historically downgrades US Sovereign Debt from AAA to AA+. The market panics.", metrics: ["SPX Price: 1,199", "VIX: 32.00", "US 10-Yr Yield: Dropping"], options: [{ text: "Panic Sell US Equities", mult: 0.9, risk: "medium" }, { text: "Do nothing", mult: 1.1, risk: "low" }, { text: "Buy the fear", mult: 1.2, risk: "high" }], result: "Paradoxically, money flooded into US Treasuries as a safe haven. The stock market volatility subsided." },
        { date: "Early 2024", title: "The Rate Cut Anticipation", text: "Inflation has cooled. The Fed dots plot indicates rate cuts are coming. The market is hitting all-time highs.", metrics: ["SPX Price: ~5,100", "CPI: 3.1%", "Unemployment: 3.9%"], options: [{ text: "Sell everything", mult: 0.9, risk: "medium" }, { text: "Stay invested in equities", mult: 1.1, risk: "low" }], result: "Markets historically perform strongly in the 'pause' phase before rate cuts. Staying invested captured significant gains." }
    ];

    const RISK_WEIGHT = { low: 1, medium: 2, high: 3 };
    let portfolio, currentRound, valueHistory, choices;

    function reset() {
        portfolio = 10000;
        currentRound = 0;
        valueHistory = [10000];
        choices = [];
    }
    reset();

    function renderDots() {
        const wrap = document.getElementById('trading-round-dots');
        if (!wrap) return;
        wrap.innerHTML = gameData.map((_, i) => {
            const cls = i < currentRound ? 'done' : (i === currentRound ? 'current' : '');
            return `<span class="round-dot ${cls}"></span>`;
        }).join('');
    }

    function loadRound() {
        if (currentRound >= gameData.length) return showEnd();
        const data = gameData[currentRound];
        document.getElementById('round-counter').textContent = `Round ${currentRound + 1} of ${gameData.length}`;
        renderDots();

        const pText = document.getElementById('portfolio-value');
        pText.textContent = `Portfolio: ${App.formatCurrency(portfolio)}`;
        pText.style.color = '#fff';

        document.getElementById('game-date').textContent = `${data.date} — ${data.title}`;
        document.getElementById('game-scenario').textContent = data.text;
        document.getElementById('game-metrics').innerHTML = data.metrics.map(m => `<div>• ${m}</div>`).join('');

        document.getElementById('game-options').innerHTML = data.options.map((opt, i) =>
            `<button data-i="${i}"><span>${opt.text}</span><span class="risk-tag ${opt.risk}">${opt.risk} risk</span></button>`
        ).join('');
        document.getElementById('game-options').style.display = 'block';
        document.getElementById('game-options').querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => decide(Number(btn.dataset.i)));
        });
        document.getElementById('game-feedback').style.display = 'none';
    }

    function decide(optIndex) {
        const data = gameData[currentRound];
        const chosen = data.options[optIndex];
        const old = portfolio;
        portfolio *= chosen.mult;
        valueHistory.push(portfolio);
        choices.push(chosen);

        const pText = document.getElementById('portfolio-value');
        pText.textContent = `Portfolio: ${App.formatCurrency(portfolio)}`;
        pText.style.color = portfolio > old ? 'var(--color-success)' : (portfolio < old ? '#ff8a80' : '#fff');

        document.getElementById('game-options').style.display = 'none';
        const fb = document.getElementById('game-feedback');
        fb.style.display = 'block';
        fb.classList.toggle('negative', portfolio < old);
        document.getElementById('feedback-text').textContent = data.result;
    }

    function nextRound() { currentRound++; loadRound(); }

    function investorProfile(preservationScore, avgRisk) {
        if (preservationScore < 50) return 'Overexposed Trader — swings hurt capital regardless of outcome.';
        if (avgRisk <= 1.5) return preservationScore >= 80 ? 'Cautious Capital Preserver' : 'Conservative but Unlucky';
        if (avgRisk <= 2.2) return preservationScore >= 80 ? 'Disciplined Value Investor' : 'Balanced Active Trader';
        return preservationScore >= 80 ? 'Contrarian Risk-Taker (it paid off)' : 'Momentum Chaser';
    }

    function showEnd() {
        document.getElementById('game-area').style.display = 'none';
        const end = document.getElementById('game-end');
        end.style.display = 'block';

        const percentChange = ((portfolio - 10000) / 10000) * 100;
        document.getElementById('final-score').textContent = `Final Portfolio Value: ${App.formatCurrency(portfolio)}`;
        const percentEl = document.getElementById('final-percentage');
        percentEl.textContent = `(${App.formatPercent(percentChange)})`;
        percentEl.style.color = percentChange >= 0 ? 'var(--color-success)' : 'var(--color-danger)';

        const minValue = Math.min(...valueHistory);
        const preservationScore = App.clamp(Math.round(100 * (minValue / 10000)), 0, 100);
        const winRoundPct = Math.round(100 * choices.filter(c => c.mult >= 1).length / choices.length);
        const avgRisk = choices.reduce((s, c) => s + RISK_WEIGHT[c.risk], 0) / choices.length;
        const riskLabel = avgRisk <= 1.5 ? 'Conservative' : (avgRisk <= 2.2 ? 'Balanced' : 'Aggressive');

        document.getElementById('trading-report-card').innerHTML = `
            <div class="report-stat">
                <div class="label">Capital Preservation</div>
                <div class="value">${preservationScore}/100</div>
                <div class="meter"><div class="meter-fill" style="width:${preservationScore}%"></div></div>
            </div>
            <div class="report-stat">
                <div class="label">Risk Posture</div>
                <div class="value">${riskLabel}</div>
                <div class="meter"><div class="meter-fill" style="width:${App.clamp((avgRisk-1)/2*100,0,100)}%"></div></div>
            </div>
            <div class="report-stat">
                <div class="label">Historical Outcome Score*</div>
                <div class="value">${winRoundPct}%</div>
                <div class="meter"><div class="meter-fill" style="width:${winRoundPct}%"></div></div>
            </div>`;
        document.getElementById('trading-profile').innerHTML = `
            <div class="investor-profile">
                <div class="label">Your Investor Profile</div>
                <div class="title">${investorProfile(preservationScore, avgRisk)}</div>
            </div>
            <p style="font-size:12px;color:var(--color-text-muted);margin-top:10px;">*Reflects what actually happened afterward in each historical scenario — not something that could have been known with certainty at the time you decided.</p>`;

        App.recordModuleScore('trading', preservationScore);
    }

    function resetGame() {
        reset();
        document.getElementById('game-end').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        loadRound();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('next-round-btn').addEventListener('click', nextRound);
        document.getElementById('trading-replay-btn').addEventListener('click', resetGame);
        loadRound();
    });

    window.Modules['tab-trading'] = { onShow() {} };
})();
