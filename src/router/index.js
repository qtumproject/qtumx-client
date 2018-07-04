import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/controllers/Index';
import Login from '@/controllers/Login';
import ChainLaunch from '@/controllers/ChainForm';
import ChainView from '@/controllers/ChainView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/chain/launch',
      name: 'Chain/Launch',
      component: ChainLaunch,
    },
    {
      path: '/chain/view',
      name: 'Chain/View',
      component: ChainView,
    },
  ],
});
