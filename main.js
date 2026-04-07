document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Home page
  if (document.getElementById('restaurant-grid')) {
    renderRestaurants(restaurants);
    setupFilters();
  }

  // Menu page
  if (document.getElementById('menu-container')) {
    loadMenuPage();
  }

  // Cart page
  if (document.getElementById('cart-container')) {
    renderCart();
  }

  // Checkout page
  if (document.getElementById('checkout-form')) {
    setupCheckout();
  }
});

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function renderRestaurants(data) {
  const grid = document.getElementById('restaurant-grid');
  if (!grid) return;
  grid.innerHTML = data.length === 0
    ? `<div class="no-results fade-in visible"><p>No restaurants match your filter.</p></div>`
    : data.map(r => restaurantCard(r)).join('');
  // Re-observe new cards
  grid.querySelectorAll('.fade-in').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    obs.observe(el);
  });
}

function restaurantCard(r) {
  const stars = '★'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '½' : '');
  return `
    <div class="col-12 col-md-6 col-lg-4 fade-in">
      <div class="restaurant-card" onclick="window.location.href='menu.html?id=${r.id}'">
        <div class="card-img-wrap">
          <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop'">
          <div class="card-overlay"></div>
          <div class="card-tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
        <div class="card-body-custom">
          <div class="card-top">
            <h3 class="card-title">${r.name}</h3>
            <div class="rating"><span class="stars">${stars}</span><span class="rating-num">${r.rating}</span></div>
          </div>
          <p class="card-cuisine">${r.cuisine}</p>
          <div class="card-meta">
            <span class="meta-item">🕐 ${r.deliveryTime}</span>
            <span class="meta-item ${r.deliveryFee === 'Free' ? 'free' : ''}">${r.deliveryFee === 'Free' ? '✓ Free delivery' : r.deliveryFee + ' delivery'}</span>
          </div>
          
          <button class="btn-apple btn-full">View Menu →</button>
        </div>
      </div>
    </div>`;
}

function setupFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cuisine = btn.dataset.cuisine;
      const filtered = cuisine === 'all' ? restaurants : restaurants.filter(r => r.cuisine === cuisine || r.tags.includes(cuisine));
      renderRestaurants(filtered);
    });
  });

  // Search - searches restaurants AND dishes
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();

      if (q === '') {
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-cuisine="all"]').classList.add('active');
        renderRestaurants(restaurants);
        hideSearchResults();
        return;
      }

      // Search restaurants by name/cuisine/tags
      const matchedRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );

      // Search dishes across ALL restaurants
      const dishResults = [];
      restaurants.forEach(r => {
        r.menu.forEach(item => {
          if (
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
          ) {
            dishResults.push({ item, restaurant: r });
          }
        });
      });

      showSearchResults(q, matchedRestaurants, dishResults);
    });
  }
}

function hideSearchResults() {
  const existing = document.getElementById('search-results-panel');
  if (existing) existing.remove();
  document.getElementById('restaurant-grid').style.display = '';
  document.querySelector('.section-header') && (document.querySelector('.section-header').style.display = '');
}

function showSearchResults(q, matchedRestaurants, dishResults) {
  // Hide the normal grid
  document.getElementById('restaurant-grid').style.display = 'none';
  document.querySelector('.section-header') && (document.querySelector('.section-header').style.display = 'none');

  let panel = document.getElementById('search-results-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'search-results-panel';
    panel.style.cssText = 'padding: 0 0 80px 0;';
    document.querySelector('.section').appendChild(panel);
  }

  let html = '';

  if (matchedRestaurants.length === 0 && dishResults.length === 0) {
    html = `<div class="no-results" style="text-align:center;padding:80px 24px;color:var(--secondary-text);">
      <div style="font-size:48px;margin-bottom:16px;">🍽️</div>
      <h3 style="font-size:22px;font-weight:700;margin-bottom:8px;">No results for "${q}"</h3>
      <p>Try searching for a dish, restaurant, or cuisine.</p>
    </div>`;
  } else {
    if (matchedRestaurants.length > 0) {
      html += `<div style="margin-bottom:32px;">
        <h3 style="font-size:20px;font-weight:700;letter-spacing:-0.02em;margin-bottom:20px;">
          Restaurants <span style="font-size:14px;font-weight:500;color:var(--secondary-text);">(${matchedRestaurants.length})</span>
        </h3>
        <div class="row g-4">${matchedRestaurants.map(r => restaurantCard(r)).join('')}</div>
      </div>`;
    }

    if (dishResults.length > 0) {
      html += `<div>
        <h3 style="font-size:20px;font-weight:700;letter-spacing:-0.02em;margin-bottom:20px;">
          Dishes <span style="font-size:14px;font-weight:500;color:var(--secondary-text);">(${dishResults.length})</span>
        </h3>
        <div class="row g-4">
          ${dishResults.map(({ item, restaurant }) => `
            <div class="col-12 col-md-6 col-lg-4">
              <div class="menu-card" style="cursor:pointer;" onclick="window.location.href='menu.html?id=${restaurant.id}'">
                <div class="menu-img-wrap">
                  <img src="${item.image}" alt="${item.name}" loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop'">
                </div>
                <div class="menu-body">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <span style="font-size:11px;font-weight:600;background:rgba(0,113,227,0.1);color:var(--accent);padding:3px 10px;border-radius:100px;">${restaurant.name}</span>
                  </div>
                  <h4 class="menu-item-name">${highlightMatch(item.name, q)}</h4>
                  <p class="menu-item-desc">${item.description}</p>
                  <div class="menu-footer">
                    <span class="menu-price">${formatPrice(item.price)}</span>
                    <button class="btn-apple btn-add" onclick="event.stopPropagation(); addToCartFromSearch(${item.id}, ${restaurant.id}, '${restaurant.name}', this)">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
    }
  }

  panel.innerHTML = html;

  // Animate cards
  panel.querySelectorAll('.col-12').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

function highlightMatch(text, q) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) +
    `<mark style="background:rgba(0,113,227,0.15);color:var(--accent);border-radius:3px;padding:0 2px;">${text.slice(idx, idx + q.length)}</mark>` +
    text.slice(idx + q.length);
}

