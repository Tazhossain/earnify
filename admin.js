document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('admin-panel').style.display === 'block') {
        loadAdminData();
    }
});

function loadAdminData() {
    fetch(`${settings.apiBaseUrl}/admin/stats`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('active-users').textContent = data.activeUsers;
            document.getElementById('total-earnings').textContent = `$${data.totalEarnings.toFixed(2)}`;
            document.getElementById('daily-earnings').textContent = `$${data.dailyEarnings.toFixed(2)}`;
            document.getElementById('total-ads').textContent = data.totalAds;
        })
        .catch(error => {
            console.error('Admin data fetch error:', error);
            alert('Failed to load admin data!');
        });
}
