import Vue from 'vue';
import Router from 'vue-router';

/*
import Assets from '../pages/Assets';
import Play from '../pages/Play'
import Uploader from '../pages/Uploader';
import Flow from '../pages/Flow'
*/

const Play = () => import(/* webpackChunkName: "pages" */ '../pages/Play')
const Uploader = () => import(/* webpackChunkName: "pages" */ '../pages/Uploader');
const Assets = () => import(/* webpackChunkName: "pages" */'../pages/Assets')
const Flow = () => import(/* webpackChunkName: "pages" */'../pages/Flow')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/'
            ,name: 'Assets'
            ,component: Assets
            , props: {filter: 'ok'}
            , canReuse : true
        }
        , {
            path: '/play/:id'
            , name: 'Play'
            , component: Play
        }
        , {
            path: '/flow/:id'
            , name: 'Flow'
            , component: Flow
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
            , canReuse: false
        }
    ]
});
