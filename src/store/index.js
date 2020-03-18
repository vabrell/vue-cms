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

      // Check if product is in cart
      state.cart.forEach( cartProduct =>{
        if ( cartProduct.id === product.id ){
          // Increase amount of product
          cartProduct.amount++
          // Product exist in cart
          exist = true
        }
      })

      // Check if product doesnt exist in cart
      if ( !exist ) {
        // Add 'amount' key and set it to 1 for the product
        product.amount = 1
        // Add product to cart
        state.cart.push( product )
      }

			// Update the cart in LocalStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))

			// Set the current amount of products in the cart
			state.cartCount = state.cart.reduce( ( a, b ) => Number(a) + ( Number(b['amount']) || 0 ), 0)
			// Set the amount in LocalStorage
      localStorage.setItem('cartCount', state.cartCount)
    },

		updateCart( state, products ) {
			// Loop through all products
			products.forEach( product => {
				// If the 'amount' is set to 0, remove the product from the cart
				if ( Number(product.amount) < 1 ) {
					products.splice( products.indexOf( product ), 1 )
				}
			})

			// Set the store cart to the array of products
			state.cart = products
			// Update the cart in LocalStorage
			localStorage.setItem( 'cart', JSON.stringify( state.cart ) )

			// Set the store cartCount to the current amount of products in the cart
			state.cartCount = products.reduce( ( a, b ) => Number(a) + ( Number(b['amount']) || 0 ), 0)
			// Update the cartCount in LocalStorage
			localStorage.setItem( 'cartCount', state.cartCount )
		},

		clearCart( state ) {
			// Clear the cart and count in state
			state.cart = []
			state.cartCount = 0

			// Update localStorage with current state
			localStorage.setItem( 'cart', JSON.stringify( state.cart ) )
			localStorage.setItem( 'cartCount', state.cartCount )
		}
  },
  actions: {
		getCart( context ) {
			context.state.cart = localStorage.getItem('cart') !== null ? JSON.parse( localStorage.getItem('cart') ) : []
		},

    getCartCount( context ) {
      context.state.cartCount = Number( localStorage.getItem('cartCount') )
    }
  },
  modules: {}
})
