<template>
  <div class="product-container" v-if="product">
    <div class="product-content">
    
      <div class="product-image">
        <img :src="product.image" alt="Product Image" />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>

        <p class="product-price">₹{{ product.price.toLocaleString() }}</p>

        
        <table class="spec-table" >
          <tr>
            <td>Product Code:</td>
            <td>#{{ product.id }}</td>
          </tr>
          <tr>
            <td>Material:</td>
            <td>Solid Wood</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>Walnut Brown</td>
          </tr>
          <tr>
            <td>Dimensions:</td>
            <td>120cm x 80cm x 75cm</td>
          </tr>
          <tr>
            <td>Seating Capacity:</td>
            <td>4 Seater</td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>25 kg</td>
          </tr>
        </table>

       
        <div class="product-actions">
          <button class="btn btn-add-to-cart" @click="addToCart(product)">Add to Cart</button>
          <router-link to="/products" class="btn btn-back">Back to Products</router-link>
        </div>
      </div>
    </div>

   
    <div class="product-description-section">
      <h2>Description</h2>
      <p class="product-long-description">
        This {{ product.name }} is the perfect choice for small to medium-sized dining rooms.
        Crafted from premium quality solid wood, it combines style and functionality seamlessly.
        Its elegant walnut finish adds a touch of sophistication to any home. The four-seater capacity makes it ideal
        for family dinners, casual gatherings, and special occasions.
        
      </p>
    </div>

    <div class="product-reviews-section">
      <h2>Customer Reviews</h2>
      <p>⭐⭐⭐⭐☆ &nbsp; 4.5/5 based on 324 reviews</p>
      <p class="review-text">
        "Beautiful table! The quality exceeded my expectations. Assembly was easy, and the wood finish is stunning.
        Highly recommend for anyone looking for a modern, compact dining solution." 
      </p>
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
      loading: true
    }
  },
  created() {
    this.loadProduct()
  },
  methods: {
    loadProduct() {
      const productId = parseInt(this.$route.params.id)
      this.product = productsData.find(p => p.id === productId)
      this.loading = false
    },
    addToCart(product) {
      CartService.addItem(product)
      
    }
  }
}
</script>

<style scoped>
.product-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', Arial, sans-serif;
}

.product-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 40px;
}

.product-image img {
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  min-width: 300px;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #222;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  
}

.spec-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #222;
  font-size: 1rem;
}

.spec-table td:first-child {
  font-weight: 600;
  color: #222;
  width: 40%;
}

.product-actions {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-add-to-cart {
  background-color: black;
  color: #fff;
  border: none;
}

.btn-add-to-cart:hover {
  background-color: black;
  color: #fff;
  transform: translateY(-2px);
}

.btn-back {
  background-color: #f5f5f5;
  color: black;
  border: 1px solid #ccc;
}

.btn-back:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.product-description-section {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.product-description-section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #222;
}

.product-long-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}


.product-reviews-section {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.product-reviews-section h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #222;
}

.review-text {
  font-size: 1rem;
  color: #222;
  font-style: italic;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }

  .product-image img {
    max-width: 100%;
  }

  .product-info {
    text-align: center;
  }

  .product-actions {
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }

  .spec-table td {
    font-size: 0.95rem;
    border: #222 1px solid;
  }
  
}
</style>
