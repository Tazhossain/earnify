let adInterval;

// Telegram Integration
document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('user-profile-pic').src = user.photo_url || 'placeholder.png';
            document.getElementById('username').textContent = `@${user.username}`;
            Telegram.WebApp.ready();
        }
    }
});

function handleAdAction() {
    const watchAdCheckbox = document.getElementById('watch-ad');
    if (watchAdCheckbox.checked) {
        showAd().then(() => {
            updateBalance(20);
            watchAdCheckbox.checked = false;
        }).catch(() => {
            alert('Ad failed to load!');
            watchAdCheckbox.checked = false;
        });
    }
}

function showAd() {
    return new Promise((resolve, reject) => {
        // Replace with actual ad display logic
        if (settings.monetag) {
            const adWindow = window.open(`https://dummyadprovider.com?tag=${settings.monetag}`, '_blank');
            setTimeout(() => {
                adWindow.close();
                resolve();
            }, 30000); // Close after 30s
        } else {
            reject('No ad tag configured');
        }
    });
}

function updateBalance(amount) {
    const earningsElement = document.getElementById('earnings');
    const current = parseFloat(earningsElement.textContent);
    const newBalance = (current + amount).toFixed(2);
    earningsElement.textContent = newBalance;
    updateProgress(newBalance);
    document.getElementById('ads-count').textContent = parseInt(document.getElementById('ads-count').textContent) + 1;
}

function updateProgress(balance) {
    const progress = (balance % 1000) / 10;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function handleWithdraw() {
    const balance = parseFloat(document.getElementById('earnings').textContent);
    if (balance < 1000) {
        alert(`Minimum withdrawal: 1000 points (Current: ${balance})`);
    } else {
        Telegram.WebApp.showAlert(`Withdrawal request for ${balance} points submitted!`);
    }
}

function toggleAutoAds() {
    const autoAdsCheckbox = document.getElementById('auto-ads');
    if (autoAdsCheckbox.checked) {
        adInterval = setInterval(() => handleAdAction(), 60000); // Auto-run every 60s
    } else {
        clearInterval(adInterval);
    }
}
