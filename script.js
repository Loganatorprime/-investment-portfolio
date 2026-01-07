// Investment Portfolio - JavaScript
// Interactive charts and functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupNavigation();
});

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
                    data: [181.78, 182.50, 183.20, 182.80, 184.00], // Sample data - replace with actual tracking
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#0066cc',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'RTX Corporation - Weekly Stock Performance',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#1a365d'
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 51, 102, 0.9)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
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
                            text: 'Stock Price ($)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Day of Week',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
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
                    data: [6.22, 6.35, 6.28, 6.40, 6.45], // Sample data - replace with actual tracking
                    borderColor: '#124191',
                    backgroundColor: 'rgba(18, 65, 145, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#124191',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Nokia Corporation - Weekly Stock Performance',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#124191'
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 65, 145, 0.9)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
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
                            text: 'Stock Price ($)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Day of Week',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
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
