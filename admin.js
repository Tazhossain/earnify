document.addEventListener("DOMContentLoaded", () => {
    const panel = document.querySelector('.admin-panel');
    panel.insertAdjacentHTML('afterbegin', '<div class="loading">Loading statistics...</div>');
    
    fetch(settings.apiBaseUrl + "/admin/stats")
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            document.getElementById("active-users").textContent = data.activeUsers;
            document.getElementById("total-earnings").textContent = data.totalEarnings;
            document.querySelector('.loading').remove();
        })
        .catch(error => {
            document.querySelector('.loading').remove();
            panel.insertAdjacentHTML('afterbegin', 
                `<div class="error">Failed to load statistics: ${error.message}</div>`
            );
        });
});

function updateAdminDashboard(data) {
    // Update statistics
    document.getElementById('active-users').textContent = data.activeUsers;
    document.getElementById('total-earnings').textContent = `$${data.totalEarnings.toFixed(2)}`;
    document.getElementById('daily-earnings').textContent = `$${data.dailyEarnings.toFixed(2)}`;
    document.getElementById('total-ads').textContent = data.totalAds;
    
    // Update activities
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = data.activities.map(activity => `
        <div class="activity-item">
            <span class="activity-time">[${new Date(activity.timestamp).toLocaleTimeString()}]</span>
            <span class="activity-text">${activity.description}</span>
        </div>
    `).join('');
    
    // Update last updated time
    document.getElementById('last-updated').textContent = new Date().toLocaleString();
}

function showAdminError(error) {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = `
        <div class="error">
            ❌ Error loading data: ${error.message}
        </div>
    `;
}

// Initial call if needed
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById('admin-panel').style.display === 'block') {
        loadAdminData();
    }
});
