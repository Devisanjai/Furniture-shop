<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand brand-text" to="/">DS Furniture</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-custom" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-custom" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-custom position-relative" to="/cart">
              Cart🛒
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartCount }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import EventBus from '../eventbus'
import CartService from '../services/cart.js'
export default {
  name: 'HeaderPart',
  
  data() {
    return {
      cartCount: 0
    }
  },
  
  created() {
  this.updateCartCount();
  EventBus.on('cart-updated', this.updateCartCount);
},
methods: {
  updateCartCount() {
    this.cartCount = CartService.getCart().length;
  }
},
unmounted() {
  EventBus.off('cart-updated', this.updateCartCount);
}
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  width: 100%;
  z-index: 1030;
  color:white;
  font-family: 'Playfair Display', serif;
}

.brand-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

.nav-link-custom {
  margin-right: 15px;
  font-size: 1.1rem;
  transition: color 0.3s, background-color 0.3s;
  color:white;
}

.nav-link-custom:hover {
  background-color: rgba(240, 233, 233, 0.1);
  border-radius: 5px;
  padding: 5px 10px;
}

body { 
  padding-top: 56px;
}
</style>