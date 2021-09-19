import { createRouter, createWebHashHistory } from 'vue-router';

import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', // 路徑儘量小寫
            name: 'HelloWorld',
            component: HelloWorld,
            meta: { requiredAuth: true }
        },
        {
            path: '/login', // 路徑儘量小寫
            name: 'Login',
            component: Login
        }
    ]
})