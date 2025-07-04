import EventBus from '../eventbus';

const CART_KEY = 'vue-cart';

export default {
  getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addItem(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // ✅ Set default quantity and image if not present
      product.quantity = 1;
      if (!product.image && product.images && product.colors) {
        product.image = product.images[product.colors[0]];
      }
      cart.push(product);
    }

    this.saveCart(cart);
    EventBus.emit('cart-updated');
  },

  removeItem(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    EventBus.emit('cart-updated');
  },

clearCart() {
  localStorage.setItem('cart', JSON.stringify([]));
},

};
