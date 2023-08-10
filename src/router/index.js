import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import ChefListPage from '../views/ChefListPage.vue';
import ChefDetailsPage from '../views/ChefDetailsPage.vue';
import OrderPage from '../views/OrderPage.vue';
import Login from '../views/LoginView.vue';
import Profile from '../views/UserProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/user',
    name: 'user',
    component: Login
  },
  {
    
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/',
        name: 'chef-list',
        component: ChefListPage
      },
      {
        path: '/chef-details/:id',
        name: 'chef-details',
        component: ChefDetailsPage,
        props: true
      },

      {
        path: '/profile',
        name: 'profile',
        component: Profile,
      }
    ]
  },

  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;