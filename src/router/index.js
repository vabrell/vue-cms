import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
  },
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
  }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
