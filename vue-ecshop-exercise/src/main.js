import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { router } from './router';

import App from './App.vue';

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app');
