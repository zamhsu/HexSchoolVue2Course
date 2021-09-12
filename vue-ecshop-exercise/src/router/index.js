import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
// 自訂的分頁元件

Vue.use(VueRouter);

// 匯出給 main.js 使用
export default new VueRouter({
    routes: [
        {
            path: '/', // 路徑儘量小寫
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login', // 路徑儘量小寫
            name: 'Login',
            component: Login
        },
    ]
});