// ============================================
// ADVANCED SMART AC DASHBOARD
// Premium JavaScript with Full Features
// ============================================

// === GLOBAL STATE ===
const state = {
    acStatus: false,
    acMode: 'cool',
    temperature: 22,
    usageToday: 0,
    usageWeekly: [8.5, 7.9, 9.2, 8.1, 8.7, 7.4, 7.6],
    usageMonthly: [245, 238, 252, 241, 256, 248, 262, 251, 245, 238, 252, 241],
    costToday: 0,
    monthlyBudget: 2000,
    budgetThreshold: 80,
    darkMode: localStorage.getItem('darkMode') === 'true',
    lastUpdated: new Date(),
    acRuntime: 0,
    peakHour: '2 PM',
    efficiencyScore: 92,
    efficiencyGrade: 'A+',
};

const ELECTRICITY_RATE = 8; // ₹ per kWh
const DAILY_USAGE_LIMIT = 15; // kWh

// Chart instances
let charts = {};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
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
    
    // Reinitialize charts with new theme
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        initializeCharts();
    }, 300);
}

// ============================================
// TAB NAVIGATION
// ============================================

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    const tabElement = document.getElementById(`${tabName}-tab`);
    if (tabElement) {
        tabElement.classList.add('active');
    }

    // Mark nav item as active
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update header
    const titles = {
        dashboard: 'Dashboard',
        analytics: 'Analytics',
        efficiency: 'Energy Efficiency',
        budgeting: 'Budget Management',
        reports: 'Reports'
    };

    document.getElementById('pageTitle').textContent = titles[tabName] || 'Dashboard';

    // Reinitialize charts if switching to analytics
    if (tabName === 'analytics') {
        setTimeout(() => {
            initializeCharts();
        }, 100);
    }
}

// ============================================
// AC CONTROL
// ============================================

function toggleAC() {
    state.acStatus = !state.acStatus;
    state.lastUpdated = new Date();
    updateDisplay();
    saveState();
    
    const message = state.acStatus ? '❄️ AC turned ON' : '🔌 AC turned OFF';
    showToast(message, 'info');
}

function setACMode(mode) {
    state.acMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    showToast(`Mode changed to ${mode.toUpperCase()}`, 'info');
    saveState();
}

function activateSleepMode() {
    state.temperature = Math.min(state.temperature + 2, 30);
    updateTemperature();
    showToast('😴 Sleep mode activated - Temperature increased by 2°C', 'success');
}

function activateQuickCool() {
    state.temperature = 18;
    state.acStatus = true;
    updateTemperature();
    updateDisplay();
    showToast('🧊 Quick cool activated - Set to 18°C for 30 minutes', 'success');
    setTimeout(() => {
        state.temperature = 22;
        updateTemperature();
    }, 30 * 60 * 1000);
}

function activateEcoMode() {
    state.acMode = 'cool';
    state.temperature = 24;
    updateTemperature();
    showToast('🌿 Eco mode activated - Set to 24°C', 'success');
}

