import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import {createI18n} from 'vue-i18n';
import MyApp from '@src/App.vue';
import routes from '@src/router/router'
import TextFields from '@src/local/local'
//import 'ant-design-vue/dist/antd.css';
/**全局引入
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';
**/
const router = createRouter({
    history:createWebHistory(),
    routes,
    strict: true
});
const i18n = createI18n({
    legacy: false,
    globalInjection:true,
    locale:'Chinese',
    fallbackLocale:'English',
    messages:TextFields
});
const app = createApp(MyApp);
app.use(router);
app.use(i18n);
//app.use(Antd);
//app.config.globalProperties.$i18n=i18n;
app.mount("#app");
