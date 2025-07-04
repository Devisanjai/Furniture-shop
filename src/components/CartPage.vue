<template>
  <div class="page-wrapper">
    <div class="cart-container">
      <h2 class="mb-4 text-center">Your Cart</h2>
      <div v-if="cart.length === 0" class="text-center empty-cart">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <table class="table table-hover cart-table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <td><img :src="item.image" alt="product" class="product-img" /></td>
              <td>{{ item.name }}</td>
              <td>₹{{ item.price }}</td>
              <td>
                <div class="quantity-box">
                  <button @click="decreaseQuantity(index)" class="btn btn-sm btn-outline-secondary">-</button>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(index)" class="btn btn-sm btn-outline-secondary">+</button>
                </div>
              </td>
              <td>₹{{ item.price * item.quantity }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h5 class="total-price">Total: ₹{{ totalPrice }}</h5>
        <router-link to="/payment" class="btn btn-dark mt-3 btn-proceed">Proceed to Payment</router-link>
      </div>
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
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  created() {
    this.loadCart();
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
      CartService.removeItem(index);
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      CartService.saveCart(this.cart);
      EventBus.emit('cart-updated');
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        CartService.saveCart(this.cart);
        EventBus.emit('cart-updated');
      }
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.cart-container {
  max-width: 900px;
  width: 95%;
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Playfair Display', serif;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.quantity-box button {
  min-width: 30px;
}

.total-price {
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 20px;
  text-align: right;
  color: #000;
}

.btn-proceed {
  width: 100%;
  font-weight: 600;
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-proceed:hover {
  background-color: #343a40cc;
}
</style>
