import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import { defineRule, configure, Form, Field, ErrorMessage } from "vee-validate";
import allRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

import App from './App.vue';
import { router } from './router';
import eventBus from './eventBus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

// Vee-Validate
configure({
    generateMessage: localize("zh_TW", zh_TW),
});
// install all rules
Object.keys(allRules).forEach(rule => {
    defineRule(rule, allRules[rule]);
});

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.component('Loading', Loading);
app.component("Field", Field);
app.component("Form", Form);
app.component("ErrorMessage", ErrorMessage);
// 自定義全域變數
app.config.globalProperties.eventBus = eventBus;
app.config.globalProperties.currency = currencyFilter;
app.config.globalProperties.date = dateFilter;
app.mount('#app');

// 導航守衛 Navigation Guards
router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {
        // 驗證是否已經登入
        const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
        axios.post(api).then((response) => {
            if (response.data.success) {
                // 已登入，繼續執行
                next();
            } else {
                // 未登入，轉到登入頁
                next({
                    path: '/login'
                });
            }
        });
    } else {
        // 不用驗證，繼續執行
        next();
    }
});
