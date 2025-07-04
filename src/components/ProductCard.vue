<template>
  <div class="container mt-4 product-section">
    <div v-if="message" class="alert alert-success text-center" role="alert">
      {{ message }}
    </div>

    <h2 class="mb-4 text-center">Our Products</h2>

    
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card product-card h-100">
          <img :src="product.image" class="card-img-top" alt="Product Image">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text price"><strong>Price:</strong> ₹{{ product.price }}</p>
            <div class="mt-auto">
              <button class="btn btn-dark me-2" @click="addToCart(product)">Add to 🛒</button>
              <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsData from '../assets/products.json'
import Cart from '../services/cart.js'

export default {
  name: 'ProductCard',

  data() {
    return {
      products: [],
      loading: true,
      message: '',
    }
  },

  created() {
    this.loadProducts()
  },

  methods: {
    loadProducts() {
      this.products = productsData
      this.loading = false
    },

    addToCart(product) {
      Cart.addItem(product)
      this.message = `${product.name} has been added to the cart!`

    
      setTimeout(() => {
        this.message = ''
      }, 2000)
    }
  }
}
</script>

<style scoped>
h2 {
  color: #222;
  font-family: 'Playfair Display', serif;
}

.product-section {
  background-color: #fff; 
  padding: 2rem;
  border-radius: 10px;
  color: #000;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fafafa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-card img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover img {
  transform: scale(1.03); 
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
}

.card-text {
  color: #555;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1rem;
  color: #000;
}

.btn-dark {
  background-color: #000;
  color: #fff;
  border-color: #000;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

.btn-dark:hover {
  background-color: #333;
  transform: scale(1.05);
}

.btn-outline-secondary {
  border-color: #000;
  color: #000;
  transition: transform 0.2s, color 0.3s, border-color 0.3s;
}

.btn-outline-secondary:hover {
  transform: scale(1.05);
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.alert {
  margin-bottom: 10px;
 
}
.row{
  font-family: 'Playfair Display', serif;
}
</style>
