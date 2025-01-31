function adminLogin() {
    const username = document.getElementById('admin-user').value;
    const password = document.getElementById('admin-pass').value;

    if(username === settings.adminUser && password === settings.adminPass) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        loadAdminData();
        setInterval(loadAdminData, 10000); // Refresh every 10 seconds
    } else {
        alert('Invalid credentials!');
    }
}

async function loadAdminData() {
    try {
        const response = await fetch(`${settings.apiBaseUrl}/admin/stats`);
        const data = await response.json();
        
        // Update stats
        document.getElementById('active-users').textContent = data.activeUsers;
        document.getElementById('total-earnings').textContent = data.totalEarnings;
        document.getElementById('daily-earnings').textContent = data.dailyEarnings;
        document.getElementById('total-ads').textContent = data.totalAds;
        
        // Update user list
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = data.users.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.points}</td>
                <td>${new Date(user.lastActive).toLocaleString()}</td>
            </tr>
        `).join('');
        
        // Update timestamp
        document.getElementById('update-time').textContent = new Date().toLocaleTimeString();
    } catch (error) {
        console.error('Admin data error:', error);
    }
}
