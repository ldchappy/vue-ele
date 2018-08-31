// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import '../reset.css';
import './assets/index1px.scss';

import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.config.productionTip = false;

Vue.use(VueRouter);      /*路由*/
Vue.use(VueResource);    /*请求*/

var router = new VueRouter({
    linkActiveClass:'active',
    routes:[
        {
            path:'',component:goods
        },
        {
            path:'/goods',component:goods
        },
        {
            path:'/ratings',component:ratings
        },
        {
            path:'/seller',component:seller
        },
    ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



