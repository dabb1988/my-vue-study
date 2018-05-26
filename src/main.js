// console.log(process.env.NODE_ENV)
import Vue from 'vue'
import router from './routes'
import store from './store'
import App from './app.vue'

const app = new Vue({
  router,
  store,
  render: h=>h(App),
}).$mount('#app')