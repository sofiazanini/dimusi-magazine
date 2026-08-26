import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ProfileView from '../views/ProfileView.vue'
import MagazineView from '../views/MagazineView.vue'
import VolumeDetail from '../components/VolumeDetail.vue'

const routes = [
  { path: '/', name: 'home', component: LandingView },
  { path: '/magazine', name: 'magazine', component: MagazineView },
  { path: '/magazine/vol-01', name: 'volume-01', component: VolumeDetail },
  { path: '/social', name: 'social', component: ProfileView },
  { path: '/glossario', name: 'glossario', redirect: '/#glossario' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, left: 0 }
  }
})

export default router