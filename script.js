// ============================================
// MOBILE-OPTIMIZED SMART AC DASHBOARD
// Essential Features Only
// ============================================

// LG AC Models Database
const LG_AC_MODELS = [
    { name: "LG Smart Inverter", code: "MS-Q24ENZA", emoji: "❄️" },
    { name: "LG Dual Inverter", code: "MS-Q18UFOA", emoji: "🧊" },
    { name: "LG AI Cool", code: "LS-Q18BWZA", emoji: "🤖" },
    { name: "LG Eco Smart", code: "MS-Q19PMZA", emoji: "🌿" },
    { name: "LG Ultra Quiet", code: "MS-Q22BEZA", emoji: "🔇" },
];

// State Management
const state = {
    acStatus: false,
    acMode: 'cool',
    temperature: 22,
    usageToday: 0,
    usageWeekly: [1.2, 1.5, 1.3, 2.1, 1.8, 2.5, 1.9],
    costToday: 0,
    monthlyBudget: 500,
    darkMode: localStorage.getItem('darkMode') === 'true',
    acModel: JSON.parse(localStorage.getItem('acModel')) || LG_AC_MODELS[0],
};

const ELECTRICITY_RATE = 8; // ₹ per kWh
let charts = {};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeACModel();
    initializeCharts();
    attachEventListeners();
    updateDisplay();
    startAutoUpdates();
    loadState();
});

// ============================================
// DARK MODE
// ============================================

function initializeDarkMode() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', state.darkMode);
}

// ============================================
// AC MODEL
// ============================================

function initializeACModel() {
    updateACModelDisplay();
}

function updateACModelDisplay() {
    document.getElementById('acModelImage').textContent = state.acModel.emoji;
    document.getElementById('acModelName').textContent = state.acModel.name;
    document.getElementById('acModelCode').textContent = 'Model: ' + state.acModel.code;
}

function randomizeACModel() {
    state.acModel = LG_AC_MODELS[Math.floor(Math.random() * LG_AC_MODELS.length)];
    localStorage.setItem('acModel', JSON.stringify(state.acModel));
    updateACModelDisplay();
}

// ============================================
// TAB NAVIGATION
// ============================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const tabElement = document.getElementById(`${tabName}-tab`);
    if (tabElement) {
        tabElement.classList.add('active');
    }

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        analytics: 'Analytics',
        budgeting: 'Budget'
    };

    document.getElementById('pageTitle').textContent = titles[tabName] || 'Dashboard';

    if (tabName === 'analytics') {
        setTimeout(() => {
            Object.values(charts).forEach(chart => {
                if (chart && chart.resize) chart.resize();
            });
        }, 100);
    }
}

// ============================================
// AC CONTROL
// ============================================

function toggleAC() {
    state.acStatus = !state.acStatus;
    updateDisplay();
    saveState();
    showToast(state.acStatus ? '❄️ AC Turned ON' : '🔌 AC Turned OFF', 'info');
}

function setACMode(mode) {
    state.acMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    saveState();
}

function activateSleepMode() {
    state.temperature = Math.min(state.temperature + 2, 30);
    updateTemperature();
    showToast('😴 Sleep mode activated', 'success');
}

function activateQuickCool() {
    state.temperature = 18;
    state.acStatus = true;
    updateTemperature();
    updateDisplay();
    showToast('🧊 Quick cool activated', 'success');
}

function activateEcoMode() {
    state.temperature = 24;
    updateTemperature();
    showToast('🌿 Eco mode activated', 'success');
}

// ============================================
// TEMPERATURE CONTROL
// ============================================

function updateTemperature(value = null) {
    if (value !== null) {
        state.temperature = parseInt(value);
    }
    document.getElementById('tempBig').textContent = state.temperature;
    document.getElementById('tempSlider').value = state.temperature;
    document.getElementById('dashboardTemp').textContent = state.temperature + '°C';
    saveState();
}

function increaseTemp() {
    if (state.temperature < 30) {
        state.temperature++;
        updateTemperature();
    }
}

function decreaseTemp() {
    if (state.temperature > 16) {
        state.temperature--;
        updateTemperature();
    }
}

// ============================================
// VOICE CONTROL
// ============================================

function startVoiceControl() {
    document.getElementById('voiceModal').classList.add('active');
    const commands = [
        'Listening for commands...',
        'Did you say "cool"?',
        'Adjusting temperature to 22°C',
        'Command executed!'
    ];

    let commandIndex = 0;
    const interval = setInterval(() => {
        if (commandIndex < commands.length) {
            document.getElementById('voiceText').textContent = commands[commandIndex];
            commandIndex++;
        } else {
            clearInterval(interval);
            closeVoiceModal();
            showToast('✅ Command executed', 'success');
        }
    }, 1500);
}

function closeVoiceModal() {
    document.getElementById('voiceModal').classList.remove('active');
}

function stopVoiceControl() {
    closeVoiceModal();
}

// ============================================
// BUDGET MANAGEMENT
// ============================================

function openBudgetModal() {
    document.getElementById('budgetModal').classList.add('active');
    document.getElementById('budgetInput').value = state.monthlyBudget;
}

function closeBudgetModal() {
    document.getElementById('budgetModal').classList.remove('active');
}

function saveBudget() {
    const budget = parseFloat(document.getElementById('budgetInput').value);
    if (budget > 0) {
        state.monthlyBudget = budget;
        localStorage.setItem('smartACBudget', budget);
        closeBudgetModal();
        updateBudgetDisplay();
        showToast('💳 Budget updated', 'success');
    }
}

