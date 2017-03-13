import Vue from 'vue'
import Router from 'vue-router'
import Assets from '@/components/Assets'
import Play from '@/components/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Assets',
      component: Assets
    }
    , {
        path: '/play/:id'
    , name: 'Play'
    , component: Play
    }
  ]
})
