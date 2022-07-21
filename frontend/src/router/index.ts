import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import BoardView from '../views/BoardView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ContactView from '../views/ContactView.vue'
import SettingsView from '../views/SettingsView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: "Login",
    path: "/login",
    component: LoginView
  },
  {
    name: "Registration",
    path: "/registration",
    component: RegistrationView
  },
  {
    name: "Budget Trello Board",
    path: "/board",
    component: BoardView
  },
  {
    name: "Contact us",
    path: "/contact",
    component: ContactView
  },
  {
    name: "Settings",
    path: "/settings",
    component: SettingsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
