import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Router)
Vue.use(infiniteScroll)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
