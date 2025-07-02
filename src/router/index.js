import { createRouter, createWebHistory } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ProductList from '../components/ProductList.vue'; 
import CartPage from '../components/CartPage.vue';
import PaymentPage from '../components/PaymentPage.vue';
import PaymentProcess from '@/components/PaymentProcess.vue'; 
import HomePage from '../components/HomePage.vue'


const routes = [
  { path: '/products', component: ProductCard },
  { path: '/products', component: ProductCard },
  { path: '/product/:id', component: ProductList }, 
  { path: '/cart', component: CartPage },
  { path: '/payment', component: PaymentPage },
  {path: '/', component: HomePage} ,
   {path: '/payment-process',name: 'PaymentProcess',component: PaymentProcess}
  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;







