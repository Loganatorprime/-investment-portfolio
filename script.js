// Investment Portfolio - JavaScript
// Interactive charts and functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupNavigation();
    initializeTicker();
    initializeTradingSimulator();
});

// Initialize live stock ticker with price updates
function initializeTicker() {
    const tickerData = {
        'RTX': { price: 185.20, basePrice: 185.20 },
        'NOK': { price: 6.40, basePrice: 6.40 },
        'LMT': { price: 512.34, basePrice: 512.34 },
        'BA': { price: 178.92, basePrice: 178.92 },
        'AAPL': { price: 243.56, basePrice: 243.56 },
        'MSFT': { price: 418.23, basePrice: 418.23 },
        'NVDA': { price: 142.67, basePrice: 142.67 },
        'ERIC': { price: 7.85, basePrice: 7.85 },
        'GD': { price: 267.41, basePrice: 267.41 },
        'NOC': { price: 478.56, basePrice: 478.56 }
    };

    function updateTickerPrices() {
        const tickerItems = document.querySelectorAll('.ticker-item');

        tickerItems.forEach(item => {
            const symbolEl = item.querySelector('.ticker-symbol');
            const priceEl = item.querySelector('.ticker-price');
            const changeEl = item.querySelector('.ticker-change');

            if (!symbolEl || !priceEl || !changeEl) return;

            const symbol = symbolEl.textContent;
            if (!tickerData[symbol]) return;

            // Random price fluctuation (-0.5% to +0.5%)
            const fluctuation = (Math.random() - 0.5) * 0.01;
            tickerData[symbol].price *= (1 + fluctuation);

            const currentPrice = tickerData[symbol].price;
            const basePrice = tickerData[symbol].basePrice;
            const change = currentPrice - basePrice;
            const changePercent = ((change / basePrice) * 100);

            // Update price with flash effect
            priceEl.textContent = '$' + currentPrice.toFixed(2);
            priceEl.classList.add('price-flash');
            setTimeout(() => priceEl.classList.remove('price-flash'), 300);

            // Update change
            const sign = change >= 0 ? '+' : '';
            changeEl.textContent = `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;

            // Update color classes
            changeEl.classList.remove('positive', 'negative');
            changeEl.classList.add(change >= 0 ? 'positive' : 'negative');
        });
    }

    // Update prices every 2-4 seconds randomly
    function scheduleUpdate() {
        const delay = 2000 + Math.random() * 2000;
        setTimeout(() => {
            updateTickerPrices();
            scheduleUpdate();
        }, delay);
    }

    scheduleUpdate();
}

// Initialize Chart.js Charts
function initializeCharts() {
    // RTX Stock Chart
    const rtxCtx = document.getElementById('rtxChart');
    if (rtxCtx) {
        new Chart(rtxCtx, {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: 'RTX Stock Price ($)',
                    data: [182.25, 183.40, 182.80, 184.15, 185.20], // Weekly closing prices (Jan 6-10)
                    borderColor: '#ff2a6d',
                    backgroundColor: 'rgba(255, 42, 109, 0.15)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#ff2a6d',
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#ff2a6d',
                    pointHoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'RTX CORPORATION // WEEKLY PERFORMANCE',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: "'Orbitron', sans-serif"
                        },
                        color: '#ff2a6d'
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#b4b4c4',
                            font: {
                                family: "'Rajdhani', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.95)',
                        titleColor: '#ff2a6d',
                        bodyColor: '#fff',
                        borderColor: '#ff2a6d',
                        borderWidth: 1,
                        titleFont: {
                            size: 14,
                            family: "'Orbitron', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Rajdhani', sans-serif"
                        },
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return 'Price: $' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'STOCK PRICE ($)',
                            font: {
                                size: 12,
                                weight: 'bold',
                                family: "'Orbitron', sans-serif"
                            },
                            color: '#b4b4c4'
                        },
                        grid: {
                            color: 'rgba(0, 240, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b4b4c4'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'DAY OF WEEK',
                            font: {
                                size: 12,
                                weight: 'bold',
                                family: "'Orbitron', sans-serif"
                            },
                            color: '#b4b4c4'
                        },
                        grid: {
                            color: 'rgba(0, 240, 255, 0.05)'
                        },
                        ticks: {
                            color: '#b4b4c4'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Nokia Stock Chart
    const nokiaCtx = document.getElementById('nokiaChart');
    if (nokiaCtx) {
        new Chart(nokiaCtx, {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: 'Nokia Stock Price ($)',
                    data: [6.25, 6.30, 6.22, 6.35, 6.40], // Weekly closing prices (Jan 6-10)
                    borderColor: '#00f0ff',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#00f0ff',
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#00f0ff',
                    pointHoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'NOKIA CORPORATION // WEEKLY PERFORMANCE',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: "'Orbitron', sans-serif"
                        },
                        color: '#00f0ff'
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#b4b4c4',
                            font: {
                                family: "'Rajdhani', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.95)',
                        titleColor: '#00f0ff',
                        bodyColor: '#fff',
                        borderColor: '#00f0ff',
                        borderWidth: 1,
                        titleFont: {
                            size: 14,
                            family: "'Orbitron', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Rajdhani', sans-serif"
                        },
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return 'Price: $' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'STOCK PRICE ($)',
                            font: {
                                size: 12,
                                weight: 'bold',
                                family: "'Orbitron', sans-serif"
                            },
                            color: '#b4b4c4'
                        },
                        grid: {
                            color: 'rgba(255, 42, 109, 0.1)'
                        },
                        ticks: {
                            color: '#b4b4c4'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'DAY OF WEEK',
                            font: {
                                size: 12,
                                weight: 'bold',
                                family: "'Orbitron', sans-serif"
                            },
                            color: '#b4b4c4'
                        },
                        grid: {
                            color: 'rgba(255, 42, 109, 0.05)'
                        },
                        ticks: {
                            color: '#b4b4c4'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Smooth scroll navigation
function setupNavigation() {
    const navbar = document.querySelector('.navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, #0f2744, #1a365d)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #1a365d, #2d5a87)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Helper function to calculate investment value
function calculateInvestmentValue(shares, currentPrice) {
    return shares * currentPrice;
}

// Helper function to calculate percentage change
function calculatePercentageChange(startValue, endValue) {
    return ((endValue - startValue) / startValue * 100).toFixed(2);
}

// Portfolio calculations
const portfolio = {
    rtx: {
        initialInvestment: 600000,
        pricePerShare: 181.78,
        shares: Math.floor(600000 / 181.78)
    },
    nokia: {
        initialInvestment: 400000,
        pricePerShare: 6.22,
        shares: Math.floor(400000 / 6.22)
    }
};

// Log portfolio details to console for reference
console.log('Portfolio Summary:');
console.log('RTX Shares:', portfolio.rtx.shares);
console.log('Nokia Shares:', portfolio.nokia.shares);
console.log('Total Initial Investment: $1,000,000');

// Instructions for updating charts
console.log('\n--- HOW TO UPDATE CHARTS WITH YOUR DATA ---');
console.log('1. Find the initializeCharts() function in this file');
console.log('2. Replace the sample data arrays with your actual daily prices');
console.log('3. RTX data array: data: [Mon, Tue, Wed, Thu, Fri]');
console.log('4. Nokia data array: data: [Mon, Tue, Wed, Thu, Fri]');
console.log('5. Save the file and refresh the page');

// ==========================================
// TRADING SIMULATOR GAME
// ==========================================

function initializeTradingSimulator() {
    // Achievement Definitions
    const achievements = [
        { id: 'first_trade', name: 'First Steps', icon: '🎯', description: 'Make your first trade', rarity: 'common' },
        { id: 'buy_10', name: 'Buyer', icon: '🛒', description: 'Complete 10 buy orders', rarity: 'common' },
        { id: 'sell_10', name: 'Seller', icon: '💰', description: 'Complete 10 sell orders', rarity: 'common' },
        { id: 'profit_100', name: 'Pocket Change', icon: '💵', description: 'Earn $100 profit', rarity: 'common' },
        { id: 'profit_500', name: 'Making Bank', icon: '💸', description: 'Earn $500 profit', rarity: 'common' },
        { id: 'profit_1000', name: 'Big Money', icon: '🤑', description: 'Earn $1,000 profit', rarity: 'rare' },
        { id: 'profit_5000', name: 'Whale', icon: '🐋', description: 'Earn $5,000 profit', rarity: 'legendary' },
        { id: 'diversified', name: 'Diversified', icon: '📊', description: 'Own both RTX and NOK', rarity: 'common' },
        { id: 'rtx_fan', name: 'Defense Buff', icon: '🛡️', description: 'Own 20+ RTX shares', rarity: 'common' },
        { id: 'nok_fan', name: '5G Believer', icon: '📡', description: 'Own 500+ NOK shares', rarity: 'common' },
        { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Use 5x speed', rarity: 'common' },
        { id: 'day_trader', name: 'Day Trader', icon: '📈', description: 'Make 25 trades', rarity: 'rare' },
        { id: 'diamond_hands', name: 'Diamond Hands', icon: '💎', description: 'Hold through a 10% drop', rarity: 'rare' },
        { id: 'paper_hands', name: 'Paper Hands', icon: '📄', description: 'Sell everything during a dip', rarity: 'common' },
        { id: 'comeback_kid', name: 'Comeback Kid', icon: '🔥', description: 'Recover from 20% loss to profit', rarity: 'legendary' },
        { id: 'all_in', name: 'YOLO', icon: '🎰', description: 'Spend 90%+ of cash in one trade', rarity: 'rare' },
        { id: 'double_up', name: 'Double Up', icon: '✌️', description: 'Reach $20,000 total value', rarity: 'legendary' },
        { id: 'broke', name: 'Broke', icon: '😭', description: 'Have less than $100 total value', rarity: 'rare' },
        { id: 'penny_pincher', name: 'Penny Pincher', icon: '🪙', description: 'Own 1000+ NOK shares', rarity: 'rare' },
        { id: 'war_profiteer', name: 'War Profiteer', icon: '🚀', description: 'Own 50+ RTX shares', rarity: 'rare' }
    ];

    // Game State
    const gameState = {
        cash: 10000,
        startingCash: 10000,
        holdings: {
            RTX: 0,
            NOK: 0
        },
        stocks: {
            RTX: {
                price: 185.20,
                startPrice: 185.20,
                candles: [],
                currentCandle: null,
                volatility: 0.02,
                tickCount: 0
            },
            NOK: {
                price: 6.40,
                startPrice: 6.40,
                candles: [],
                currentCandle: null,
                volatility: 0.03,
                tickCount: 0
            }
        },
        speed: 1,
        isPaused: false,
        ticksPerCandle: 5,
        // Achievement tracking
        achievementsUnlocked: [],
        stats: {
            totalTrades: 0,
            buyOrders: 0,
            sellOrders: 0,
            maxProfit: 0,
            maxLoss: 0,
            wasDown20: false
        }
    };

    // Mini Charts
    let rtxChart, nokChart;

    // DOM Elements
    const elements = {
        cash: document.getElementById('sim-cash'),
        portfolio: document.getElementById('sim-portfolio'),
        total: document.getElementById('sim-total'),
        pnl: document.getElementById('sim-pnl'),
        rtxPrice: document.getElementById('rtx-price'),
        rtxChange: document.getElementById('rtx-change'),
        rtxShares: document.getElementById('rtx-shares'),
        rtxValue: document.getElementById('rtx-value'),
        rtxQty: document.getElementById('rtx-qty'),
        nokPrice: document.getElementById('nok-price'),
        nokChange: document.getElementById('nok-change'),
        nokShares: document.getElementById('nok-shares'),
        nokValue: document.getElementById('nok-value'),
        nokQty: document.getElementById('nok-qty'),
        tradeLog: document.getElementById('trade-log'),
        speedBtn: document.getElementById('sim-speed-btn'),
        resetBtn: document.getElementById('sim-reset-btn'),
        achievementsGrid: document.getElementById('achievements-grid'),
        achievementsCount: document.getElementById('achievements-count'),
        achievementPopup: document.getElementById('achievement-popup'),
        achievementIcon: document.getElementById('achievement-icon'),
        achievementName: document.getElementById('achievement-name')
    };

    // Render achievements grid
    function renderAchievements() {
        if (!elements.achievementsGrid) return;

        elements.achievementsGrid.innerHTML = achievements.map(ach => {
            const isUnlocked = gameState.achievementsUnlocked.includes(ach.id);
            const rarityClass = ach.rarity !== 'common' ? ach.rarity : '';
            return `
                <div class="achievement-badge ${isUnlocked ? 'unlocked' : 'locked'} ${rarityClass}"
                     data-id="${ach.id}"
                     data-description="${ach.description}">
                    <span class="badge-icon">${ach.icon}</span>
                    <span class="badge-name">${ach.name}</span>
                </div>
            `;
        }).join('');

        // Update count
        if (elements.achievementsCount) {
            elements.achievementsCount.textContent = `${gameState.achievementsUnlocked.length}/${achievements.length}`;
        }
    }

    // Show achievement popup
    function showAchievementPopup(achievement) {
        if (!elements.achievementPopup) return;

        elements.achievementIcon.textContent = achievement.icon;
        elements.achievementName.textContent = achievement.name;

        elements.achievementPopup.classList.add('show');

        // Hide after 4 seconds
        setTimeout(() => {
            elements.achievementPopup.classList.remove('show');
        }, 4000);
    }

    // Unlock an achievement
    function unlockAchievement(achievementId) {
        if (gameState.achievementsUnlocked.includes(achievementId)) return;

        const achievement = achievements.find(a => a.id === achievementId);
        if (!achievement) return;

        gameState.achievementsUnlocked.push(achievementId);
        addLog(`Achievement unlocked: ${achievement.name}!`, 'system');
        showAchievementPopup(achievement);
        renderAchievements();
    }

    // Check achievements based on current state
    function checkAchievements() {
        const rtxValue = gameState.holdings.RTX * gameState.stocks.RTX.price;
        const nokValue = gameState.holdings.NOK * gameState.stocks.NOK.price;
        const portfolioValue = rtxValue + nokValue;
        const totalValue = gameState.cash + portfolioValue;
        const profit = totalValue - gameState.startingCash;
        const profitPercent = (profit / gameState.startingCash) * 100;

        // Track max profit/loss
        gameState.stats.maxProfit = Math.max(gameState.stats.maxProfit, profit);
        gameState.stats.maxLoss = Math.min(gameState.stats.maxLoss, profit);

        // Track if was ever down 20%
        if (profitPercent <= -20) {
            gameState.stats.wasDown20 = true;
        }

        // First trade
        if (gameState.stats.totalTrades >= 1) {
            unlockAchievement('first_trade');
        }

        // Buy orders
        if (gameState.stats.buyOrders >= 10) {
            unlockAchievement('buy_10');
        }

        // Sell orders
        if (gameState.stats.sellOrders >= 10) {
            unlockAchievement('sell_10');
        }

        // Profit milestones
        if (profit >= 100) unlockAchievement('profit_100');
        if (profit >= 500) unlockAchievement('profit_500');
        if (profit >= 1000) unlockAchievement('profit_1000');
        if (profit >= 5000) unlockAchievement('profit_5000');

        // Diversified - own both stocks
        if (gameState.holdings.RTX > 0 && gameState.holdings.NOK > 0) {
            unlockAchievement('diversified');
        }

        // RTX fan
        if (gameState.holdings.RTX >= 20) {
            unlockAchievement('rtx_fan');
        }

        // NOK fan
        if (gameState.holdings.NOK >= 500) {
            unlockAchievement('nok_fan');
        }

        // Day trader
        if (gameState.stats.totalTrades >= 25) {
            unlockAchievement('day_trader');
        }

        // Diamond hands - have holdings and be down 10%+
        if (portfolioValue > 0 && profitPercent <= -10) {
            unlockAchievement('diamond_hands');
        }

        // Paper hands - sell everything while down
        if (portfolioValue === 0 && gameState.stats.totalTrades > 0 && profitPercent < 0) {
            unlockAchievement('paper_hands');
        }

        // Comeback kid - was down 20%, now in profit
        if (gameState.stats.wasDown20 && profit > 0) {
            unlockAchievement('comeback_kid');
        }

        // Double up - reach $20,000
        if (totalValue >= 20000) {
            unlockAchievement('double_up');
        }

        // Broke - less than $100 total
        if (totalValue < 100 && gameState.stats.totalTrades > 0) {
            unlockAchievement('broke');
        }

        // Penny pincher - own 1000+ NOK
        if (gameState.holdings.NOK >= 1000) {
            unlockAchievement('penny_pincher');
        }

        // War profiteer - own 50+ RTX
        if (gameState.holdings.RTX >= 50) {
            unlockAchievement('war_profiteer');
        }
    }

    // Initialize candlestick data
    function initCandleData(symbol) {
        const stock = gameState.stocks[symbol];
        const basePrice = stock.price;
        stock.candles = [];

        // Generate initial historical candles
        let price = basePrice * 0.95;
        for (let i = 0; i < 20; i++) {
            const open = price;
            const volatility = stock.volatility * price;
            const close = price + (Math.random() - 0.45) * volatility * 2;
            const high = Math.max(open, close) + Math.random() * volatility;
            const low = Math.min(open, close) - Math.random() * volatility;

            stock.candles.push({
                x: Date.now() - (20 - i) * 5000,
                o: open,
                h: high,
                l: low,
                c: close
            });
            price = close;
        }
        stock.price = price;
        stock.currentCandle = {
            x: Date.now(),
            o: price,
            h: price,
            l: price,
            c: price
        };
    }

    // Initialize mini charts
    function initMiniCharts() {
        // Initialize candle data
        initCandleData('RTX');
        initCandleData('NOK');

        const chartConfig = {
            type: 'candlestick',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: {
                        display: false,
                        type: 'timeseries',
                        time: { unit: 'second' }
                    },
                    y: {
                        display: false,
                        beginAtZero: false
                    }
                },
                animation: { duration: 0 }
            }
        };

        const rtxCtx = document.getElementById('rtx-mini-chart');
        const nokCtx = document.getElementById('nok-mini-chart');

        if (rtxCtx) {
            rtxChart = new Chart(rtxCtx, {
                ...chartConfig,
                data: {
                    datasets: [{
                        data: [...gameState.stocks.RTX.candles, gameState.stocks.RTX.currentCandle],
                        color: {
                            up: '#39ff14',
                            down: '#ff2a6d',
                            unchanged: '#888888'
                        },
                        borderColor: {
                            up: '#39ff14',
                            down: '#ff2a6d',
                            unchanged: '#888888'
                        }
                    }]
                }
            });
        }

        if (nokCtx) {
            nokChart = new Chart(nokCtx, {
                ...chartConfig,
                data: {
                    datasets: [{
                        data: [...gameState.stocks.NOK.candles, gameState.stocks.NOK.currentCandle],
                        color: {
                            up: '#39ff14',
                            down: '#ff2a6d',
                            unchanged: '#888888'
                        },
                        borderColor: {
                            up: '#39ff14',
                            down: '#ff2a6d',
                            unchanged: '#888888'
                        }
                    }]
                }
            });
        }
    }

    // Update stock prices with random walk
    function updatePrices() {
        ['RTX', 'NOK'].forEach(symbol => {
            const stock = gameState.stocks[symbol];
            const change = (Math.random() - 0.48) * stock.volatility * stock.price;
            const newPrice = Math.max(stock.price + change, 0.01);

            stock.price = newPrice;
            stock.tickCount++;

            // Update current candle
            if (stock.currentCandle) {
                stock.currentCandle.c = newPrice;
                stock.currentCandle.h = Math.max(stock.currentCandle.h, newPrice);
                stock.currentCandle.l = Math.min(stock.currentCandle.l, newPrice);
            }

            // Create new candle every N ticks
            if (stock.tickCount >= gameState.ticksPerCandle) {
                stock.tickCount = 0;
                if (stock.currentCandle) {
                    stock.candles.push(stock.currentCandle);
                    if (stock.candles.length > 25) {
                        stock.candles.shift();
                    }
                }
                stock.currentCandle = {
                    x: Date.now(),
                    o: newPrice,
                    h: newPrice,
                    l: newPrice,
                    c: newPrice
                };
            }

            // Update UI
            const priceEl = elements[symbol.toLowerCase() + 'Price'];
            const changeEl = elements[symbol.toLowerCase() + 'Change'];

            if (priceEl) {
                priceEl.textContent = '$' + newPrice.toFixed(2);
                priceEl.classList.remove('price-up', 'price-down');
                priceEl.classList.add(change >= 0 ? 'price-up' : 'price-down');
            }

            if (changeEl) {
                const totalChange = newPrice - stock.startPrice;
                const percentChange = (totalChange / stock.startPrice) * 100;
                const sign = totalChange >= 0 ? '+' : '';
                changeEl.textContent = `${sign}${totalChange.toFixed(2)} (${sign}${percentChange.toFixed(2)}%)`;
                changeEl.classList.remove('positive', 'negative');
                changeEl.classList.add(totalChange >= 0 ? 'positive' : 'negative');
            }
        });

        // Update charts
        if (rtxChart) {
            const rtxData = [...gameState.stocks.RTX.candles];
            if (gameState.stocks.RTX.currentCandle) {
                rtxData.push(gameState.stocks.RTX.currentCandle);
            }
            rtxChart.data.datasets[0].data = rtxData;
            rtxChart.update('none');
        }

        if (nokChart) {
            const nokData = [...gameState.stocks.NOK.candles];
            if (gameState.stocks.NOK.currentCandle) {
                nokData.push(gameState.stocks.NOK.currentCandle);
            }
            nokChart.data.datasets[0].data = nokData;
            nokChart.update('none');
        }

        updateStats();
        checkAchievements();
    }

    // Update portfolio stats
    function updateStats() {
        const rtxValue = gameState.holdings.RTX * gameState.stocks.RTX.price;
        const nokValue = gameState.holdings.NOK * gameState.stocks.NOK.price;
        const portfolioValue = rtxValue + nokValue;
        const totalValue = gameState.cash + portfolioValue;
        const pnl = totalValue - gameState.startingCash;
        const pnlPercent = (pnl / gameState.startingCash) * 100;

        elements.cash.textContent = '$' + gameState.cash.toFixed(2);
        elements.portfolio.textContent = '$' + portfolioValue.toFixed(2);
        elements.total.textContent = '$' + totalValue.toFixed(2);

        const pnlSign = pnl >= 0 ? '+' : '';
        elements.pnl.textContent = `${pnlSign}$${pnl.toFixed(2)} (${pnlSign}${pnlPercent.toFixed(2)}%)`;
        elements.pnl.classList.remove('positive', 'negative');
        elements.pnl.classList.add(pnl >= 0 ? 'positive' : 'negative');

        elements.rtxShares.textContent = gameState.holdings.RTX;
        elements.rtxValue.textContent = '$' + rtxValue.toFixed(2);
        elements.nokShares.textContent = gameState.holdings.NOK;
        elements.nokValue.textContent = '$' + nokValue.toFixed(2);
    }

    // Add log entry
    function addLog(message, type = 'system') {
        const entry = document.createElement('div');
        entry.className = 'log-entry ' + type;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        elements.tradeLog.insertBefore(entry, elements.tradeLog.firstChild.nextSibling);

        // Keep only last 50 entries
        while (elements.tradeLog.children.length > 51) {
            elements.tradeLog.removeChild(elements.tradeLog.lastChild);
        }
    }

    // Execute trade
    function executeTrade(symbol, action, quantity) {
        const stock = gameState.stocks[symbol];
        const totalCost = stock.price * quantity;

        if (action === 'buy') {
            if (totalCost > gameState.cash) {
                addLog(`Insufficient funds to buy ${quantity} ${symbol}`, 'error');
                return false;
            }
            // Check for YOLO achievement before spending
            if (totalCost >= gameState.cash * 0.9) {
                unlockAchievement('all_in');
            }
            gameState.cash -= totalCost;
            gameState.holdings[symbol] += quantity;
            gameState.stats.buyOrders++;
            addLog(`Bought ${quantity} ${symbol} @ $${stock.price.toFixed(2)} = $${totalCost.toFixed(2)}`, 'buy');
        } else {
            if (quantity > gameState.holdings[symbol]) {
                addLog(`Not enough ${symbol} shares to sell`, 'error');
                return false;
            }
            gameState.cash += totalCost;
            gameState.holdings[symbol] -= quantity;
            gameState.stats.sellOrders++;
            addLog(`Sold ${quantity} ${symbol} @ $${stock.price.toFixed(2)} = $${totalCost.toFixed(2)}`, 'sell');
        }

        gameState.stats.totalTrades++;
        updateStats();
        checkAchievements();
        return true;
    }

    // Reset game
    function resetGame() {
        gameState.cash = 10000;
        gameState.holdings = { RTX: 0, NOK: 0 };

        // Reset stats
        gameState.stats = {
            totalTrades: 0,
            buyOrders: 0,
            sellOrders: 0,
            maxProfit: 0,
            maxLoss: 0,
            wasDown20: false
        };

        // Reset achievements
        gameState.achievementsUnlocked = [];

        // Reset RTX
        gameState.stocks.RTX.price = 185.20;
        gameState.stocks.RTX.startPrice = 185.20;
        gameState.stocks.RTX.tickCount = 0;
        initCandleData('RTX');

        // Reset NOK
        gameState.stocks.NOK.price = 6.40;
        gameState.stocks.NOK.startPrice = 6.40;
        gameState.stocks.NOK.tickCount = 0;
        initCandleData('NOK');

        // Update charts
        if (rtxChart) {
            rtxChart.data.datasets[0].data = [...gameState.stocks.RTX.candles, gameState.stocks.RTX.currentCandle];
            rtxChart.update('none');
        }
        if (nokChart) {
            nokChart.data.datasets[0].data = [...gameState.stocks.NOK.candles, gameState.stocks.NOK.currentCandle];
            nokChart.update('none');
        }

        elements.tradeLog.innerHTML = '<div class="log-entry system">System initialized. Starting cash: $10,000.00</div>';

        updateStats();
        renderAchievements();
        addLog('Game reset! Good luck, trader.', 'system');
    }

    // Event Listeners
    document.querySelectorAll('.trade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const symbol = btn.dataset.stock;
            const action = btn.dataset.action;
            const qtyInput = document.getElementById(symbol.toLowerCase() + '-qty');
            const quantity = parseInt(qtyInput.value) || 1;
            executeTrade(symbol, action, quantity);
        });
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const symbol = btn.dataset.stock;
            const qtyInput = document.getElementById(symbol.toLowerCase() + '-qty');
            let value = parseInt(qtyInput.value) || 1;

            if (btn.classList.contains('plus')) {
                value = Math.min(value + (symbol === 'RTX' ? 5 : 50), symbol === 'RTX' ? 1000 : 10000);
            } else {
                value = Math.max(value - (symbol === 'RTX' ? 5 : 50), 1);
            }

            qtyInput.value = value;
        });
    });

    elements.speedBtn.addEventListener('click', () => {
        gameState.speed = gameState.speed === 1 ? 2 : gameState.speed === 2 ? 5 : 1;
        elements.speedBtn.textContent = `SPEED: ${gameState.speed}X`;

        // Speed demon achievement
        if (gameState.speed === 5) {
            unlockAchievement('speed_demon');
        }
    });

    elements.resetBtn.addEventListener('click', resetGame);

    // Start price updates
    function gameLoop() {
        updatePrices();
        setTimeout(gameLoop, 1000 / gameState.speed);
    }

    // Initialize
    initMiniCharts();
    updateStats();
    renderAchievements();
    gameLoop();

    console.log('%c💰 TRADING SIMULATOR LOADED 💰', 'color: #39ff14; font-size: 16px; font-weight: bold;');
    console.log('%c🏆 ACHIEVEMENTS SYSTEM ACTIVE 🏆', 'color: #f9f002; font-size: 14px; font-weight: bold;');
}
