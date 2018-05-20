import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ScreenShow from '@/containers/ScreenShow'
import ScreenControl from '@/containers/ScreenControl'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScreenShow',
      component: ScreenShow,
      meta: {
        title: '展示台'
      }
    },
    {
      path: '/ScreenControl',
      name: 'ScreenControl',
      component: ScreenControl,
      meta: {
        title: '控制台'
      }
    }
  ]
})
