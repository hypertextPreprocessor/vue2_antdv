<template>
    <a-config-provider :locale="language">
        <router-view/>
    </a-config-provider>
</template>
<script setup>
    import {ref,onMounted,watch,reactive} from 'vue';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import enUS from 'ant-design-vue/es/locale/en_US';
    import esEs from 'ant-design-vue/es/locale/es_ES';
    import {useConfig} from '@store';
    import {loadComponentForRoute} from '@src/utils/util.js';
    import {useRouter} from 'vue-router';
    var store = useConfig();
    const language = ref(zhCN);
    var pageList = reactive([]);
    var sysList = reactive([]);
    var router = useRouter();
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
    async function routeHandle(routes){
        for(var i=0;i<routes.length;i++){
            routes[i].component = await loadComponentForRoute(routes[i].component);
            if(routes[i].children){
                await routeHandle(routes[i].children);
            }
        }
        return routes;
        
    }
    function addRouteListAtBranch({branch:branch,routes:Rs}){
        if(Rs.length){
            for(var i=0;i<Rs.length;i++){
                router.addRoute(branch,Rs[i]);
                if(Rs[i].children){
                    console.log(Rs[i].name);
                    //addRouteListAtBranch({branch:Rs[i].name,routes:Rs[i].children});
                }
            }
        }
        console.log(router.getRoutes());
    }
    onMounted(()=>{
        alterLocale(store.local);
        /*
        console.log(language.value);    //zh-cn
        console.log(enUS.locale);       //en
        console.log(esEs.locale);       //es
        */
        if(store.dynamicRoute){
            import('@api').then(({getRouteList})=>{
                getRouteList().then(res=>{
                    var {code,data} = res.data;
                    if(code==200){
                        pageList = data.page;
                        sysList = data.system;
                        routeHandle(pageList).then(r1=>{
                            addRouteListAtBranch({branch:'mainCommon',routes:r1});
                        });
                        routeHandle(sysList).then(r2=>{
                            addRouteListAtBranch({branch:'mainSetting',routes:r2});
                        });
                    }
                });
            });
        }else{
            import('@src/router/router').then(({pageRoute})=>{
                pageList = pageRoute;
                routeHandle(pageRoute).then(r1=>{
                    addRouteListAtBranch({branch:'mainCommon',routes:r1});
                    //console.log(router.getRoutes());
                    //console.log(router.hasRoute('homeBoard'));
                });
            });
            /*
            import('@src/router/router').then(({systemRoute})=>{
                sysList = systemRoute;
                routeHandle(systemRoute).then(r2=>{
                    addRouteListAtBranch({branch:'mainCommon',routes:r2});
                });
            });
            */
        }
    });
</script>
<style>
html{
    background:#f0f2f5;
}
</style>