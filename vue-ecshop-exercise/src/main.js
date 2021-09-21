import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

import App from './App.vue';
import { router } from './router';

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .component('Loading', Loading)
    .mount('#app');

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
                    path: './login'
                });
            }
        });
    } else {
        // 不用驗證，繼續執行
        next();
    }
});
