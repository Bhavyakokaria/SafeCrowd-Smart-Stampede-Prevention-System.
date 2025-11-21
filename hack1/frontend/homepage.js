// Sample user data (in a real app, this would be on a server)
const users = [
    { email: "admin@safecrowd.com", password: "admin123" },
    { email: "user@safecrowd.com", password: "user123" }
];

// Modal functionality
const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLogin');
const closeBtn = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

openBtn.addEventListener('click', () => modal.classList.add('active'));
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    loginError.style.display = 'none';
    loginForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        loginError.style.display = 'none';
        loginForm.reset();
    }
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Close modal and reset form
            modal.classList.remove('active');
            loginForm.reset();
            loginError.style.display = 'none';
            
            // Reload page to update UI
            window.location.reload();
        } else {
            loginError.textContent = data.error || 'Invalid email or password';
            loginError.style.display = 'block';
        }
    } catch (error) {
        loginError.textContent = 'Error connecting to server';
        loginError.style.display = 'block';
    }
});