// ============================================
// DISPLAY UPDATES
// ============================================

function updateDisplay() {
    updateACStatus();
    updatePowerConsumption();
    updateBudgetDisplay();
}

function updateACStatus() {
    const statusCircle = document.getElementById('statusCircle');
    const acToggleBtn = document.getElementById('acToggleBtn');

    if (state.acStatus) {
        statusCircle.textContent = 'ON';
        statusCircle.classList.remove('off');
        acToggleBtn.textContent = 'Turn OFF';
        acToggleBtn.classList.remove('off');
    } else {
        statusCircle.textContent = 'OFF';
        statusCircle.classList.add('off');
        acToggleBtn.textContent = 'Turn ON';
        acToggleBtn.classList.add('off');
    }
}

function updatePowerConsumption() {
    if (state.acStatus) {
        const baseUsage = 0.5;
        const tempFactor = Math.abs(state.temperature - 22) * 0.05;
        const randomFactor = Math.random() * 0.1;
        const usage = baseUsage + tempFactor + randomFactor;
        state.usageToday += usage / 100;
        state.costToday = state.usageToday * ELECTRICITY_RATE;
    }

    document.getElementById('dashboardUsage').textContent = (state.usageToday / 10).toFixed(1) + ' kW';
    document.getElementById('dashboardCost').textContent = '₹' + Math.round(state.costToday);
}

function updateBudgetDisplay() {
    const remaining = state.monthlyBudget - state.costToday;
    const percentage = (state.costToday / state.monthlyBudget) * 100;

    document.getElementById('budgetUsed').textContent = '₹' + Math.round(state.costToday);
    document.getElementById('budgetTotal').textContent = '/ ₹' + state.monthlyBudget;
    document.getElementById('remainingAmount').textContent = '₹' + Math.max(0, Math.round(remaining));

    // Update gauge
    const circumference = 188.4;
    const strokeDash = Math.min((percentage / 100) * circumference, circumference);
    const circle = document.querySelector('#budgetGauge circle:nth-child(2)');
    if (circle) {
        circle.style.strokeDasharray = strokeDash + ' ' + circumference;
    }

    // Change color based on usage
    if (percentage > 80) {
        circle.style.stroke = '#ff6b6b';
    } else if (percentage > 60) {
        circle.style.stroke = '#f39c12';
    } else {
        circle.style.stroke = '#00d4ff';
    }
}

// ============================================
// CHARTS
// ============================================

function initializeCharts() {
    initPowerChart();
    initDailyChart();
    initWeeklyChart();
    initMonthlyChart();
    initCostChart();
}

function initPowerChart() {
    const ctx = document.getElementById('powerChart');
    if (!ctx) return;

    const data24h = Array.from({ length: 24 }, () => Math.random() * 2 + 0.5);

    if (charts.power) charts.power.destroy();
    charts.power = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => i + ':00'),
            datasets: [{
                label: 'Power (kW)',
                data: data24h,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 3 },
                x: { display: true }
            }
        }
    });
}

function initDailyChart() {
    const ctx = document.getElementById('dailyChart');
    if (!ctx) return;

    if (charts.daily) charts.daily.destroy();
    charts.daily = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
            datasets: [{
                label: 'Usage (kWh)',
                data: [0.5, 1.2, 2.1, 2.8, 1.9, 0.5],
                backgroundColor: '#00d4ff',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function initWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;

    if (charts.weekly) charts.weekly.destroy();
    charts.weekly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Usage (kWh)',
                data: state.usageWeekly,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function initMonthlyChart() {
    const container = document.getElementById('monthlyChart');
    if (!container) return;

    const data = Array.from({ length: 30 }, (_, i) => 
        15 + Math.random() * 20 + Math.sin(i * 0.2) * 5
    );

    const options = {
        chart: { type: 'area', height: 300, sparkline: { enabled: false } },
        series: [{ name: 'Daily Usage (kWh)', data: data }],
        colors: ['#00d4ff'],
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
        tooltip: { theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light' }
    };

    if (charts.monthly) charts.monthly.destroy();
    charts.monthly = new ApexCharts(container, options);
    charts.monthly.render();
}

function initCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;

    const costs = state.usageWeekly.map(usage => usage * ELECTRICITY_RATE);

    if (charts.cost) charts.cost.destroy();
    charts.cost = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Cost (₹)',
                data: costs,
                backgroundColor: costs.map(c => c > 20 ? '#ff6b6b' : c > 12 ? '#f39c12' : '#2ecc71'),
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// ============================================
// NOTIFICATIONS
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    const tempSlider = document.getElementById('tempSlider');
    if (tempSlider) {
        tempSlider.addEventListener('input', (e) => {
            updateTemperature(e.target.value);
        });
    }

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// ============================================
// AUTO UPDATES
// ============================================

function startAutoUpdates() {
    setInterval(updateDisplay, 3000);

    setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - new Date()) / 1000);
        document.getElementById('lastUpdate').textContent = 'just now';
    }, 30000);
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveState() {
    localStorage.setItem('smartACState', JSON.stringify({
        acStatus: state.acStatus,
        acMode: state.acMode,
        temperature: state.temperature,
        usageToday: state.usageToday,
        costToday: state.costToday,
        darkMode: state.darkMode
    }));
}

function loadState() {
    const saved = localStorage.getItem('smartACState');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(state, loaded);
        updateDisplay();
    }

    const budget = localStorage.getItem('smartACBudget');
    if (budget) {
        state.monthlyBudget = parseFloat(budget);
    }
}
