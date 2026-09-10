/*
 * Shared shell: tab navigation (ARIA tablist), localStorage progression
 * system, and small utilities used by every module in js/modules/*.js.
 *
 * Progression storage (documented per DATA-INTEGRITY / progression requirements):
 *   localStorage key: "lfg_v2_progress"
 *   {
 *     version: 1,
 *     modules: {
 *       <moduleKey>: { bestScore: 0-100, attempts: number, lastScore: 0-100, updatedAt: ISO string }
 *     }
 *   }
 * No personal data is stored — only per-module best scores and attempt counts.
 */
const App = (() => {
    const STORAGE_KEY = 'lfg_v2_progress';
    const MODULE_KEYS = ['trading', 'bias', 'growth', 'spy', 'gambler', 'poker'];

    const LEVELS = [
        { name: 'Retail Investor', minModules: 0, minAvg: 0 },
        { name: 'Junior Analyst', minModules: 1, minAvg: 0 },
        { name: 'Analyst', minModules: 3, minAvg: 50 },
        { name: 'Portfolio Manager', minModules: 5, minAvg: 65 },
        { name: 'Chief Investment Officer', minModules: 6, minAvg: 80 },
    ];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let state = loadState();

    function defaultState() {
        return { version: 1, modules: {} };
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultState();
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object' || !parsed.modules) return defaultState();
            return parsed;
        } catch (e) {
            console.warn('Progress data was unreadable and has been reset.', e);
            return defaultState();
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Could not save progress (storage unavailable).', e);
        }
    }

    function resetProgress() {
        state = defaultState();
        saveState();
        renderProgressWidget();
        renderHomeBadges();
        toast('Progress reset.');
    }

    function recordModuleScore(moduleKey, score) {
        const clamped = Math.max(0, Math.min(100, Math.round(score)));
        const existing = state.modules[moduleKey] || { bestScore: 0, attempts: 0 };
        const improved = clamped > (existing.bestScore || 0);
        state.modules[moduleKey] = {
            bestScore: Math.max(existing.bestScore || 0, clamped),
            attempts: (existing.attempts || 0) + 1,
            lastScore: clamped,
            updatedAt: new Date().toISOString(),
        };
        saveState();
        renderProgressWidget();
        renderHomeBadges();
        if (improved && existing.attempts) toast('New best score in this module.');
        return improved;
    }

    function completedModules() {
        return MODULE_KEYS.filter(k => state.modules[k] && state.modules[k].attempts > 0);
    }

    function averageScore() {
        const done = completedModules();
        if (!done.length) return 0;
        const sum = done.reduce((acc, k) => acc + state.modules[k].bestScore, 0);
        return sum / done.length;
    }

    function currentLevelIndex() {
        const modulesCompleted = completedModules().length;
        const avg = averageScore();
        let idx = 0;
        for (let i = 0; i < LEVELS.length; i++) {
            if (modulesCompleted >= LEVELS[i].minModules && avg >= LEVELS[i].minAvg) idx = i;
        }
        return idx;
    }

    function progressToNextLevel() {
        const idx = currentLevelIndex();
        const next = LEVELS[idx + 1];
        if (!next) return 100;
        const modulesCompleted = completedModules().length;
        const avg = averageScore();
        const moduleRatio = next.minModules ? Math.min(1, modulesCompleted / next.minModules) : 1;
        const avgRatio = next.minAvg ? Math.min(1, avg / next.minAvg) : 1;
        return Math.round(Math.min(moduleRatio, avgRatio) * 100);
    }

    function renderProgressWidget() {
        const idx = currentLevelIndex();
        const label = document.getElementById('level-label');
        const bar = document.getElementById('xp-bar');
        const fill = document.getElementById('xp-bar-fill');
        if (!label || !bar || !fill) return;
        label.textContent = LEVELS[idx].name;
        const pct = progressToNextLevel();
        fill.style.width = pct + '%';
        bar.setAttribute('aria-valuenow', String(pct));
        bar.setAttribute('aria-label', LEVELS[idx + 1]
            ? `Progress to ${LEVELS[idx + 1].name}: ${pct}%`
            : 'Maximum level reached');

        const ladder = document.getElementById('level-ladder');
        if (ladder) {
            ladder.innerHTML = LEVELS.map((lvl, i) => {
                const cls = i === idx ? 'current' : (i < idx ? 'achieved' : '');
                return `<span class="level-chip ${cls}">${lvl.name}</span>`;
            }).join('');
        }
    }

    function renderHomeBadges() {
        document.querySelectorAll('[data-module-badge]').forEach(el => {
            const key = el.getAttribute('data-module-badge');
            const mod = state.modules[key];
            el.innerHTML = mod && mod.attempts > 0
                ? `<span class="badge-complete">Best: ${mod.bestScore}/100</span>`
                : '';
        });
    }

    // ---- Tab navigation ----
    function openTab(tabId, opts) {
        opts = opts || {};
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.tabIndex = -1;
        });
        const panel = document.getElementById(tabId);
        const btn = document.getElementById('tabbtn-' + tabId.replace('tab-', ''));
        if (!panel || !btn) return;
        panel.classList.add('active');
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.tabIndex = 0;
        if (!opts.silent) {
            try { history.replaceState(null, '', '#' + tabId); } catch (e) { /* file:// origins can block history updates; navigation still works */ }
        }

        if (window.Modules && window.Modules[tabId] && window.Modules[tabId].onShow) {
            window.Modules[tabId].onShow();
        }
    }

    function initTabs() {
        const buttons = Array.from(document.querySelectorAll('.tab-btn'));
        buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => openTab(btn.dataset.tab));
            btn.addEventListener('keydown', (e) => {
                let target = null;
                if (e.key === 'ArrowRight') target = buttons[(i + 1) % buttons.length];
                if (e.key === 'ArrowLeft') target = buttons[(i - 1 + buttons.length) % buttons.length];
                if (e.key === 'Home') target = buttons[0];
                if (e.key === 'End') target = buttons[buttons.length - 1];
                if (target) { e.preventDefault(); target.focus(); openTab(target.dataset.tab); }
            });
        });
        const fromHash = location.hash ? location.hash.slice(1) : null;
        const valid = fromHash && document.getElementById(fromHash);
        openTab(valid ? fromHash : 'tab-home', { silent: true });
    }

    // ---- Toasts ----
    function toast(message) {
        const region = document.getElementById('toast-region');
        if (!region) return;
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = message;
        region.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }

    // ---- Formatting helpers ----
    function formatCurrency(n) {
        return '$' + Math.round(n).toLocaleString();
    }
    function formatPercent(n, digits) {
        digits = digits === undefined ? 2 : digits;
        const sign = n >= 0 ? '+' : '';
        return `${sign}${n.toFixed(digits)}%`;
    }
    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

    function init() {
        initTabs();
        renderProgressWidget();
        renderHomeBadges();
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset all saved progress on this device? This cannot be undone.')) {
                    resetProgress();
                }
            });
        }
    }

    return {
        init, openTab, toast, recordModuleScore, resetProgress,
        formatCurrency, formatPercent, clamp, reducedMotion,
        getState: () => state,
    };
})();

window.Modules = window.Modules || {};
