import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import ImageDetails from '@/components/ImageDetails'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Router)
Vue.use(infiniteScroll)

export default new Router({
  routes: [
    {
      path: '/', 
      name: 'Main', 
      component: Main 
    },
    { 
      path: '/details/:id', 
      name: 'ImageDetails', 
      component: 
      ImageDetails, props: true 
    }
  ]
})
