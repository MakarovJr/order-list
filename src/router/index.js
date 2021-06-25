import Vue from 'vue';
import VueRouter from 'vue-router';
import Widget from '../views/Widget.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Widget',
    component: Widget,
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/Table.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
