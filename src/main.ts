import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "highlight.js/styles/tokyo-night-dark.css"

import App from './pages/Home.vue'
import 'primeicons/primeicons.css'
import "./main.css"
import { router } from './router'


import Drawer from "./components/Drawer.vue"
import Dialog from "./components/Dialog.vue"
import Form from "./components/Form.vue"
import Chat from "./components/Chat.vue"
import Navbar from "./components/Navbar.vue"

const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .component("VueDrawer", Drawer)
    .component("VueDialog", Dialog)
    .component("VueForm", Form)
    .component("VueChat", Chat)
    .component("VueNavbar", Navbar)
    .mount('#app')

