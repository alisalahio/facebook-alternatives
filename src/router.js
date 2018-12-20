import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueClipboard from 'vue-clipboard2'
import VTooltip from 'v-tooltip'

Vue.use(Router)
Vue.use(VueClipboard)
Vue.use(VTooltip)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
