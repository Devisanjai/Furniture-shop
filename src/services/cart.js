
import EventBus from '../eventbus'

const CART_KEY = 'cart'

export default {
  getCart() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || []
    return cart
  },

  addItem(product) {
    const cart = this.getCart()
    cart.push(product)
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    EventBus.emit('cart-updated')
  },

  removeItem(index) {
    const cart = this.getCart()
    cart.splice(index, 1)
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    EventBus.emit('cart-updated')
  },

  clearCart() {
    localStorage.removeItem(CART_KEY)
    EventBus.emit('cart-updated')
  }
}