import Vue from 'vue'
import Router from 'vue-router'
import Assets from '@/components/Assets'
import Play from '@/components/Play'
import Uploader from '@/components/Uploader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Assets',
      component: Assets
      , props: {filter: 'ok'}
    }
    , {
        path: '/play/:id'
    , name: 'Play'
    , component: Play
    }
    , {
        path: '/uploader'
    , name: 'Uploader'
    , component: Uploader
    }
    , {
        path: '/working'
    , name: 'Working'
    , component: Assets
    , props: {filter: 'working'}
    }
  ]
})
