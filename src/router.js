import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Equipments from './views/Equipments.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Dashboard,
      meta: {
        auth: true,
      },
      children: [
        {
          path: '/',
          component: Equipments,
          name: 'home',
          meta: {
            auth: true,
          },
        },
        {
          path: '/roles',
          component: () => import(/* webpackChunkName: "roles" */ './views/Roles.vue'),
        },
        {
          path: '/users',
          component: () => import(/* webpackChunkName: "users" */ './views/Users.vue'),
        },
        {
          path: '/users/:id',
          component: () => import(/* webpackChunkName: "users" */ './views/UserEdit.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue'),
    },
  ],
});

export default router;