function activateEcoHours() {
    showToast('🌍 Eco hours enabled (6-9 AM & 6-9 PM)', 'success');
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
    state.lastUpdated = new Date();
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

function setTemp(temp) {
    state.temperature = temp;
    updateTemperature();
    showToast(`Temperature set to ${temp}°C`, 'info');
}

// ============================================
// VOICE CONTROL
// ============================================

function startVoiceControl() {
    const modal = document.getElementById('voiceModal');
    modal.classList.add('active');
    
    // Simulate voice commands
    const commands = [
        'Listening for commands...',
        'Did you say "increase temperature"?',
        'Adjusting temperature to 24°C',
        'Temperature updated successfully'
    ];

    let commandIndex = 0;
    const interval = setInterval(() => {
        if (commandIndex < commands.length) {
            document.getElementById('voiceText').textContent = commands[commandIndex];
            commandIndex++;
        } else {
            clearInterval(interval);
            closeVoiceModal();
            showToast('✅ Voice command executed', 'success');
        }
    }, 1500);
}

function stopVoiceControl() {
    closeVoiceModal();
}

function closeVoiceModal() {
    document.getElementById('voiceModal').classList.remove('active');
}

// ============================================
// BUDGET MANAGEMENT
// ============================================

function openBudgetModal() {
    const modal = document.getElementById('budgetModal');
    modal.classList.add('active');
    document.getElementById('budgetInput').value = state.monthlyBudget;
    document.getElementById('thresholdInput').value = state.budgetThreshold;
}

function closeBudgetModal() {
    document.getElementById('budgetModal').classList.remove('active');
}

function saveBudget() {
    const budget = parseFloat(document.getElementById('budgetInput').value);
    const threshold = parseFloat(document.getElementById('thresholdInput').value);

    if (budget > 0 && threshold >= 0 && threshold <= 100) {
        state.monthlyBudget = budget;
        state.budgetThreshold = threshold;
        localStorage.setItem('smartACBudget', JSON.stringify({
            budget: state.monthlyBudget,
            threshold: state.budgetThreshold
        }));
        closeBudgetModal();
        updateBudgetDisplay();
        showToast('💳 Budget updated successfully', 'success');
    } else {
        showToast('⚠️ Please enter valid values', 'warning');
    }
}

// ============================================
// DISPLAY UPDATES
// ============================================

function updateDisplay() {
    updateACStatus();
    updatePowerConsumption();
    updateCostDisplay();
    updateBudgetDisplay();
    updateEfficiencyDisplay();
}

function updateACStatus() {
    const statusCircle = document.getElementById('statusCircle');
    const acToggleBtn = document.getElementById('acToggleBtn');
    const statusDot = document.getElementById('statusDot');

    if (state.acStatus) {
        statusCircle.textContent = 'ON';
        statusCircle.classList.remove('off');
        acToggleBtn.textContent = 'Turn OFF';
        acToggleBtn.classList.remove('off');
        statusDot.classList.add('active');
        state.acRuntime += 0.1;
    } else {
        statusCircle.textContent = 'OFF';
        statusCircle.classList.add('off');
        acToggleBtn.textContent = 'Turn ON';
        acToggleBtn.classList.add('off');
        statusDot.classList.remove('active');
    }
}

function updatePowerConsumption() {
    // Simulate power consumption
    if (state.acStatus) {
        const baseUsage = 0.5;
        const tempFactor = Math.abs(state.temperature - 22) * 0.05;
        const randomFactor = Math.random() * 0.1;
        const usage = baseUsage + tempFactor + randomFactor;

        state.usageToday += usage / 100; // Normalize
        state.costToday = state.usageToday * ELECTRICITY_RATE;
    }

    // Update dashboard display
    document.getElementById('dashboardUsage').textContent = (state.usageToday / 10).toFixed(1) + ' kW';
    document.getElementById('dashboardCost').textContent = '₹' + state.costToday.toFixed(2);

    // Update cost badge color
    const costBadge = document.getElementById('costBadge');
    if (state.costToday > 100) {
        costBadge.textContent = 'High';
        costBadge.style.background = 'rgba(255, 107, 107, 0.2)';
        costBadge.style.color = '#ff6b6b';
    } else if (state.costToday > 50) {
        costBadge.textContent = 'Moderate';
        costBadge.style.background = 'rgba(243, 156, 18, 0.2)';
        costBadge.style.color = '#f39c12';
    } else {
        costBadge.textContent = 'Normal';
        costBadge.style.background = 'rgba(46, 204, 113, 0.2)';
        costBadge.style.color = '#2ecc71';
    }
}

function updateCostDisplay() {
    document.getElementById('costValue').textContent = state.costToday.toFixed(2);
}

function updateBudgetDisplay() {
    const budgetPercent = (state.costToday / state.monthlyBudget) * 100;
    const remaining = state.monthlyBudget - state.costToday;

    document.getElementById('budgetDisplay').textContent = '₹' + state.monthlyBudget;
    document.getElementById('budgetUsed').textContent = '₹' + state.costToday.toFixed(0);
    document.getElementById('budgetTotal').textContent = '/ ₹' + state.monthlyBudget;
    document.getElementById('remainingAmount').textContent = '₹' + remaining.toFixed(0);
    document.getElementById('dailyAverage').textContent = '₹' + (state.costToday / new Date().getDate()).toFixed(2);

    // Update budget gauge
    if (charts.budgetGauge && budgetPercent <= 100) {
        const circumference = 188.4;
        const strokeDash = (budgetPercent / 100) * circumference;
        const circles = document.querySelectorAll('#budgetGauge circle:nth-child(2)');
        circles.forEach(circle => {
            circle.style.strokeDasharray = strokeDash + ' ' + circumference;
        });
    }

    // Alert if over budget
    if (budgetPercent > state.budgetThreshold && budgetPercent <= 100) {
        showToast(`⚠️ Budget alert: You've used ${budgetPercent.toFixed(0)}% of your monthly budget`, 'warning');
    }
}

function updateEfficiencyDisplay() {
    // Calculate efficiency score
    const tempConsistency = 95;
    const powerOptimization = 88;
    const usagePatterns = 92;

    state.efficiencyScore = Math.round((tempConsistency + powerOptimization + usagePatterns) / 3);

    if (state.efficiencyScore >= 90) {
        state.efficiencyGrade = 'A+';
    } else if (state.efficiencyScore >= 80) {
        state.efficiencyGrade = 'A';
    } else if (state.efficiencyScore >= 70) {
        state.efficiencyGrade = 'B';
    } else {
        state.efficiencyGrade = 'C';
    }

    document.getElementById('efficiencyScore').textContent = state.efficiencyGrade;
    document.getElementById('ratingGrade').textContent = state.efficiencyGrade;
    document.getElementById('ratingPercent').textContent = state.efficiencyScore + '%';

    // Update gauge
    if (state.efficiencyScore <= 100) {
        const circumference = 188.4;
        const strokeDash = (state.efficiencyScore / 100) * circumference;
        const circles = document.querySelectorAll('#efficiencyGauge circle:nth-child(2)');
        circles.forEach(circle => {
            circle.style.strokeDasharray = strokeDash + ' ' + circumference;
        });
    }
}

// ============================================
// CHART INITIALIZATION & UPDATES
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

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    // Generate 24-hour data
    const data24h = Array.from({ length: 24 }, (_, i) => {
        return Math.random() * 2 + 0.5;
    });

    if (charts.power) charts.power.destroy();

    charts.power = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => i + ':00'),
            datasets: [{
                label: 'Power Consumption (kW)',
                data: data24h,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: textColor }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 3,
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            }
        }
    });
}

