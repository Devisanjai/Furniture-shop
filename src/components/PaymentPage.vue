<template>
  <div class="payment-page">
    <div class="payment-card">
      <h2 class="title">Checkout</h2>

      <div class="method-tabs">
        <button
          v-for="method in paymentMethods"
          :key="method"
          :class="['tab', { active: selectedMethod === method }]"
          @click="selectedMethod = method"
        >
          {{ method }}
        </button>
      </div>

      <form v-if="selectedMethod === 'Card'" @submit.prevent="pay('Card')">
        <div class="field">
          <label>Card Number</label>
          <input v-model="cardNumber" placeholder="1234 5678 9012 3456" maxlength="16" required />
        </div>

        <div class="field-row">
          <div class="field">
            <label>Expiry Date</label>
            <input v-model="expiryDate" placeholder="MM/YY" maxlength="5" required />
          </div>
          <div class="field">
            <label>CVV</label>
            <input type="password" v-model="cvv" maxlength="3" required />
          </div>
        </div>

        <div class="field">
          <label>Cardholder Name</label>
          <input v-model="cardHolder" placeholder="Name on card" required />
        </div>

        <div v-if="expiryError" class="error">{{ expiryError }}</div>

        <button class="pay-btn">Pay Now</button>
      </form>

      <form v-if="selectedMethod === 'Net Banking'" @submit.prevent="pay('Net Banking')">
        <div class="field">
          <label>Select Bank</label>
          <select v-model="selectedBank" required>
            <option disabled value="">Select your bank</option>
            <option>SBI</option>
            <option>ICICI</option>
            <option>HDFC</option>
            <option>Axis Bank</option>
          </select>
        </div>
        <button class="pay-btn">Pay Now</button>
      </form>

      <form v-if="selectedMethod === 'UPI'" @submit.prevent="pay('UPI')">
        <div class="field">
          <label>UPI ID</label>
          <input v-model="upiId" placeholder="example@upi" required />
        </div>
        <button class="pay-btn">Pay Now</button>
      </form>

      <div v-if="paymentSuccess" class="success">Payment Successful!</div>
      <router-link to="/" class="back-link">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage',
  data() {
    return {
      paymentMethods: ['Card', 'Net Banking', 'UPI'],
      selectedMethod: 'Card',
      paymentSuccess: false,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
      selectedBank: '',
      upiId: '',
      expiryError: ''
    };
  },
  methods: {
    pay(method) {
      if (method === 'Card' && !this.validateExpiryDate()) return;
      this.paymentSuccess = true;
      setTimeout(() => this.$router.push('/payment-process'), 1000);
    },
    validateExpiryDate() {
      const [month, year] = this.expiryDate.split('/');
      const exp = new Date(`20${year}`, month);
      const now = new Date();
      if (!month || !year || exp <= now) {
        this.expiryError = 'Invalid expiry date';
        return false;
      }
      this.expiryError = '';
      return true;
    }
  }
};
</script>

<style scoped>
.payment-page {
  display: flex;
  justify-content: center;
  margin: 120px 20px 40px;
}

.payment-card {
  background: #fff;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', sans-serif;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.method-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.tab {
  padding: 10px 20px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  background: #f7f7f7;
}

.tab.active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.field input,
.field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.field-row {
  display: flex;
  gap: 15px;
}

.pay-btn {
  width: 100%;
  background: #000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.pay-btn:hover {
  background: #333;
}

.success {
  margin-top: 20px;
  color: green;
  font-weight: 600;
  text-align: center;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.back-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: #000;
  text-decoration: underline;
}
</style>
