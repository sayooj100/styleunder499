// Data structures for the app
const products = [
    {
        id: 1,
        name: "Marlboro Graphic Statement Shirt",
        tagline: "Bold print. Zero effort style.",
        price: 499,
        category: "Statement / Graphic",
        description: "Make a statement without trying too hard. This shirt blends minimal beige tones with a bold graphic print, giving you that standout look without being loud.",
        specs: ["Cotton blend", "Regular / relaxed fit", "Full sleeve", "Beige"],
        images: ["products/PRODUCT1/FRONT.jpg", "products/PRODUCT1/BACK.jpg"],
        qty: 4,
        sizeInfo: "True to size. Size up for a more oversized streetwear look."
    },
    {
        id: 2,
        name: "Supreme Minimal Patch Shirt",
        tagline: "Clean. Subtle. Always hits.",
        price: 499,
        category: "Minimal / Everyday",
        description: "For those who keep it simple but sharp. This shirt features a clean beige base with a subtle chest patch detail, giving you an effortless everyday look.",
        specs: ["Soft cotton", "Regular fit", "Full sleeve", "Beige"],
        images: ["products/PRODUCT2/FRONT.jpg", "products/PRODUCT2/BACK.jpg", "products/PRODUCT2/LIFESTYLE.jpg"],
        qty: 5,
        sizeInfo: "Fits true to size. Go one size up if you prefer a relaxed or oversized fit."
    },
    {
        id: 3,
        name: "Blue Stripe Classic Shirt",
        tagline: "Classic look. Modern vibe.",
        price: 499,
        category: "Classic / Smart Casual",
        description: "A timeless striped shirt designed for everyday versatility. Clean vertical stripes, breathable fabric, and a relaxed feel make it perfect for both casual college days.",
        specs: ["Cotton blend", "Relaxed fit", "Full sleeve", "Light blue & white"],
        images: ["products/PRODUCT3/FRONT.jpg", "products/PRODUCT3/BACK.jpg", "products/PRODUCT3/LIFESTYLE.jpg"],
        qty: 10,
        sizeInfo: "Slightly relaxed fit. Stick to your usual size for a normal fit or size up."
    }
];

const content = {
    hero: [
        {
            title: "Broke but well dressed",
            subtitle: "Style that hits. Prices that don’t.",
            image: "hero/1.jpg",
            cta: "Shop Now"
        },
        {
            title: "Limited Drop ⚡",
            subtitle: "3 styles. Only limited pieces.",
            image: "hero/2.jpg",
            cta: "Grab Yours"
        }
    ],
    whyUs: [
        { title: "Under ₹499, always", text: "Looking good shouldn’t cost a fortune." },
        { title: "Built for students", text: "Fits that match your everyday college vibe." },
        { title: "Cash on Delivery", text: "No online payment stress." },
        { title: "Easy exchange", text: "Size issue? We’ll fix it." }
    ]
};

// App State
let currentView = 'home';
let cart = [];

// DOM Elements
const app = document.getElementById('app');
const cartCount = document.getElementById('cart-count');
const homeBtn = document.getElementById('home-btn');

// Router
function navigate(view, params = {}) {
    currentView = view;
    render(view, params);
    window.scrollTo(0, 0);
}
window.navigate = navigate;

// Render Engine
function render(view, params) {
    switch (view) {
        case 'home':
            renderHome();
            break;
        case 'product':
            renderProduct(params.id);
            break;
        case 'checkout':
            renderCheckout(params.productId, params.size);
            break;
        case 'faq':
            renderFAQ();
            break;
    }
}

