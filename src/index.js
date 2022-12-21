import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import {createI18n} from 'vue-i18n';
import MyApp from '@src/App.vue';
//import routes from '@src/router/router'
import staticRoute from '@src/router/static';
import TextFields from '@src/local/local'
import Antd from 'ant-design-vue/es';
import {createPinia} from 'pinia';
import { useConfig } from '@store';
import 'ant-design-vue/dist/antd.css';
//import { apply } from 'core-js/fn/reflect';

const router = createRouter({
    history:createWebHistory(),
    routes:staticRoute,
    strict: true
});
router.beforeEach((to)=>{
    var store = useConfig();
    store.userToken = sessionStorage.getItem("userToken");
    if(store.userToken==null){  //用户未登录
        if(to.name != "login"){
            return {name:"login"}
        }else{  //去登录
            return true;
        }
    }else{
        return true;
    }
    
});
const i18n = createI18n({
    legacy: false,
    globalInjection:true,
    locale:'Chinese',
    fallbackLocale:'English',
    messages:TextFields
});
var pinia = createPinia();
const app = createApp(MyApp);
app.use(router);
app.use(i18n);
app.use(Antd);
app.use(pinia);
//app.config.globalProperties.$i18n=i18n;
app.mount("#app");
