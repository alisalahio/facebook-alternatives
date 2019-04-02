import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../../feathers-client'
import VuexPersist from 'vuex-persist'

import global from './global'
import upvotes from './upvotes'

const { service, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

const vuexPersist = new VuexPersist({
  key: 'quit-facebook',
  storage: localStorage
})


Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  modules: {
    global,
    upvotes
  },

  plugins: [
    service('categories', { paginate: true }),
    service('products', { paginate: true }),
    service('votes', { paginate: true }),
    vuexPersist.plugin
  ]
})
