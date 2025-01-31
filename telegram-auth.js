// Handle Telegram WebApp initialization
document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
        Telegram.WebApp.ready();
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('username').textContent = `@${user.username}`;
            if (user.photo_url) {
                document.getElementById('user-profile-pic').src = user.photo_url;
            }
        }
    }
});
