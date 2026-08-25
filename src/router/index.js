import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ProfileView from '../views/ProfileView.vue'
import GlossarioSection from '../components/GlossarioSection.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingView
  },
  {
    path: '/glossario',
    name: 'glossario',
    component: GlossarioSection
  }, // <-- La virgola mancava proprio qui
  {
    path: '/social',
    name: 'social',
    component: ProfileView
  }
  // {
  //   path: '/magazine',
  //   name: 'magazine',
  //   component: () => import('../views/MagazineView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Gestisce lo scroll morbido se il link contiene un'ancora (es. /#glossario)
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Riporta in cima alla pagina ad ogni cambio rotta
    return { top: 0 }
  }
})

export default router