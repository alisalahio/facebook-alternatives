import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueClipboard from 'vue-clipboard2'
import VTooltip from 'v-tooltip'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)
Vue.use(VueClipboard)
Vue.use(VTooltip)

export default router = new Router({
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

Vue.use(VueAnalytics, {
  id: 'UA-130691181-2',
  router
})
