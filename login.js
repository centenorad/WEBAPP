document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('input-email').value;

    if (email == 'admin@gmail.com') {
        window.location.href = "dashboard.html";
    }
    else {
        window.location.href = "main.html";
    }
});