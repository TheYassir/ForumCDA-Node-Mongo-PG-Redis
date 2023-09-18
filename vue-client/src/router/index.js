import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';

const router = createRouter({
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/channel/:id',
            name: 'channel',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ChannelView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'),
        },
    ],
});

export default router;
