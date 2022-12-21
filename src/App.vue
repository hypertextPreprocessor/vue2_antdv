<template>
    <a-config-provider :locale="language" v-if="routerReady">
        <router-view/>
    </a-config-provider>
</template>
<script setup>
    import {ref,onMounted,watch} from 'vue';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import enUS from 'ant-design-vue/es/locale/en_US';
    import esEs from 'ant-design-vue/es/locale/es_ES';
    import {useConfig} from '@store';
    import myRoute from '@src/router/myRoute.js';
    import {useRouter} from 'vue-router';

    var store = useConfig();
    const language = ref(zhCN);
    var router = useRouter();
    var routerReady = ref(true);
    watch(
        ()=>store.local,
        (n,o)=>{
            console.log(n,o);
            alterLocale(n);
        }
    )
    function alterLocale(str){
        switch(str){
            case 'Chinese':
                language.value=zhCN;
                break;
            case 'English':
                language.value=enUS;
                break;
            case 'Spanish':
                language.value=esEs;
                break;
            default:
                language.value=zhCN;
        }
    }
    function addRouteListAtBranch({branch:branch,routes:Rs}){
        if(Rs.length){
            for(var i=0;i<Rs.length;i++){
                router.addRoute(branch,Rs[i]);
                if(Rs[i].children){
                    addRouteListAtBranch({branch:Rs[i].name,routes:Rs[i].children});
                }
            }
        }
    }
    onMounted(()=>{
        alterLocale(store.local);
        if(store.dynamicRoute){
            if(store.userToken!=null){
                myRoute(store,true,(obj)=>{
                    addRouteListAtBranch(obj);
                }).then(()=>{
                    routerReady.value = true;
                    //路由被动态添加成功回调
                    //console.log(router.getRoutes());
                });
            }else{
                routerReady.value = true;
            }
        }else{
            routerReady.value = true;
        }
        /*
        console.log(language.value);    //zh-cn
        console.log(enUS.locale);       //en
        console.log(esEs.locale);       //es
        */
    });
</script>
<style>
html{
    background:#f0f2f5;
}
</style>