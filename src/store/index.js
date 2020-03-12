import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: null,
    cart: []
  },
  mutations: {
    addToCart( state, product ) {
      let exist = false
      //Check if product is in cart
      state.cart.forEach( cartProduct =>{
        if ( cartProduct.id === product.id ){
          //Increase amount of product
          cartProduct.amount++
          //Product exist in cart
          exist = true
        }
      })

      //Check if product doesnt exist in cart
      if ( !exist ) {
        //Add 'amount' key and set it to 1 for the product
        product.amount = 1
        //Add product to cart
        state.cart.push( product )
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
      state.cartCount += 1
      localStorage.setItem('cartCount', state.cartCount)
    }
  },
  actions: {
    getCartCount( context ) {
      context.state.cartCount = Number(localStorage.getItem('cartCount'))
    }
  },
  modules: {}
})