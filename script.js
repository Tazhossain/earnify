document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('meta[name="monetag"]').setAttribute("content", settings.monetag);
    // Add any initialization logic here
});

function watchAd() {
    const earningsElement = document.getElementById('earnings');
    let balance = parseInt(earningsElement.textContent) || 0;
    
    // Add visual feedback
    earningsElement.classList.add('pulse');
    setTimeout(() => earningsElement.classList.remove('pulse'), 200);
    
    // Update balance
    balance += 20;
    earningsElement.textContent = balance;
    
    // Add to watched ads count
    const adsCount = document.getElementById('ads-count');
    adsCount.textContent = parseInt(adsCount.textContent) + 1;
}

function showWithdrawSection() {
    // Implement proper withdrawal UI instead of alert
    const minimum = 1000;
    const current = parseInt(document.getElementById('earnings').textContent);
    
    if (current < minimum) {
        alert(`Minimum withdrawal amount is ${minimum} coins. Keep earning!`);
        return;
    }
    
    // Add proper withdrawal form here
    alert("Withdrawal system coming soon!");
}
