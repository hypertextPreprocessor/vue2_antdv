import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import {createI18n} from 'vue-i18n';
import App from '@src/App.vue';
import routes from '@src/router/router'
import TextFields from '@src/local/local'
const router = createRouter({
    history:createWebHistory(),
    routes,
    strict: true
});
const i18n = createI18n({
    local:'Chinese',
    fallbackLocale:'English',
    TextFields
});
const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount("#app");
