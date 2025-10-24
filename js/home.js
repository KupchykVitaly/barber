// Load Home Page Data
document.addEventListener('DOMContentLoaded', async () => {
    await loadServices();
    await loadBarbers();
    await loadTestimonials();
    await loadGallery();
});

async function loadServices() {
    showLoading('services-grid');
    try {
        const services = await api.get('services');
        const servicesGrid = document.getElementById('services-grid');
        
        if (services && services.length > 0) {
            servicesGrid.innerHTML = services.slice(0, 3)
                .map(service => createServiceCard(service))
                .join('');
        } else {
            servicesGrid.innerHTML = '<p>Послуги не знайдено</p>';
        }
    } catch (error) {
        showError('services-grid', 'Помилка завантаження послуг');
    }
}

async function loadBarbers() {
    showLoading('barbers-grid');
    try {
        const barbers = await api.get('barbers');
        const barbersGrid = document.getElementById('barbers-grid');
        
        if (barbers && barbers.length > 0) {
            barbersGrid.innerHTML = barbers
                .map(barber => createBarberCard(barber))
                .join('');
        } else {
            barbersGrid.innerHTML = '<p>Барбери не знайдено</p>';
        }
    } catch (error) {
        showError('barbers-grid', 'Помилка завантаження барберів');
    }
}

async function loadTestimonials() {
    showLoading('testimonials-grid');
    try {
        const testimonials = await api.get('testimonials');
        const testimonialsGrid = document.getElementById('testimonials-grid');
        
        if (testimonials && testimonials.length > 0) {
            testimonialsGrid.innerHTML = testimonials.slice(0, 4)
                .map(testimonial => createTestimonialCard(testimonial))
                .join('');
        } else {
            testimonialsGrid.innerHTML = '<p>Відгуки не знайдено</p>';
        }
    } catch (error) {
        showError('testimonials-grid', 'Помилка завантаження відгуків');
    }
}

async function loadGallery() {
    showLoading('gallery-preview');
    try {
        const gallery = await api.get('gallery');
        const galleryPreview = document.getElementById('gallery-preview');
        
        if (gallery && gallery.length > 0) {
            galleryPreview.innerHTML = gallery.slice(0, 6)
                .map(image => createGalleryItem(image))
                .join('');
        } else {
            galleryPreview.innerHTML = '<p>Галерея порожня</p>';
        }
    } catch (error) {
        showError('gallery-preview', 'Помилка завантаження галереї');
    }
}