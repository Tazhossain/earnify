// Ad System Configuration
let autoAdInterval;
const adSettings = {
    adDuration: 30000, // 30 seconds
    pointsPerAd: 20,
    minimumWithdraw: 1000
};

// Telegram Integration
document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('user-profile-pic').src = user.photo_url || 'default-profile.png';
            document.getElementById('username').textContent = `@${user.username}`;
            Telegram.WebApp.ready();
        }
    }
});

function watchAd() {
    // Trigger MoneTag ad
    const adSuccess = window.monetag?.call(this, 'display');
    
    if(adSuccess) {
        document.getElementById('ads-count').textContent++;
        updateBalance(adSettings.pointsPerAd);
        
        // Auto-close ad after duration
        setTimeout(() => {
            window.monetag?.call(this, 'close');
        }, adSettings.adDuration);
    }
}

function toggleAutoAds() {
    if(!autoAdInterval) {
        autoAdInterval = setInterval(watchAd, adSettings.adDuration + 5000);
    } else {
        clearInterval(autoAdInterval);
        autoAdInterval = null;
    }
}

function updateBalance(amount) {
    const earningsElement = document.getElementById('earnings');
    const newBalance = (parseFloat(earningsElement.textContent) + amount).toFixed(2);
    earningsElement.textContent = newBalance;
}

function handleWithdraw() {
    const balance = parseFloat(document.getElementById('earnings').textContent);
    if(balance < adSettings.minimumWithdraw) {
        alert(`Minimum withdrawal: ${adSettings.minimumWithdraw} points`);
        return;
    }
    
    // Implement withdrawal logic
    alert('Withdrawal request submitted!');
}
