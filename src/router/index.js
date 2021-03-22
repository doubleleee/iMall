import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Special = () => import('../views/Special')
const Category = () => import('../views/Category')
const Cart = () => import('../views/Cart')
const Mine = () => import('../views/Mine')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  }, {
    path: '/special',
    component: Special
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/mine',
    component: Mine
  }
]

const router = new VueRouter({
  routes
})

export default router
