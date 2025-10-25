// ===== PRODUCT DATA (Realistic Kenyan Medicines) =====
const sampleProducts = {
    new: [
        { name: 'Panadol 500mg (GSK)', category: 'Pain Relief', price: 380, originalPrice: 450, emoji: '💊', badge: '-16%' },
        { name: 'Redoxon Vitamin C 1000mg', category: 'Vitamins', price: 1250, originalPrice: 1500, emoji: '🍊', badge: '-17%' },
        { name: 'Dettol Hand Sanitizer 500ml', category: 'Personal Care', price: 470, originalPrice: 600, emoji: '🧴', badge: '-22%' },
        { name: 'Accu-Chek Active Test Strips (50s)', category: 'Diabetes Care', price: 3200, originalPrice: 3800, emoji: '🩸', badge: '-16%' },
        { name: '3M N95 Face Masks (20 Pack)', category: 'PPE', price: 1800, originalPrice: 2200, emoji: '😷', badge: '-18%' },
        { name: 'Savlon Antiseptic Cream', category: 'First Aid', price: 580, originalPrice: 700, emoji: '🩹', badge: '-17%' },
        { name: 'Seven Seas Multivitamin', category: 'Vitamins', price: 1900, originalPrice: 2300, emoji: '💊', badge: '-17%' },
        { name: 'Omron Blood Pressure Monitor', category: 'Medical Devices', price: 4800, originalPrice: 5800, emoji: '📊', badge: '-17%' }
    ],
    popular: [
        { name: 'Brufen 400mg (Roche)', category: 'Pain Relief', price: 420, originalPrice: 550, emoji: '💊', badge: '-24%' },
        { name: 'Seven Seas Omega-3 Fish Oil', category: 'Supplements', price: 2300, originalPrice: 2900, emoji: '🐟', badge: '-21%' },
        { name: 'Nivea Soft Moisturizing Lotion', category: 'Skin Care', price: 1550, originalPrice: 1900, emoji: '🧴', badge: '-18%' },
        { name: 'Amoxil 500mg Capsules (GSK)', category: 'Antibiotics', price: 850, originalPrice: 1100, emoji: '💊', badge: '-23%' },
        { name: 'Culturelle Probiotic Capsules', category: 'Digestive Health', price: 2600, originalPrice: 3100, emoji: '🦠', badge: '-16%' },
        { name: 'Vicks Cough Syrup 200ml', category: 'Cold & Flu', price: 880, originalPrice: 1100, emoji: '🍯', badge: '-20%' },
        { name: 'Caltrate Calcium + D3', category: 'Bone Health', price: 1450, originalPrice: 1800, emoji: '🦴', badge: '-19%' },
        { name: 'Cipla Eye Drops (Tears Naturale)', category: 'Eye Care', price: 780, originalPrice: 1000, emoji: '👁️', badge: '-22%' }
    ],
    offers: [
        { name: 'Zincovit Zinc + Vitamins', category: 'Immunity', price: 920, originalPrice: 1400, emoji: '💊', badge: '-34%' },
        { name: 'Neutrogena Sunscreen SPF 50', category: 'Skin Care', price: 1850, originalPrice: 2500, emoji: '☀️', badge: '-26%' },
        { name: 'Cairo Family First Aid Kit', category: 'Medical Supplies', price: 2900, originalPrice: 4200, emoji: '🚑', badge: '-31%' },
        { name: 'Betadine Antiseptic Solution', category: 'First Aid', price: 620, originalPrice: 900, emoji: '🧪', badge: '-31%' },
        { name: 'Claritin Allergy Relief Tablets', category: 'Allergies', price: 980, originalPrice: 1350, emoji: '💊', badge: '-27%' },
        { name: 'Accu-Chek Guide Me Glucose Monitor', category: 'Medical Devices', price: 5600, originalPrice: 7600, emoji: '📱', badge: '-26%', stock: false }
    ]
};

// ===== RENDER PRODUCTS =====
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.emoji}
                ${product.badge ? `<span class="product-badge ${product.stock === false ? 'out-of-stock' : ''}">${product.stock === false ? 'Out of Stock' : product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">KSh ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">KSh ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" ${product.stock === false ? 'disabled' : ''} onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price})">
                    ${product.stock === false ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
}

// Render all product sections
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(sampleProducts.new, 'new-products');
    renderProducts(sampleProducts.popular, 'popular-products');
    renderProducts(sampleProducts.offers, 'offers-products');
});

// ===== CART FUNCTIONALITY =====
let cartCount = 0;

function addToCart(productName, price) {
    cartCount++;
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }

    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #800075;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
    `;
    notification.textContent = `"${productName}" added to cart!`;
    document.body.appendChild(notification);

    // Auto-remove after 2s
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Add cart animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsContainer = document.querySelector('.slider-dots');

// Create dots
if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Attach event listeners
document.querySelector('.slider-nav.next')?.addEventListener('click', nextSlide);
document.querySelector('.slider-nav.prev')?.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.hero-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptBtn = document.getElementById('cookie-accept');

if (cookieAcceptBtn && cookieBanner) {
    // Check if already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }

    cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

function handleSearch() {
    const term = searchInput?.value.trim();
    if (term) {
        alert(`Searching for: "${term}"\n(Connect to backend for real results)`);
        searchInput.value = '';
    }
}

searchBtn?.addEventListener('click', handleSearch);
searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});