import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/LoginComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileComponent.vue')
  },
  {
    path: '/request',
    name: 'Request Record',
    component: () => import('../views/Request.vue')
  },
  {
    path: '/vaccine',
    name: 'Vaccine',
    component: () => import('../views/VaccineRecord.vue')
  },
  {
    path: '/previous',
    name: 'Previous',
    component: () => import('../views/PreviousRecord.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashBoard.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router