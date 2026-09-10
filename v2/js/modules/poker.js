/*
 * Module 6: Expected Value (Poker). Scenario math unchanged from V1
 * (pot odds, preflop equities, rule-of-2 outs — standard, well-established
 * poker probability, not fabricated). Difficulty tags are added editorial
 * metadata; questions are already ordered easiest-to-hardest. Placeholder
 * images replaced with a local CSS panel (removes an external image
 * dependency).
 */
(function () {
    const pokerData = [
        { difficulty: 'Beginner', visual: 'Pot: $100 · Opponent bets $20', q: "The pot is $100. Opponent bets $20. You must call $20 to win $120 total. You estimate you have a 25% chance of hitting your winning flush on the river. EV?", opts: ["Call (+EV)", "Fold (-EV)"], correct: 0, explain: "Pot odds: Pay $20 to win $120 (14.2% equity needed). 25% equity > 14.2% needed, so calling is highly profitable (+EV)." },
        { difficulty: 'Intermediate', visual: 'A♠ K♠ vs Q♥ Q♦ — preflop', q: "Pre-flop. You hold AKo. Opponent reveals QQ. Equity in this exact spot?", opts: ["~20%", "~43%", "~60%"], correct: 1, explain: "43%. The classic 'Coin Flip'. The made pair (QQ) is a slight favorite (approx 57%) over two overcards pre-flop." },
        { difficulty: 'Intermediate', visual: 'A♠ A♥ vs K♠ K♥ — preflop', q: "Pre-flop. You hold AA. Opponent holds KK. Win rate for Aces?", opts: ["~65%", "~81%", "~95%"], correct: 1, explain: "81%. Aces dominate Kings pre-flop. KK only has two outs (the other two Kings) to win, making AA an overwhelming favorite." },
        { difficulty: 'Advanced', visual: 'Open-ended straight draw · 8 outs · turn', q: "You hold an open-ended straight draw (8 outs) on the turn. What is roughly your probability of hitting the straight on the river?", opts: ["~8%", "~17%", "~32%"], correct: 1, explain: "17%. Rule of 2: Multiply your outs (8) by 2 for one street. 8 x 2 = 16% (roughly 17.4% exact)." },
    ];

    let current = 0, correctCount = 0, streak = 0, bestStreak = 0, initialized = false;

    function renderStreak() {
        document.getElementById('poker-streak').textContent = `Streak: ${streak} (best ${bestStreak})`;
    }

    function loadRound() {
        if (current >= pokerData.length) return showEnd();
        const data = pokerData[current];
        document.getElementById('poker-q-num').textContent = `Hand ${current + 1} of ${pokerData.length}`;
        document.getElementById('poker-difficulty').textContent = data.difficulty;
        document.getElementById('poker-visual').textContent = data.visual;
        document.getElementById('poker-scenario').textContent = data.q;
        document.getElementById('poker-options').innerHTML = data.opts.map((o, i) => `<button data-i="${i}">${o}</button>`).join('');
        document.getElementById('poker-options').style.display = 'block';
        document.getElementById('poker-options').querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => decide(Number(btn.dataset.i)));
        });
        document.getElementById('poker-feedback').style.display = 'none';
        renderStreak();
    }

    function decide(index) {
        const data = pokerData[current];
        document.getElementById('poker-options').style.display = 'none';
        const fb = document.getElementById('poker-feedback');
        fb.style.display = 'block';
        const correct = index === data.correct;
        fb.classList.toggle('negative', !correct);
        if (correct) { correctCount++; streak++; bestStreak = Math.max(bestStreak, streak); }
        else streak = 0;
        document.getElementById('poker-result').textContent = correct ? 'Solid Play!' : 'Miscalculated.';
        document.getElementById('poker-explanation').innerHTML = `<strong>Analysis:</strong> ${data.explain}`;
        renderStreak();
    }

    function next() { current++; loadRound(); }

    function showEnd() {
        document.getElementById('poker-area').style.display = 'none';
        document.getElementById('poker-end').style.display = 'block';
        const score = Math.round((correctCount / pokerData.length) * 100);
        document.getElementById('poker-final-stats').innerHTML = `
            <div class="report-card">
                <div class="report-stat"><div class="label">Accuracy</div><div class="value">${correctCount}/${pokerData.length}</div><div class="meter"><div class="meter-fill" style="width:${score}%"></div></div></div>
                <div class="report-stat"><div class="label">Best Streak</div><div class="value">${bestStreak}</div></div>
            </div>`;
        App.recordModuleScore('poker', score);
    }

    function reset() {
        current = 0; correctCount = 0; streak = 0; bestStreak = 0;
        document.getElementById('poker-end').style.display = 'none';
        document.getElementById('poker-area').style.display = 'block';
        loadRound();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('poker-next-btn').addEventListener('click', next);
        document.getElementById('poker-reset-btn').addEventListener('click', reset);
    });

    window.Modules['tab-poker'] = {
        onShow() { if (!initialized) { initialized = true; loadRound(); } },
    };
})();
