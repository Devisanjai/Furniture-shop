<template>
  <div class="cart-container">
    <h2 class="mb-4 text-center">Your Cart</h2>
    <div v-if="cart.length === 0" class="text-center empty-cart">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul class="list-group mb-4">
        <li 
          class="list-group-item d-flex justify-content-between align-items-center cart-item" 
          v-for="(item, index) in cart" 
          :key="index"
        >
          <span>{{ item.name }} - ₹{{ item.price }}</span>
          <button class="btn btn-sm btn-danger btn-remove" @click="removeFromCart(index)">Remove</button>
        </li>
      </ul>
      <h5 class="total-price">Total: ₹{{ totalPrice }}</h5>
      <router-link to="/payment" class="btn btn-dark mt-3 btn-proceed">Proceed to Payment</router-link>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventbus';
import CartService from '../services/cart.js';

export default {
  name: 'CartPage',
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  created() {
    this.loadCart(); // Load from CartService
    EventBus.on('cart-updated', this.loadCart);
  },
  unmounted() {
    EventBus.off('cart-updated', this.loadCart);
  },
  methods: {
    loadCart() {
      this.cart = CartService.getCart();
    },
    removeFromCart(index) {
      CartService.removeItem(index); // This will emit cart-updated
    },
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 600px;
  width: 90%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  /* Centering the cart in the page */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-top: 40px;
}

.cart-item {
  font-size: 1.1rem;
  padding: 12px 15px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.btn-remove {
  font-size: 0.85rem;
  padding: 4px 10px;
}

.total-price {
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 10px;
  text-align: right;
}

.btn-proceed {
  width: 100%;
  font-weight: 600;
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-proceed:hover {
  background-color: #343a40cc;
}
</style>
