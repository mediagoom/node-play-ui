import Vue from 'vue'
import Router from 'vue-router'
import Assets from '@/components/Assets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Assets',
      component: Assets
    }
  ]
})
