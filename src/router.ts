import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'

const routes = [
  { path: '/', component: Home, name : "home" },
  { path: '/chat/:id', component: Home, name : "history"},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})