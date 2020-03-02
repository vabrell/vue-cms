import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ControlPanel from '../views/ControlPanel.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/controlpanel',
		name: 'ControlPanel',
		component: ControlPanel
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
