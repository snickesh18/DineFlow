// Cart Management
const Cart = {
  get() {
    return JSON.parse(localStorage.getItem('dineflow_cart')) || [];
  },
  save(cart) {
    localStorage.setItem('dineflow_cart', JSON.stringify(cart));
    this.updateBadge();
  },
  add(item, restaurantId, restaurantName) {
    let cart = this.get();
    // Warn if adding from different restaurant
    if (cart.length > 0 && cart[0].restaurantId !== restaurantId) {
      if (!confirm(`Your cart has items from ${cart[0].restaurantName}. Start a new cart from ${restaurantName}?`)) return false;
      cart = [];
    }
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1, restaurantId, restaurantName });
    }
    this.save(cart);
    return true;
  },
  remove(itemId) {
    let cart = this.get().filter(i => i.id !== itemId);
    this.save(cart);
  },
  updateQuantity(itemId, delta) {
    let cart = this.get();
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) cart = cart.filter(i => i.id !== itemId);
    }
    this.save(cart);
  },
  getTotal() {
    return this.get().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
  getCount() {
    return this.get().reduce((sum, i) => sum + i.quantity, 0);
  },
  clear() {
    localStorage.removeItem('dineflow_cart');
    this.updateBadge();
  },
  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};
