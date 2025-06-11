// Get all the slides
const slides        =   document.querySelectorAll('.login-slide');
let currentSlide    =   0;

// Change the active slide every 2 seconds
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 2000);

const loginButton   =   document.getElementById('login-btn');

document.getElementById('login-btn').addEventListener('click', async () => {
    const email     =   document.getElementById('input-email').value;
    const password  =   document.getElementById('input-password').value;

    try {
        const response = await fetch('http://localhost/rso-management-back/login', {
            method  :   'POST',
            body    :   JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) { window.location.href = "sample-home.html"; }
        else             { console.log(response); }
    } catch (error) {
        console.log(error);
    }
})