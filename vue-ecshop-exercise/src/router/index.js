import { createRouter, createWebHashHistory } from 'vue-router';

//import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*', // 非路由設定的頁面
            redirect: '/login' // 重新導向
        },
        // {
        //     path: '/', // 路徑儘量小寫
        //     name: 'HelloWorld',
        //     component: HelloWorld,
        //     meta: { requiredAuth: true }
        // },
        {
            path: '/login', // 路徑儘量小寫
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiredAuth: true },
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiredAuth: true },
                },
            ]
        },
        {
            path: '/',
            name: 'Simulator',
            component: Dashboard,
            children: [
                {
                    path: 'customer-order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: 'customer-checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
            ]
        },
    ]
})
