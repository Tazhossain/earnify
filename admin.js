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
