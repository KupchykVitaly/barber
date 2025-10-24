// API Base URL
const API_URL = 'api.php';

// Utility Functions
const api = {
    async get(endpoint) {
        const response = await fetch(`${API_URL}?request=${endpoint}`);
        return response.json();
    },
    
    async post(endpoint, data) {
        const response = await fetch(`${API_URL}?request=${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};

// Auth Functions
const auth = {
    currentUser: null,
    
    async checkAuth() {
        try {
            const response = await api.get('current-user');
            if (!response.error) {
                this.currentUser = response;
                this.updateUI();
                return true;
            }
        } catch (e) {
            // Не авторизований
        }
        this.currentUser = null;
        this.updateUI();
        return false;
    },
    
    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');
        
        if (!authButtons || !userMenu) return;
        
        if (this.currentUser) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            if (userName) {
                userName.textContent = this.currentUser.name;
            }
        } else {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    },
    
    async login(email, password) {
        return await api.post('login', { email, password });
    },
    
    async register(name, email, phone, password) {
        return await api.post('register', { name, email, phone, password });
    },
    
    async logout() {
        await api.post('logout', {});
        this.currentUser = null;
        this.updateUI();
        window.location.href = 'index.html';
    }
};

// Logout Button Handler
document.addEventListener('DOMContentLoaded', () => {
    auth.checkAuth();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => auth.logout());
    }
});

// Helper Functions
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-error">${message}</div>`;
    }
}

function formatPrice(price) {
    return `${price} грн`;
}

function formatDuration(minutes) {
    return `${minutes} хв`;
}

function createStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += `
            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `;
    }
    return `<div class="stars">${stars}</div>`;
}

// Service Card Component
function createServiceCard(service) {
    return `
        <div class="card">
            <div class="card-content">
                <div class="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 6l6 6-6 6M18 6l-6 6 6 6"/>
                    </svg>
                </div>
                <h3>${service.name}</h3>
                <p class="text-muted">${service.description}</p>
                <p style="font-size: 1.5rem; margin: 1rem 0;">${formatPrice(service.price)}</p>
                <p class="text-muted">${formatDuration(service.duration)}</p>
                <a href="booking.html?service=${service.id}" class="btn btn-outline" style="width: 100%; margin-top: 1rem;">Записатися</a>
            </div>
        </div>
    `;
}

// Barber Card Component
function createBarberCard(barber) {
    return `
        <div class="card">
            <img src="${barber.photo}" alt="${barber.name}" class="card-image">
            <div class="card-content">
                <h3>${barber.name}</h3>
                <p class="text-muted">${barber.specialization}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <a href="barber.html?id=${barber.id}" class="btn btn-outline" style="flex: 1;">Профіль</a>
                    <a href="booking.html?barber=${barber.id}" class="btn btn-primary" style="flex: 1;">Записатися</a>
                </div>
            </div>
        </div>
    `;
}

// Testimonial Card Component
function createTestimonialCard(testimonial) {
    return `
        <div class="card">
            <div class="card-content">
                ${createStars(testimonial.rating)}
                <p style="margin-bottom: 1rem;">${testimonial.text}</p>
                <p style="font-weight: 600;">${testimonial.name}</p>
            </div>
        </div>
    `;
}

// Gallery Item Component
function createGalleryItem(image) {
    return `
        <div style="overflow: hidden; border-radius: var(--radius);">
            <img src="${image.image_url}" alt="Gallery" style="width: 100%; height: 250px; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        </div>
    `;
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '300px';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Form Validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
}