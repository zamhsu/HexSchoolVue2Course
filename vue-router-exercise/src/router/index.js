import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
// 自訂的分頁元件

Vue.use(VueRouter);

// 匯出給 main.js 使用
export default new VueRouter({
    routes: [
        {
            name: '首頁', // 元件呈現的名稱
            path: '/index', // 虛擬路徑
            component: Home // 對應的元件
        },
        {
            name: '分頁', // 元件呈現的名稱
            path: '/page', // 虛擬路徑
            component: Page, // 對應的元件
            children: [ //巢狀分頁
                {
                    name: '卡片 1', // 元件呈現的名稱
                    path: '', // 虛擬路徑（預設進入到這裡）
                    component: child // 對應的元件
                },
                {
                    name: '卡片 2', // 元件呈現的名稱
                    path: 'child2', // 虛擬路徑
                    component: child2 // 對應的元件
                },
                {
                    name: '卡片 3', // 元件呈現的名稱
                    path: 'child/:id', // 虛擬路徑，":"後面為動態路由，參數名稱可自訂設定
                    component: child3 // 對應的元件
                },
            ]
        },
    ]
});