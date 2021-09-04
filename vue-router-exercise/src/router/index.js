import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import Home from '@/components/HelloWorld';
// 自訂的分頁元件

Vue.use(VueRouter);

// 匯出給 main.js 使用
export default new VueRouter({
    routes: [
        {
            name: '首頁', // 元件呈現的名稱
            path: '/index', // 虛擬路徑
            component: Home // 對應的元件
        }
    ]
});