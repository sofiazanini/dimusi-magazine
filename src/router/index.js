import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue' // La pagina principale del concept e delle riviste
import ProfileView from '../views/ProfileView.vue' // La pagina profilo social

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router