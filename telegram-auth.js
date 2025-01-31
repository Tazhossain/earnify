// Handle Telegram Web App integration
document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        
        // Update user info
        if(user) {
            document.getElementById('user-profile-pic').src = user.photo_url;
            document.getElementById('username').textContent = `@${user.username}`;
            Telegram.WebApp.ready();
        }
        
        // Expand the app to full view
        Telegram.WebApp.expand();
    }
});
