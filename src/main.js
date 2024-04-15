import { createApp } from 'vue'
import './assets/scss/all.scss';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';

import  toast  from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



const pinia = createPinia()

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(toast);
app.mount('#app');

