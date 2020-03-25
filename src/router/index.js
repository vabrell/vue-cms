import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterMiddleware, { middleware } from 'vue-router-middleware'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/authentication/Login.vue'
import Register from '../components/authentication/Register.vue'
import Settings from '../views/Settings.vue'
import Cart from '../components/order/Cart.vue'
import Checkout from '../components/order/Checkout.vue'
import FrontPageSettings from '../components/settings/FrontPageSettings.vue'
import Backoffice from '../components/order/Backoffice.vue'
import EditOrder from '../components/order/EditOrder.vue'
import Categories from '../views/Categories.vue'
import Category from '../views/Category.vue'
import Statistics from '../components/Statistics.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: Checkout
  },
	// Requires authentication
	...middleware( 'auth', [
		
		// Requires administration access
		...middleware( 'admin', [
			{
				path: '/admin',
				name: 'Controlpanel',
				component: Dashboard
			},
			{
				path: '/admin/products',
				name: 'Products',
				component: Products
			},
			{
				path: '/admin/products/new',
				name: 'AddProduct',
				component: Products
			},
			{
				path: '/admin/products/edit/:id',
				name: 'EditProduct',
				component: Products
			},
			{
				path: '/admin/categories',
				name: 'Categories',
				component: Categories
			},
			{
				path: '/admin/categories/:id',
				name: 'Category',
				component: Category
			},
			{
				path: '/admin/settings',
				name: 'Settings',
				component: Settings
			},
			{
				path: '/admin/frontpagesettings',
				name: 'FrontPageSettings',
				component: FrontPageSettings
			},
			{
				path: '/admin/backoffice/edit/:id',
				name: 'EditOrder',
				component: EditOrder
			},
			{
				path: '/admin/backoffice',
				name: 'Backoffice',
				component: Backoffice
			},
			{
				path: '/admin/statistics',
				name: 'Statistics',
				component: Statistics
			}
		] )
	] )
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use( VueRouterMiddleware, { 
	router,
	middlewares: {
		auth( params, to, from, next ) {
			if ( !document.cookie ) {
				router.push('/login')
			}

			next()
		},

		admin( params, to, from, next ) {
			let cookie = document.cookie
			cookie = JSON.parse( cookie.replace( 'login=', '' ) )

			if ( cookie.admin < 1 ) {
				router.push('/')
			}

			next()
		}
	}
} )

export default router
