import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/channels',
            name: 'channels',
            component: () => import('../views/ChannelsView.vue'),
        },
        {
            path: '/threads',
            name: 'threads',
            component: () => import('../views/ThreadsView.vue'),
        },
        {
            path: '/logs',
            name: 'logs',
            component: () => import('../views/LogsView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'),
        },
    ],
});

export default router;
