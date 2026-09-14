/*
 * Module 2: Cognitive Bias. Question content unchanged from V1; adds a
 * progress bar, per-question tag (for the mastery review), and a score
 * recorded into the progression system.
 */
(function () {
    const biasData = [
        { tag: "Sunk Cost / Anchoring", q: "You bought a tech stock at $100. It is now $40. Earnings have shrunk, competitors are winning. You refuse to sell until it gets back to $100 because 'you refuse to lock in a loss.'", opts: ["Not Biased", "Biased: Sunk Cost / Anchoring", "Biased: Recency Bias"], correct: 1, explain: "Anchoring to the $100 price (sunk cost)." },
        { tag: "Confirmation Bias", q: "You believe strongly in an EV company. You only read blogs praising it and block anyone pointing out its debt issues.", opts: ["Biased: Confirmation Bias", "Biased: Hindsight Bias", "Not Biased"], correct: 0, explain: "Confirmation Bias: favoring info that confirms preexisting beliefs." },
        { tag: "Hindsight Bias", q: "After the 2020 crash, you say, 'It was so obvious the market would bounce!' even though you were in pure cash and terrified.", opts: ["Biased: Framing Effect", "Not Biased", "Biased: Hindsight Bias"], correct: 2, explain: "Hindsight Bias: 'I knew it all along' effect." },
        { tag: "Rational Analysis", q: "You objectively evaluate a company using a DCF model, review bear/bull cases, and allocate 5% of your portfolio.", opts: ["Biased: Overconfidence", "Not Biased", "Biased: Availability Heuristic"], correct: 1, explain: "Rational Analysis, proper risk management." },
        { tag: "Disposition Effect", q: "You sell your winning stocks quickly to 'secure profits' but hold onto your losing stocks hoping they rebound.", opts: ["Biased: Disposition Effect", "Not Biased", "Biased: Endowment Effect"], correct: 0, explain: "Disposition Effect: tendency to sell winners too early and hold losers too long." },
        { tag: "Availability Heuristic", q: "You hear a recent news story about a shark attack, so you cancel your beach trip, even though statistics show the risk is virtually zero.", opts: ["Biased: Availability Heuristic", "Biased: Loss Aversion", "Not Biased"], correct: 0, explain: "Availability Heuristic: relying on immediate examples that come to mind." },
        { tag: "Endowment Effect", q: "You value a mug you received for free at $10, but you wouldn't pay more than $5 to buy the exact same mug from a store.", opts: ["Biased: Anchoring", "Not Biased", "Biased: Endowment Effect"], correct: 2, explain: "Endowment Effect: placing higher value on things merely because you own them." },
        { tag: "Framing Effect", q: "A mutual fund advertises '90% of our years are positive!' instead of 'We have a 10% chance of a losing year'. You invest based on this phrasing.", opts: ["Biased: Framing Effect", "Biased: Hindsight Bias", "Not Biased"], correct: 0, explain: "Framing Effect: reacting differently depending on how information is presented." },
        { tag: "Gambler's Fallacy", q: "You flip a coin 5 times, and it lands heads every time. You bet heavily on tails for the 6th flip, believing it is 'due'.", opts: ["Biased: Gambler's Fallacy", "Not Biased", "Biased: Confirmation Bias"], correct: 0, explain: "Gambler's Fallacy: believing past independent events affect future probability." },
        { tag: "Overconfidence", q: "You believe you are a better driver than 90% of the population.", opts: ["Not Biased", "Biased: Overconfidence / Illusory Superiority", "Biased: Sunk Cost Fallacy"], correct: 1, explain: "Illusory Superiority: overestimating one's own qualities relative to others." }
    ];

    let current = 0;
    // First answer per question is what gets scored; going back to re-answer after
    // seeing the explanation is allowed for review but doesn't change the score.
    let firstAnswers = {};

    function renderProgress() {
        document.getElementById('bias-q-num').textContent = `Assessment ${current + 1} of ${biasData.length}`;
        const pct = Math.round((current / biasData.length) * 100);
        const bar = document.getElementById('bias-progress-fill');
        if (bar) bar.style.width = pct + '%';
    }

    function loadRound() {
        if (current >= biasData.length) return showEnd();
        renderProgress();
        const data = biasData[current];
        document.getElementById('bias-scenario').textContent = data.q;
        document.getElementById('bias-options').innerHTML = data.opts.map((o, i) => `<button data-i="${i}">${o}</button>`).join('');
        document.getElementById('bias-options').style.display = 'block';
        document.getElementById('bias-options').querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => decide(Number(btn.dataset.i)));
        });
        document.getElementById('bias-feedback').style.display = 'none';
        document.querySelectorAll('.btn-prev').forEach(b => b.style.display = current === 0 ? 'none' : 'inline-block');
    }

    function decide(index) {
        const data = biasData[current];
        if (!(current in firstAnswers)) firstAnswers[current] = index;
        document.getElementById('bias-options').style.display = 'none';
        const fb = document.getElementById('bias-feedback');
        fb.style.display = 'block';
        const resText = document.getElementById('bias-result');
        const correct = index === data.correct;
        fb.classList.toggle('negative', !correct);
        resText.textContent = correct ? 'Correct Identification!' : 'Incorrect.';
        document.getElementById('bias-explanation').innerHTML = `<strong>Explanation:</strong> ${data.explain}`;
    }

    function next() { current++; loadRound(); }
    function prev() { if (current > 0) { current--; loadRound(); } }

    function showEnd() {
        document.getElementById('bias-area').style.display = 'none';
        document.getElementById('bias-end').style.display = 'block';
        const correctCount = biasData.filter((d, i) => firstAnswers[i] === d.correct).length;
        const score = Math.round((correctCount / biasData.length) * 100);

        const missed = biasData.filter((d, i) => firstAnswers[i] !== d.correct);
        let html = `<div class="report-card">
            <div class="report-stat"><div class="label">Score (first answers)</div><div class="value">${correctCount}/${biasData.length}</div><div class="meter"><div class="meter-fill" style="width:${score}%"></div></div></div>
        </div>`;
        if (missed.length) {
            html += `<div class="mastery-list"><h3>Concepts to review</h3><ul>${missed.map(m => `<li><strong>${m.tag}:</strong> ${m.explain}</li>`).join('')}</ul></div>`;
        } else {
            html += `<div class="mastery-list"><h3>Excellent Job!</h3><p>You identified every bias correctly.</p></div>`;
        }
        document.getElementById('bias-summary-area').innerHTML = html;
        App.recordModuleScore('bias', score);
    }

    function resetBias() {
        current = 0; firstAnswers = {};
        document.getElementById('bias-end').style.display = 'none';
        document.getElementById('bias-area').style.display = 'block';
        loadRound();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('bias-next-btn').addEventListener('click', next);
        document.querySelectorAll('.btn-prev').forEach(b => b.addEventListener('click', prev));
        document.getElementById('bias-retake-btn').addEventListener('click', resetBias);
        loadRound();
    });

    window.Modules['tab-bias'] = { onShow() {} };
})();
