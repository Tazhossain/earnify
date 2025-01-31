let adInterval;

function handleAdAction() {
    if(document.getElementById('watch-ad').checked) {
        showAd().then(() => {
            updateBalance(20);
            document.getElementById('watch-ad').checked = false;
        }).catch(() => {
            alert('Failed to load ad');
            document.getElementById('watch-ad').checked = false;
        });
    }
}

function showAd() {
    return new Promise((resolve, reject) => {
        // Implement actual ad display logic here
        if(settings.monetag) {
            // Example ad display logic
            const adWindow = window.open(`https://example-ad-provider.com?tag=${settings.monetag}`, '_blank');
            setTimeout(() => {
                adWindow.close();
                resolve();
            }, 30000);
        } else {
            reject('No ad provider configured');
        }
    });
}

function updateBalance(amount) {
    const earningsElement = document.getElementById('earnings');
    const current = parseFloat(earningsElement.textContent);
    const newBalance = current + amount;
    
    earningsElement.textContent = newBalance.toFixed(2);
    updateProgress(newBalance);
    
    // Update watched ads count
    const adsCount = document.getElementById('ads-count');
    adsCount.textContent = parseInt(adsCount.textContent) + 1;
}

function updateProgress(balance) {
    const progress = (balance % 1000) / 10;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function handleWithdraw() {
    const balance = parseFloat(document.getElementById('earnings').textContent);
    if(balance < 1000) {
        alert(`Minimum withdrawal is 1000 points. Current: ${balance.toFixed(2)}`);
        return;
    }
    Telegram.WebApp.showAlert(`Withdrawal request for ${balance.toFixed(2)} points submitted!`);
}
