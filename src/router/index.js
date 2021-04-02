import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Special = () => import('../views/Special')
const Category = () => import('../views/Category')
const Cart = () => import('../views/Cart')
const Mine = () => import('../views/Mine')
const CategoryList = () => import('../views/CategoryList')
const Detail = () => import('../views/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true
    }
  }, {
    path: '/special',
    component: Special,
    meta: {
      showTab: true
    }
  }, {
    path: '/category',
    component: Category,
    meta: {
      showTab: true
    }
  }, {
    path: '/cart',
    component: Cart,
    meta: {
      showTab: true
    }
  }, {
    path: '/mine',
    component: Mine,
    meta: {
      showTab: true
    }
  }, {
    path: '/categorylist/:id',
    component: CategoryList
  }, {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
