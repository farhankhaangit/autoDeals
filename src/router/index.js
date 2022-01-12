import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import postDetail from '../views/postDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PostNewAd from '../views/PostNewAd.vue'
import AboutUs from '../views/AboutUs.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ad-detail/:id',
    name: 'postDetail',
    component: postDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/post-new-ad',
    name: 'PostNewAd',
    component: PostNewAd
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
