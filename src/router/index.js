import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterMiddleware, { middleware } from 'vue-router-middleware'

// Frontend
import Home from '../views/Frontend/Home.vue'
import Login from '../components/authentication/Login.vue'
import PasswordReset from '../components/authentication/PasswordReset.vue'
import Register from '../components/authentication/Register.vue'
import Cart from '../components/order/Cart.vue'
import Checkout from '../components/order/Checkout.vue'
import ProductGallery from '../views/Frontend/Products.vue'
import Product from '../views/Frontend/Product.vue'
import Search from '../views/Frontend/Search'
import Profile from '../views/Frontend/Profile'

// Backoffice
import Products from '../views/Backoffice/Products.vue'
import Dashboard from '../components/Dashboard.vue'
import Settings from '../views/Backoffice/Settings.vue'
import FrontPageSettings from '../components/settings/FrontPageSettings.vue'
import Backoffice from '../components/order/Backoffice.vue'
import EditOrder from '../components/order/EditOrder.vue'
import Statistics from '../components/charts/Statistics.vue'
import Categories from '../views/Backoffice/Categories.vue'
import Category from '../views/Backoffice/Category.vue'

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
    path: '/PasswordReset',
    name: 'Password-reset',
    component: PasswordReset
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
    path: '/products',
    name: 'ProductGallery',
    component: ProductGallery
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  // Requires authentication
  ...middleware('auth', [

    {
      path: '/Checkout',
      name: 'Checkout',
      component: Checkout
    },

    // Requires administration access
    ...middleware('admin', [{
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
    ])
  ])
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouterMiddleware, {
  router,
  middlewares: {
    auth(params, to, from, next) {
      if (!document.cookie) {
        router.push('/login')
      }

      next()
    },

    admin(params, to, from, next) {
      let cookie = document.cookie
      cookie = JSON.parse(cookie.replace('login=', ''))

      if (cookie.admin < 1) {
        router.push('/')
      }

      next()
    }
  }
})

export default router