function addToCartFromSearch(itemId, restaurantId, restaurantName, btn) {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const item = restaurant.menu.find(i => i.id === itemId);
  const added = Cart.add(item, restaurantId, restaurantName);
  if (added) {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1500);
  }
}

// ─── MENU PAGE ────────────────────────────────────────────────────────────────
function loadMenuPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) { window.location.href = 'index.html'; return; }

  document.getElementById('restaurant-hero-name').textContent = restaurant.name;
  document.getElementById('restaurant-hero-cuisine').textContent = restaurant.cuisine;
  document.getElementById('restaurant-hero-rating').textContent = `★ ${restaurant.rating}`;
  document.getElementById('restaurant-hero-delivery').textContent = restaurant.deliveryTime;
  document.getElementById('restaurant-hero-fee').textContent = restaurant.deliveryFee === 'Free' ? '✓ Free delivery' : restaurant.deliveryFee;
  const heroImg = document.getElementById('restaurant-hero-img');
  if (heroImg) heroImg.src = restaurant.image;

  const container = document.getElementById('menu-container');
  container.innerHTML = restaurant.menu.map(item => menuItemCard(item, restaurant.id, restaurant.name)).join('');

  container.querySelectorAll('.fade-in').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    obs.observe(el);
  });
}

function menuItemCard(item, restaurantId, restaurantName) {
  return `
    <div class="col-12 col-md-6 col-lg-4 fade-in">
      <div class="menu-card">
        <div class="menu-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop'">
        </div>
        <div class="menu-body">
          <h4 class="menu-item-name">${item.name}</h4>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-footer">
            <span class="menu-price">${formatPrice(item.price)}</span>
            <button class="btn-apple btn-add" onclick="addToCart(${item.id}, ${restaurantId}, '${restaurantName}', this)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function addToCart(itemId, restaurantId, restaurantName, btn) {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const item = restaurant.menu.find(i => i.id === itemId);
  const added = Cart.add(item, restaurantId, restaurantName);
  if (added) {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1500);
  }
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function renderCart() {
  const container = document.getElementById('cart-container');
  const summaryEl = document.getElementById('cart-summary');
  const cart = Cart.get();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart fade-in visible">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious items from our restaurants.</p>
        <a href="index.html" class="btn-apple">Browse Restaurants</a>
      </div>`;
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item fade-in visible" id="cart-item-${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80&fit=crop'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-restaurant">${item.restaurantName}</p>
        <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${item.id})">✕</button>
      </div>
    </div>`).join('');

  const total = Cart.getTotal();
  if (summaryEl) {
    summaryEl.style.display = '';
    document.getElementById('subtotal').textContent = formatPrice(total);
    document.getElementById('delivery-cost').textContent = total > 500 ? 'Free' : '₹49';
    const finalTotal = total > 500 ? total : total + 49;
    document.getElementById('final-total').textContent = formatPrice(finalTotal);
  }
}

function changeQty(id, delta) {
  Cart.updateQuantity(id, delta);
  renderCart();
}

function removeItem(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; }
  setTimeout(() => { Cart.remove(id); renderCart(); }, 300);
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
function setupCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  // Populate order summary
  const cart = Cart.get();
  const summaryList = document.getElementById('order-summary-list');
  if (summaryList) {
    summaryList.innerHTML = cart.map(i => `
      <div class="order-summary-item">
        <span>${i.name} × ${i.quantity}</span>
        <span>${formatPrice(i.price * i.quantity)}</span>
      </div>`).join('');
    const total = Cart.getTotal();
    document.getElementById('checkout-total').textContent = formatPrice(total > 500 ? total : total + 49);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateCheckout()) {
      Cart.clear();
      window.location.href = 'confirmation.html';
    }
  });

  // Real-time validation
  ['name', 'phone', 'address'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });
}

function validateCheckout() {
  let valid = true;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || name.length < 2) { showError('name', 'Please enter your full name.'); valid = false; }
  if (!phone.match(/^[\d\s\+\-\(\)]{7,15}$/)) { showError('phone', 'Please enter a valid phone number.'); valid = false; }
  if (!address || address.length < 10) { showError('address', 'Please enter a complete delivery address.'); valid = false; }

  return valid;
}

function showError(fieldId, msg) {
  const el = document.getElementById(fieldId);
  const errEl = document.getElementById(fieldId + '-error');
  if (el) el.classList.add('input-error');
  if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
}

function clearError(fieldId) {
  const el = document.getElementById(fieldId);
  const errEl = document.getElementById(fieldId + '-error');
  if (el) el.classList.remove('input-error');
  if (errEl) errEl.style.display = 'none';
}
