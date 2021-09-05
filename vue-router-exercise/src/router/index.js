import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';
// 自訂的分頁元件

Vue.use(VueRouter);

// 匯出給 main.js 使用
export default new VueRouter({
    routes: [
        {
            name: '首頁', // 元件呈現的名稱
            path: '/index', // 虛擬路徑
            component: Home // 對應的元件(App.vue router-view沒有設定name的那個)，相當於default: Home
        },
        {
            name: '', // 元件呈現的名稱，會進入children裡的路徑，所以這裡的name會直接被替換掉，會出錯誤提示，name改空字串即可
            path: '/page', // 虛擬路徑
            //component: Page, // 對應的元件
            components: {
                default: Page, // 預設對應的元件(App.vue router-view沒有設定name的那個)
                menu: Menu, // router-view指定name為menu時會使用Menu元件
            },
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