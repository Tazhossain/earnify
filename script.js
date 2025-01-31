document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('meta[name="monetag"]').setAttribute("content", settings.monetag);
});

function watchAd() {
    let balance = parseInt(document.getElementById("earnings").textContent) || 0;
    balance += 20;
    document.getElementById("earnings").textContent = balance + " Coins";
}

function showWithdrawSection() {
    alert("Withdrawal process coming soon!");
}
