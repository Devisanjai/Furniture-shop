<template>
  <div class="container">
    <h2>Payment</h2>

    <!-- Tabs -->
    <div class="tabs mb-4">
      <button
        v-for="method in paymentMethods"
        :key="method"
        :class="['tab', { active: selectedMethod === method }]"
        @click="selectedMethod = method"
      >
        {{ method }}
      </button>
    </div>

    <!-- Card Payment -->
    <div v-if="selectedMethod === 'Card'">
      <form @submit.prevent="pay('Card')">
        <div class="form-group mb-3">
          <label>Card Number</label>
          <input
            type="text"
            class="form-control"
            v-model="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxlength="16"
            pattern="[0-9]{16}"
            title="Enter 16 digit card number"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label>Expiry Date</label>
          <input
            type="text"
            class="form-control"
            v-model="expiryDate"
            placeholder="MM/YY"
            maxlength="5"
            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
            title="Enter date as MM/YY"
            required
          />
          <div v-if="expiryError" style="color: red; font-size: 0.9rem;">
            {{ expiryError }}
          </div>
        </div>

        <div class="form-group mb-3">
          <label>CVV</label>
          <input
            type="password"
            class="form-control"
            v-model="cvv"
            placeholder="123"
            maxlength="3"
            pattern="[0-9]{3}"
            title="Enter 3 digit CVV"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label>Cardholder Name</label>
          <input
            type="text"
            class="form-control"
            v-model="cardHolder"
            placeholder="Name on card"
            maxlength="40"
            required
          />
        </div>

        <button type="submit" class="btn btn-dark w-100">Pay Now</button>
      </form>
    </div>

    <!-- Net Banking -->
    <div v-if="selectedMethod === 'Net Banking'">
      <form @submit.prevent="pay('Net Banking')">
        <div class="form-group mb-3">
          <label>Select Bank</label>
          <select class="form-control" v-model="selectedBank" required>
            <option value="" disabled>Select your bank</option>
            <option>State Bank of India</option>
            <option>ICICI Bank</option>
            <option>HDFC Bank</option>
            <option>Axis Bank</option>
          </select>
        </div>

        <button type="submit" class="btn btn-dark w-100">Pay Now</button>
      </form>
    </div>

    <!-- UPI -->
    <div v-if="selectedMethod === 'UPI'">
      <form @submit.prevent="pay('UPI')">
        <div class="form-group mb-3">
          <label>UPI ID</label>
          <input
            type="text"
            class="form-control"
            v-model="upiId"
            placeholder="example@upi"
            maxlength="30"
            pattern="^[\w.-]+@[\w.-]+$"
            title="Enter valid UPI ID"
            required
          />
        </div>

        <button type="submit" class="btn btn-dark w-100">Pay Now</button>
      </form>
    </div>

    <!-- Success message -->
    <div v-if="paymentSuccess" class="alert alert-success mt-4">
      Payment Successful! Thank you for your purchase.
    </div>

    <router-link to="/" class="btn btn-link mt-3">Back to Products</router-link>
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
      totalAmount: '{{totalPrice}}', // Placeholder
      
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
      
      selectedBank: '',
      upiId: '',

      expiryError: '', // to show expiry date limitation
    };
  },
  methods: {
    pay(method) {
      if (method === 'Card') {
        // Check expiry date logic
        if (!this.validateExpiryDate()) {
          return;
        }
      }

      console.log(`Paid with ${method}`);

      this.paymentSuccess = true;

      // Simulate redirection
      setTimeout(() => {
        this.$router.push('/payment-process');
      }, 1000);
    },

    validateExpiryDate() {
      const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!regex.test(this.expiryDate)) {
        this.expiryError = 'Invalid expiry date format.';
        return false;
      }

      const parts = this.expiryDate.split('/');
      const month = parseInt(parts[0], 10);
      const year = parseInt('20' + parts[1], 10); // e.g., "25" → "2025"

      const today = new Date();
      const expiry = new Date(year, month);

      if (expiry <= today) {
        this.expiryError = 'Card has expired.';
        return false;
      }

      this.expiryError = '';
      return true;
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fafafa;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 60px auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tab {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.tab:hover {
  background-color: #f0f0f0;
}

.tab.active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.form-group {
  text-align: left;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  color: #222;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.btn-dark {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-dark:hover {
  background-color: #333;
  transform: scale(1.05);
}

.alert-success {
  font-size: 1rem;
  font-weight: 500;
  color: green;
}

.btn-link {
  color: #000;
  text-decoration: underline;
  font-weight: 600;
}
</style>
