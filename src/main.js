import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import { store } from './store/store';


Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = "https://vuejs-http-6292a.firebaseio.com/";

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