function renderHome() {
    app.innerHTML = `
        <section class="hero-slider">
            ${content.hero.map((slide, index) => `
                <div class="hero-slide ${index === 0 ? 'active' : ''}" style="${index === 0 ? 'display: block;' : ''}">
                    <img src="${slide.image}" alt="${slide.title}">
                    <div class="hero-content">
                        <button class="btn hero-cta" onclick="document.getElementById('drop-section').scrollIntoView({behavior: 'smooth'})">${slide.cta}</button>
                    </div>
                </div>
            `).join('')}
            <div class="hero-dots">
                ${content.hero.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
            </div>
        </section>

        <section id="drop-section" class="drop-section">
            <h2 class="section-title">Limited Drop</h2>
            <p class="section-subtitle">3 styles. 25 pieces each.</p>
            <div class="product-carousel" id="product-carousel">
                ${products.map(p => `
                    <div class="product-card" data-id="${p.id}">
                        <div class="product-image-container">
                            <img src="${p.images[0]}" alt="${p.name}">
                        </div>
                        <div class="product-mini-info">
                            <h3>${p.name}</h3>
                            <div class="mini-meta">
                                <p>₹${p.price}</p>
                                <p class="mini-qty">Only ${p.qty} left</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="why-us">
            <h2 class="section-title-center">Why Style Under 499?</h2>
            <div class="cards-stack">
                ${content.whyUs.map(point => `
                    <div class="why-card">
                        <div class="why-icon">⚡</div>
                        <div>
                            <h3>${point.title}</h3>
                            <p>${point.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="final-cta">
            <button class="btn" onclick="document.getElementById('drop-section').scrollIntoView({behavior: 'smooth'})">Shop Now</button>
        </section>

        <section id="faq-section" class="faq-section">
            <h2 class="section-title">Got Questions?</h2>
            <div class="faq-list">
                ${getFAQData().map(faq => `
                    <div class="faq-item">
                        <div class="faq-q">${faq.q}</div>
                        <div class="faq-a">${faq.a}</div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    initHomeInteractions();
}

function initHomeInteractions() {
    // FAQ Accordion
    app.querySelectorAll('.faq-item').forEach(item => {
        item.onclick = () => item.classList.toggle('open');
    });

    // Carousel Focus Scaling
    const carousel = document.getElementById('product-carousel');
    const cards = carousel.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('focused');
            } else {
                entry.target.classList.remove('focused');
            }
        });
    }, {
        root: carousel,
        threshold: 0.7
    });

    cards.forEach(card => {
        observer.observe(card);
        card.onclick = () => navigate('product', { id: card.dataset.id });
    });

    // Hero Auto-slide
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    setInterval(() => {
        slides[currentSlide].style.display = 'none'; // Use display instead of opacity for zero-gap stack
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
        dots[currentSlide].classList.add('active');
    }, 4000);
}

function renderProduct(id) {
    const product = products.find(p => p.id == id);
    if (!product) return navigate('home');

    app.innerHTML = `
        <div class="product-page fade-in">
            <div class="product-gallery">
                ${product.images.map(img => `
                    <div class="gallery-item">
                        <img src="${img}" alt="${product.name}">
                    </div>
                `).join('')}
            </div>
            
            <div class="product-main-info">
                <div class="info-header">
                    <span class="category-chip">${product.category}</span>
                    <h1 class="product-title">${product.name}</h1>
                    <p class="product-tagline">${product.tagline}</p>
                    <div class="price-box">
                        <span class="currency">₹</span>
                        <span class="amount">499</span>
                        <span class="stock-pill">Only ${product.qty} bits left</span>
                    </div>
                </div>

                <div class="product-section">
                    <h3 class="section-label">Select Size</h3>
                    <div class="size-grid">
                        <button class="size-btn">S</button>
                        <button class="size-btn">M</button>
                        <button class="size-btn">L</button>
                        <button class="size-btn">XL</button>
                    </div>
                    <p class="size-guide">${product.sizeInfo}</p>
                </div>

                <div class="product-section">
                    <h3 class="section-label">Description</h3>
                    <p class="product-desc">${product.description}</p>
                </div>

                <div class="product-section">
                    <h3 class="section-label">Highlights</h3>
                    <ul class="highlights-list">
                        ${product.specs.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>

                <div class="trust-badge-container">
                    <div class="trust-badge">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        <span>5-7 Days Delivery</span>
                    </div>
                    <div class="trust-badge">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                        <span>Cash on Delivery</span>
                    </div>
                    <div class="trust-badge">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        <span>Easy Exchange</span>
                    </div>
                </div>
            </div>

            <div class="sticky-cta-bar">
                <div class="sticky-price">₹499</div>
                <button class="btn grab-btn-premium" id="grab-btn">Add to Drop</button>
            </div>
        </div>
    `;

    const sizeBtns = app.querySelectorAll('.size-btn');
    let selectedSize = null;
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.innerText;
        };
    });

    document.getElementById('grab-btn').onclick = () => {
        if (!selectedSize) return alert('Please select a size!');
        navigate('checkout', { productId: product.id, size: selectedSize });
    };
}

