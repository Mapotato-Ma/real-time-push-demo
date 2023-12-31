import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/short',
      name: 'home'
    },
    {
      path: '/short',
      name: 'short',
      component: () => import('../views/short-polling.vue')
    },
    {
      path: '/long',
      name: 'long',
      component: () => import('../views/long-polling.vue')
    },
    {
      path: '/iframe-stream',
      name: 'iframe-stream',
      component: () => import('../views/iframe-stream.vue')
    },
    {
      path: '/mqtt',
      name: 'mqtt',
      component: () => import('../views/mqtt-demo.vue')
    },
    {
      path: '/sse',
      name: 'sse',
      component: () => import('../views/server-send-event.vue')
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: () => import('../views/websocket-demo.vue')
    }
  ]
});

export default router;
