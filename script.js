// ============================================
// PREMIUM SMART AC DASHBOARD
// Full-Featured with Beautiful UI
// ============================================

const LG_AC_MODELS = [
    { name: "LG Smart Inverter AC", code: "MS-Q24ENZA", emoji: "❄️" },
];

const state = {
    acStatus: false,
    acMode: 'cool',
    temperature: 22,
    costToday: 10,
    costWeek: 170,
    costMonth: 350,
    monthlyBudget: 500,
    darkMode: localStorage.getItem('darkMode') === 'true',
    acModel: JSON.parse(localStorage.getItem('acModel')) || LG_AC_MODELS[0],
    usageWeekly: [1.2, 1.5, 1.3, 2.1, 1.8, 2.5, 1.9],
};

const ELECTRICITY_RATE = 8;
let charts = {};

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    updateACModel();
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

function updateACModel() {
    document.getElementById('acModelImage').textContent = state.acModel.emoji;
    document.getElementById('acModelName').textContent = state.acModel.name;
    document.getElementById('acModelCode').textContent = 'Model: ' + state.acModel.code;
    document.getElementById('infoModel').textContent = state.acModel.name;
}

// ============================================
// TABS
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
        settings: 'Settings'
    };

    document.getElementById('pageTitle').textContent = titles[tabName];

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
    showToast(state.acStatus ? '❄️ AC Turned ON' : '🔌 AC Turned OFF');
}

function setACMode(mode) {
    state.acMode = mode;
    document.querySelectorAll('.mode-btn-full').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    saveState();
}

function activateSleepMode() {
    state.temperature = Math.min(state.temperature + 2, 30);
    updateTemperature();
    showToast('😴 Sleep mode activated');
}

function activateQuickCool() {
    state.temperature = 18;
    state.acStatus = true;
    updateTemperature();
    updateDisplay();
    showToast('🧊 Quick cool activated');
}

function activateEcoMode() {
    state.temperature = 24;
    updateTemperature();
    showToast('🌿 Eco mode activated');
}

// ============================================
// TEMPERATURE
// ============================================

function updateTemperature(value = null) {
    if (value !== null) {
        state.temperature = parseInt(value);
    }
    document.getElementById('tempBig').textContent = state.temperature;
    document.getElementById('tempSlider').value = state.temperature;
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
            showToast('✅ Command executed');
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
// BUDGET
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
        updateDisplay();
        showToast('💳 Budget updated');
    }
}

// ============================================
// DISPLAY
// ============================================

function updateDisplay() {
    updateACStatus();
    updateCostDisplay();
    updateBudgetDisplay();
}

function updateACStatus() {
    const statusCircle = document.getElementById('statusCircle');
    const acToggleBtn = document.getElementById('acToggleBtn');
    const infoStatus = document.getElementById('infoStatus');

    if (state.acStatus) {
        statusCircle.textContent = 'ON';
        statusCircle.classList.remove('off');
        acToggleBtn.textContent = 'Turn OFF';
        acToggleBtn.classList.remove('off');
        infoStatus.textContent = 'ON';
        infoStatus.classList.add('on');
    } else {
        statusCircle.textContent = 'OFF';
        statusCircle.classList.add('off');
        acToggleBtn.textContent = 'Turn ON';
        acToggleBtn.classList.add('off');
        infoStatus.textContent = 'OFF';
        infoStatus.classList.remove('on');
    }
}

function updateCostDisplay() {
    document.getElementById('costToday').textContent = '₹' + state.costToday;
    document.getElementById('costWeek').textContent = '₹' + state.costWeek;
    document.getElementById('costMonth').textContent = '₹' + state.costMonth;
}

function updateBudgetDisplay() {
    const percentage = (state.costMonth / state.monthlyBudget) * 100;
    const remaining = state.monthlyBudget - state.costMonth;

    document.getElementById('budgetPercent').textContent = Math.round(percentage) + '%';
    document.getElementById('budgetUsed').textContent = '₹' + Math.round(state.costMonth);
    document.getElementById('budgetTotal').textContent = '₹' + state.monthlyBudget;
    document.getElementById('budgetRemain').textContent = '₹' + Math.max(0, Math.round(remaining));

    // Update gauge
    const circumference = 251.2;
    const strokeDash = Math.min((percentage / 100) * circumference, circumference);
    const circle = document.querySelector('.budget-gauge circle:nth-child(2)');
    if (circle) {
        circle.style.strokeDasharray = strokeDash + ' ' + circumference;
        
        if (percentage > 80) {
            circle.style.stroke = '#ff6b6b';
        } else if (percentage > 60) {
            circle.style.stroke = '#f39c12';
        } else {
            circle.style.stroke = '#00d4ff';
        }
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

    const data24h = Array.from({ length: 24 }, () => Math.random() * 2.5 + 0.5);

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
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 3, ticks: { color: '#64748b' } },
                x: { ticks: { color: '#64748b' } }
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
                borderRadius: 8,
                borderColor: 'transparent'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { color: '#64748b' } } }
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
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#00d4ff'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { color: '#64748b' } } }
        }
    });
}

function initMonthlyChart() {
    const container = document.getElementById('monthlyChart');
    if (!container) return;

    const data = Array.from({ length: 30 }, (_, i) => 
        8 + Math.random() * 5 + Math.sin(i * 0.2) * 2
    );

    const options = {
        chart: { type: 'area', height: 280, sparkline: { enabled: false } },
        series: [{ name: 'Daily Cost (₹)', data: data }],
        colors: ['#00d4ff'],
        stroke: { curve: 'smooth', width: 2.5 },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
        xaxis: { labels: { style: { colors: '#64748b' } } },
        yaxis: { labels: { style: { colors: '#64748b' } } },
    };

    if (charts.monthly) charts.monthly.destroy();
    charts.monthly = new ApexCharts(container, options);
    charts.monthly.render();
}

function initCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;

    const costs = state.usageWeekly.map(u => u * ELECTRICITY_RATE);

    if (charts.cost) charts.cost.destroy();
    charts.cost = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Cost (₹)',
                data: costs,
                backgroundColor: costs.map(c => c > 20 ? '#ff6b6b' : c > 12 ? '#f39c12' : '#2ecc71'),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { color: '#64748b' } } }
        }
    });
}

// ============================================
// NOTIFICATIONS
// ============================================

function showToast(message) {
    const container = document.getElementById('notificationContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

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
            document.querySelectorAll('.modal.active').forEach(m => {
                m.classList.remove('active');
            });
        }
    });
}

// ============================================
// AUTO UPDATE
// ============================================

function startAutoUpdates() {
    setInterval(() => {
        if (state.acStatus) {
            state.costToday += Math.random() * 0.5;
            updateDisplay();
        }
    }, 5000);

    setInterval(() => {
        document.getElementById('lastUpdate').textContent = 'now';
    }, 30000);
}

// ============================================
// STORAGE
// ============================================

function saveState() {
    localStorage.setItem('smartACState', JSON.stringify({
        acStatus: state.acStatus,
        temperature: state.temperature,
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