function renderCheckout(productId, size) {
    const product = products.find(p => p.id == productId);
    app.innerHTML = `
        <div class="checkout-page fade-in">
            <h1>Confirm Your Drop</h1>
            <p class="subtext">Secure your piece. We'll contact you for delivery.</p>
            
            <div class="order-review-card">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="review-info">
                    <h4>${product.name}</h4>
                    <p>Size: ${size}</p>
                    <p>Price: ₹${product.price}</p>
                </div>
            </div>

            <form id="checkout-form" class="checkout-form">
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" id="name" placeholder="E.g. Rahul Sharma" required>
                </div>
                
                <div class="form-group">
                    <label>WhatsApp / Phone Number</label>
                    <input type="tel" id="phone" placeholder="10-digit number" required>
                </div>
                
                <div class="form-group">
                    <label>Full Delivery Address</label>
                    <textarea id="address" placeholder="House No, Street, Landmark, Pincode" rows="4" required></textarea>
                </div>

                <div class="price-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>₹${product.price}</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery (COD)</span>
                        <span>FREE</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total Payable</span>
                        <span>₹${product.price}</span>
                    </div>
                </div>
                
                <button type="submit" class="btn checkout-btn" id="submit-order">Reserve Your Piece 🔥</button>
            </form>
        </div>
    `;

    document.getElementById('checkout-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-order');
        btn.innerText = "Reserving...";
        btn.disabled = true;

        const orderData = {
            product: product.name,
            size: size,
            price: product.price,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value, // Fixed: user corrected the sheet header!
            address: document.getElementById('address').value,
            timestamp: new Date().toLocaleString()
        };

        // Save to Google Sheets (Mock/Template Logic)
        try {
            await saveToGoogleSheets(orderData);
            renderSuccess();
        } catch (error) {
            console.error(error);
            renderSuccess(); // Still proceed to success page for UX
        }
    };
}

async function saveToGoogleSheets(data) {
    const SHEETS_API = "https://sheetdb.io/api/v1/ob9tf0b939r7t";
    console.log("Saving order to sheets...", data);
    
    try {
        await fetch(SHEETS_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [data] })
        });
        return Promise.resolve();
    } catch (error) {
        console.error("SheetDB Error:", error);
        return Promise.reject(error);
    }
}

function renderSuccess() {
    app.innerHTML = `
        <div class="success-page fade-in">
            <div class="success-icon">🔥</div>
            <h1>You’re in 🔥</h1>
            <p>Your order request has been received. We’ll contact you shortly with the next step.</p>
            <button class="btn" id="success-home-btn">Back to Home</button>
        </div>
    `;
    document.getElementById('success-home-btn').onclick = () => navigate('home');
}

function getFAQData() {
    return [
        { q: "Is everything really under ₹499?", a: "Yes. Every product is priced at ₹499 or below." },
        { q: "Do you offer Cash on Delivery?", a: "Yes, we offer COD across most locations in India." },
        { q: "How long does delivery take?", a: "Orders are delivered within 5–7 days." },
        { q: "What if the size doesn’t fit?", a: "We offer easy exchange for size issues." },
        { q: "Are these good quality?", a: "Yes, we focus on comfortable and reliable everyday wear." },
        { q: "How do I choose my size?", a: "Use the size guide on the product page or go with your usual size." },
        { q: "Can I return the product?", a: "Currently, we offer exchange for size-related issues." },
        { q: "How can I contact you?", a: "Reach us via Instagram DM or email." }
    ];
}

function renderFAQ() {
    const faqs = getFAQData();
    app.innerHTML = `
        <div class="faq-page fade-in">
            <h2 class="section-title">Got Questions? We’ve got answers.</h2>
            <div class="faq-list">
                ${faqs.map(faq => `
                    <div class="faq-item">
                        <div class="faq-q">${faq.q}</div>
                        <div class="faq-a">${faq.a}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    app.querySelectorAll('.faq-item').forEach(item => {
        item.onclick = () => item.classList.toggle('open');
    });
}

// Initial Render
homeBtn.onclick = () => navigate('home');
document.getElementById('view-faq').onclick = (e) => {
    e.preventDefault();
    navigate('faq');
};
render('home');
