document.addEventListener("DOMContentLoaded", () => {
    fetch(settings.apiBaseUrl + "/admin/stats")
        .then(response => response.json())
        .then(data => {
            document.getElementById("active-users").textContent = data.activeUsers;
            document.getElementById("total-earnings").textContent = data.totalEarnings;
        });
});
