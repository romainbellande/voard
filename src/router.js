import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Equipments from './views/Equipments.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true,
      },
      children: [
        {
          path: '/',
          component: Equipments,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue'),
    },
  ],
});


// router.beforeEach((to, from, next) => {
//   // console.log('firebase', firebase);
//   const { currentUser } = firebase.auth();
//   console.log('currentUser', currentUser);
//   const withAuth = to.matched.some(record => record.meta.auth);
//   if (withAuth && !currentUser) {
//     next('login');
//   }
//   next();
// });

export default router;
