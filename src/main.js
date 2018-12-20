// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import IOC from './IOC';

//Vue.config.productionTip = false;

const services = {};

Vue.use(IOC, services);

/* eslint-disable no-new */
new Vue({
    el: '#app'
    , router
    //  , template: '<app/>'
    , components: { App }
    , render: function (createElement) {
        return createElement('app');
    }
});