function initDailyChart() {
    const ctx = document.getElementById('dailyChart');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';

    if (charts.daily) charts.daily.destroy();

    charts.daily = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
            datasets: [{
                label: 'Energy Usage (kWh)',
                data: [0.5, 1.2, 2.1, 2.8, 1.9, 1.5, 0.3],
                backgroundColor: [
                    '#00d4ff', '#00a8d8', '#0096b6', '#007a94', '#005e72', '#004250', '#00262e'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor }
                },
                x: {
                    ticks: { color: textColor }
                }
            }
        }
    });
}

function initWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';

    if (charts.weekly) charts.weekly.destroy();

    charts.weekly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'This Week',
                    data: state.usageWeekly,
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Last Week',
                    data: [7.8, 8.2, 8.5, 7.9, 8.1, 7.2, 7.5],
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor }
                },
                x: {
                    ticks: { color: textColor }
                }
            }
        }
    });
}

function initMonthlyChart() {
    const container = document.getElementById('monthlyChart');
    if (!container) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';

    const options = {
        chart: {
            type: 'area',
            height: 350,
            background: 'transparent',
            sparkline: { enabled: false }
        },
        series: [{
            name: 'Energy Usage (kWh)',
            data: state.usageMonthly
        }],
        colors: ['#00d4ff'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            }
        },
        xaxis: {
            labels: {
                style: { colors: textColor }
            }
        },
        yaxis: {
            labels: {
                style: { colors: textColor }
            }
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light'
        }
    };

    if (charts.monthly) charts.monthly.destroy();

    charts.monthly = new ApexCharts(container, options);
    charts.monthly.render();
}

function initCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#cbd5e1' : '#64748b';

    const costs = state.usageWeekly.map(usage => usage * ELECTRICITY_RATE);

    if (charts.cost) charts.cost.destroy();

    charts.cost = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Daily Cost (₹)',
                data: costs,
                backgroundColor: costs.map(cost => {
                    if (cost > 70) return '#ff6b6b';
                    if (cost > 50) return '#f39c12';
                    return '#2ecc71';
                }),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: textColor }
                },
                x: {
                    ticks: { color: textColor }
                }
            }
        }
    });
}

function updateChartRange(range) {
    // Update button state
    document.querySelectorAll('.chart-controls .btn-sm').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Regenerate chart data based on range
    showToast(`📊 Chart range updated to ${range}`, 'info');
}

function generateReport(period) {
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const titles = {
        weekly: 'Weekly Report - March 5-11, 2025',
        monthly: 'Monthly Report - March 2025',
        yearly: 'Yearly Report - 2025'
    };

    document.getElementById('reportTitle').textContent = titles[period];
    showToast(`📋 ${period.charAt(0).toUpperCase() + period.slice(1)} report generated`, 'info');
}

function downloadReport() {
    showToast('📥 Report download started...', 'info');
}

function shareReport() {
    showToast('📧 Report shared via email', 'success');
}

// ============================================
// NOTIFICATIONS & TOAST
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        warning: '⚠',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    // Temperature slider
    const tempSlider = document.getElementById('tempSlider');
    if (tempSlider) {
        tempSlider.addEventListener('input', (e) => {
            updateTemperature(e.target.value);
        });
    }

    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // ESC key to close modals
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
    // Update display every 2 seconds
    setInterval(updateDisplay, 2000);

    // Update last updated time
    setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - state.lastUpdated) / 1000);
        let timeStr = 'just now';

        if (diff < 60) timeStr = diff + 's ago';
        else if (diff < 3600) timeStr = Math.floor(diff / 60) + 'm ago';
        else timeStr = Math.floor(diff / 3600) + 'h ago';

        const element = document.getElementById('lastUpdate');
        if (element) element.textContent = timeStr;
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

    const budgetSaved = localStorage.getItem('smartACBudget');
    if (budgetSaved) {
        const budget = JSON.parse(budgetSaved);
        state.monthlyBudget = budget.budget;
        state.budgetThreshold = budget.threshold;
    }
}
