import Vue from 'vue';
import Router from 'vue-router';
import ImageSearch from '@/components/ImageSearch';
import ImageDetails from '@/components/ImageDetails';
import TagList from '@/components/TagList';
import Loader from '@/components/Loader';
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(Router);
Vue.use(infiniteScroll);
Vue.component('tag-list', TagList);
Vue.component('loader', Loader);

export default new Router({
  routes: [
    {
      path: '/', 
      name: 'ImageSearch', 
      component: ImageSearch ,

    },
    { 
      path: '/details/:id', 
      name: 'ImageDetails', 
      component: ImageDetails,
      props: true 
    }
  ]
});
