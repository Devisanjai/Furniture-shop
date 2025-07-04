<template>
  <div class="product-container" v-if="product">
    <div class="product-content">
      <div class="product-image-gallery">
        <img :src="mainImage" alt="Main Product Image" class="main-image" />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">₹{{ product.price.toLocaleString() }}</p>
        <p class="product-delivery">In stock · Delivery in 5–7 days</p>

        <table class="spec-table">
          <tr><td>Product Code:</td><td>#{{ product.id }}</td></tr>
          <tr><td>Material:</td><td>Solid Wood</td></tr>
          <tr><td>Color:</td><td>Walnut Brown</td></tr>
          <tr><td>Dimensions:</td><td>120cm x 80cm x 75cm</td></tr>
          <tr><td>Seating Capacity:</td><td>4 Seater</td></tr>
          <tr><td>Weight:</td><td>25 kg</td></tr>
        </table>

        <div class="product-icons">
          <span>🏋️ Indoor Use</span>
          <span>🌿 Sustainable wood</span>
          <span>🧼 Easy to clean</span>
        </div>

        <div v-if="message" class="success-message">{{ message }}</div>

        <div class="product-actions">
          <button class="btn btn-add-to-cart" @click="addToCart(product, quantity)">
            Add to Cart (₹{{ (product.price * quantity).toLocaleString() }})
          </button>
          <router-link to="/products" class="btn btn-back">Back to Products</router-link>
        </div>
      </div>
    </div>

    <div class="product-tabs">
      <div class="tab">
        <h2>Description</h2>
        <p>
          This {{ product.name }} is the perfect choice for small to medium-sized dining rooms.
          Crafted from premium quality solid wood, it combines style and functionality seamlessly.
          Its elegant walnut finish adds a touch of sophistication to any home. The four-seater capacity makes it ideal
          for family dinners, casual gatherings, and special occasions.
        </p>
      </div>

      <div class="tab">
        <h2>Customer Reviews</h2>
        <p>⭐⭐⭐⭐☆ 4.5/5 based on 324 reviews</p>
        <blockquote>
          "Beautiful table! The quality exceeded my expectations. Assembly was easy, and the wood finish is stunning.
          Highly recommend for anyone looking for a modern, compact dining solution."
        </blockquote>
      </div>
    </div>
  </div>

  <div v-else class="text-center">
    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <p>Product not found</p>
      <router-link to="/products" class="btn btn-dark">Back to Products</router-link>
    </div>
  </div>
</template>

<script>
import productsData from '../assets/products.json'
import CartService from '../services/cart.js'

export default {
  name: 'ProductView',
  data() {
    return {
      product: null,
      loading: true,
      quantity: 1,
      message: '',
      mainImage: ''
    }
  },
  created() {
    this.loadProduct()
  },
  methods: {
    loadProduct() {
      const productId = parseInt(this.$route.params.id)
      this.product = productsData.find(p => p.id === productId)
      if (this.product) {
        this.mainImage = this.product.image
      }
      this.loading = false
    },
    addToCart(product, quantity) {
      for (let i = 0; i < quantity; i++) {
        CartService.addItem(product)
      }
      this.message = `${quantity} item(s) of "${product.name}" added to your cart!`
      setTimeout(() => this.message = '', 3000)
    }
  }
}
</script>

<style scoped>
.product-container {
  max-width: 1100px;
  margin: 120px auto 40px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 16px;
  font-family: 'Playfair Display', serif;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.product-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.product-image-gallery {
  flex: 1;
  text-align: center;
}

.main-image {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.thumbnail-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.thumbnail {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.product-info {
  flex: 1;
  min-width: 300px;
}

.product-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #222;
}

.product-price {
  font-size: 1.8rem;
  color: #b12704;
  margin-bottom: 8px;
}

.product-delivery {
  font-size: 0.95rem;
  color: #2e7d32;
  margin-bottom: 20px;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.spec-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.product-icons span {
  display: inline-block;
  margin-right: 15px;
  font-size: 1rem;
  color: #444;
}

.qty-input {
  width: 60px;
  padding: 8px;
  font-size: 1rem;
  text-align: center;
  margin-right: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.product-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-add-to-cart {
  background-color: #000;
  color: white;
  border: none;
}

.btn-add-to-cart:hover {
  background-color: #333;
}

.btn-back {
  background-color: #eee;
  border: 1px solid #ccc;
  color: #000;
}

.btn-back:hover {
  background-color: #ddd;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.product-tabs {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #ddd;
}

.tab h2 {
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: #222;
}

.tab p, blockquote {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}

blockquote {
  font-style: italic;
  border-left: 4px solid #bbb;
  padding-left: 15px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }
  .product-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .qty-input {
    margin-bottom: 10px;
  }
  .product-container {
    margin: 100px 10px 40px;
    padding: 20px;
  }
}
</style>
